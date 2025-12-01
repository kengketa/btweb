const fs = require('fs/promises')
const path = require('path')
const axios = require('axios')

// --- Configuration ---
const PAGE_ID = '987333421284380'
const ACCESS_TOKEN =
  'EAArd4lOJ2vMBQKfC977qGGfsQwKADePNZAZBdyE2dXOvYeqJZCrjhlZBZC0eelXMItdTyZCylMTdvKZAZCuq4xP7ikF4XWPsA0k340g9L5zaZB0bMYOiCZCOBGEpmGq4af077V3TMDfcIref7eDZBpHSVOVkn6JcWBTmo45bi0ZAD6xo24QC1XonVSqVeYIyZCF7mcs2PRIWNcZAiKJFmyginEikL1OR611EzHOpB1FWH7EZBB6bS3jl6LZAa54w'
const API_URL = `https://graph.facebook.com/v21.0/${PAGE_ID}/posts?fields=message,created_time,permalink_url,attachments{media,subattachments}&limit=10&access_token=${ACCESS_TOKEN}`
const CACHE_FILE_PATH = path.join(__dirname, '..', 'public', 'api', 'facebook-feed.json')
const CACHE_DURATION_HOURS = 24

async function getCachedFeed() {
  try {
    const data = await fs.readFile(CACHE_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If the file doesn't exist or is invalid, return null.
    if (error.code === 'ENOENT') {
      return null
    }
    throw error
  }
}

async function fetchAndCacheFeed() {
  console.log('Fetching new data from Facebook API...')
  try {
    let allPosts = []
    let nextUrl = API_URL
    const maxPages = 5 // Fetch up to 5 pages (approx. 50 posts)

    for (let i = 0; i < maxPages && nextUrl; i++) {
      console.log(`Fetching page ${i + 1}...`)
      const response = await axios.get(nextUrl)
      if (response.data.data) {
        allPosts = allPosts.concat(response.data.data)
      }
      // The 'next' URL from the Graph API already includes the access token
      nextUrl = response.data.paging?.next
    }

    const feedData = {
      last_updated: new Date().toISOString(),
      posts: allPosts
      // No nextPageUrl, as we're handling pagination by pre-loading posts.
    }

    await fs.mkdir(path.dirname(CACHE_FILE_PATH), { recursive: true })
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(feedData, null, 2))
    console.log(`Successfully cached ${allPosts.length} posts to ${CACHE_FILE_PATH}`)
  } catch (error) {
    console.error(
      'Error fetching or caching Facebook feed:',
      error.response ? error.response.data : error.message
    )
    // Exit with an error code to fail CI/CD pipelines if something goes wrong.
    process.exit(1)
  }
}

async function run() {
  // 1. Check if the command was run with the --force flag
  const forceUpdate = process.argv.includes('--force')

  const cachedFeed = await getCachedFeed()

  // 2. We only check the cache age if the file exists AND we aren't forcing an update
  if (cachedFeed && !forceUpdate) {
    const now = new Date()
    const lastUpdated = new Date(cachedFeed.last_updated)
    const hoursSinceUpdate = (now - lastUpdated) / (1000 * 60 * 60)

    if (hoursSinceUpdate < CACHE_DURATION_HOURS) {
      console.log(
        `Cache is fresh. Last updated ${hoursSinceUpdate.toFixed(2)} hours ago. Skipping fetch.`
      )
      console.log('To force an update, run: npm run update-feed -- --force')
      return
    } else {
      console.log('Cache is stale. Fetching new data.')
      await fetchAndCacheFeed()
    }
  } else {
    if (forceUpdate) {
      console.log('Force flag detected. Ignoring cache and fetching new data.')
    } else {
      console.log('No cache found. Fetching initial data.')
    }
    await fetchAndCacheFeed()
  }
}

run()
