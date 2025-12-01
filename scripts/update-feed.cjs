require('dotenv').config()
const fs = require('fs/promises')
const path = require('path')
const axios = require('axios')
const args = process.argv.slice(2)

// --- Helper Functions ---
const getArgValue = (argName) => {
  const combined = args.find((arg) => arg.startsWith(`${argName}=`))
  if (combined) return combined.split('=')[1]
  const index = args.indexOf(argName)
  if (index !== -1 && args[index + 1] && !args[index + 1].startsWith('--')) {
    return args[index + 1]
  }
  return null
}

const hasFlag = (flagName) => args.includes(flagName)

// --- Configuration ---
const PAGE_ID = process.env.VITE_FB_PAGE_ID || ''
const USER_ACCESS_TOKEN = getArgValue('--access_token') || process.env.VITE_FB_USER_ACCESS_TOKEN
const CACHE_FILE_PATH = path.join(__dirname, '..', 'public', 'api', 'facebook-feed.json')
const CACHE_DURATION_HOURS = 24

// --- Core Logic ---

async function getCachedFeed() {
  try {
    const data = await fs.readFile(CACHE_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null
    }
    throw error
  }
}

/**
 * Uses the User Token to fetch the specific Page Access Token
 */
async function getPageAccessToken(userToken, pageId) {
  console.log(`Attempting to retrieve Page Access Token for Page ID: ${pageId}...`)
  try {
    const url = `https://graph.facebook.com/v24.0/me/accounts?access_token=${userToken}&limit=100`
    const response = await axios.get(url)
    if (response.data && response.data.data) {
      const pageData = response.data.data.find((page) => page.id === pageId)
      if (pageData && pageData.access_token) {
        return pageData.access_token
      }
    }

    console.warn(
      '⚠ Page ID not found in user accounts. Will try using the provided token directly.'
    )
    return userToken
  } catch (error) {
    console.warn(
      '⚠ Error fetching page accounts (Input might already be a Page Token). Continuing...'
    )
    return userToken
  }
}

async function fetchAndCacheFeed() {
  if (!USER_ACCESS_TOKEN) {
    console.error('Error: No Access Token provided. Use --access_token=YOUR_TOKEN')
    process.exit(1)
  }

  if (!PAGE_ID) {
    console.error('Error: No PAGE_ID found in environment variables.')
    process.exit(1)
  }
  const pageAccessToken = await getPageAccessToken(USER_ACCESS_TOKEN, PAGE_ID)
  console.log('Fetching feed data from Facebook API...')

  try {
    console.log('Fetching page logo...')
    const pageInfoUrl = `https://graph.facebook.com/v24.0/${PAGE_ID}?fields=picture.type(large){url}&access_token=${pageAccessToken}`
    const pageInfoResponse = await axios.get(pageInfoUrl)
    const pageLogoUrl = pageInfoResponse.data.picture.data.url

    const API_URL = `https://graph.facebook.com/v24.0/${PAGE_ID}/posts?fields=message,created_time,permalink_url,attachments{media,subattachments}&limit=10&access_token=${pageAccessToken}`

    let allPosts = []
    let nextUrl = API_URL
    const maxPages = 3

    for (let i = 0; i < maxPages && nextUrl; i++) {
      console.log(`Fetching feed page ${i + 1}...`)
      const response = await axios.get(nextUrl)
      if (response.data.data) {
        allPosts = allPosts.concat(response.data.data)
      }
      nextUrl = response.data.paging?.next
    }

    const feedData = {
      last_updated: new Date().toISOString(),
      pageLogoUrl: pageLogoUrl,
      posts: allPosts
    }

    await fs.mkdir(path.dirname(CACHE_FILE_PATH), { recursive: true })
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(feedData, null, 2))
    console.log(`Successfully cached ${allPosts.length} posts to ${CACHE_FILE_PATH}`)
  } catch (error) {
    console.error(
      'Error fetching or caching Facebook feed:',
      error.response ? error.response.data : error.message
    )
    process.exit(1)
  }
}

async function run() {
  const forceUpdate = hasFlag('--force')

  console.log(
    `Configuration: Force Update: ${forceUpdate}, Token provided: ${USER_ACCESS_TOKEN ? 'Yes' : 'No'}`
  )

  const cachedFeed = await getCachedFeed()

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
