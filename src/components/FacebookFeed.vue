<template>
  <div class="feed-container">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-for="post in displayedPosts" :key="post.id" class="post-card shadow-lg">
      <div class="post-header">
        <img :src="getPageLogo()" alt="Logo" class="page-logo" />
        <div class="header-info">
          <span class="page-name">Brighton - Language Academy</span>
          <span class="post-date">{{ formatDate(post.created_time) }}</span>
        </div>
      </div>

      <div class="post-content">
        <p>
          {{ isExpanded(post.id) ? post.message : getTruncatedText(post.message) }}
          <span
            v-if="post.message && post.message.length > 150 && !isExpanded(post.id)"
            class="see-more"
            @click="expandPost(post.id)"
          >
            See more
          </span>
        </p>
      </div>

      <div v-if="getPostImages(post).length" :class="getGridClass(post)" class="image-grid">
        <div
          v-for="(img, index) in getPostImages(post)"
          :key="index"
          :style="{ backgroundImage: `url(${img.src})` }"
          class="grid-item"
          @click="openLink(post.permalink_url)"
        ></div>
      </div>

      <div class="post-footer">
        <a :href="post.permalink_url" class="fb-link" target="_blank">View on Facebook</a>
      </div>
    </div>
    <div v-if="!loading && displayedPosts.length < allPosts.length" class="pagination-controls">
      <button class="btn-load-more" @click="loadMore">Load More</button>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      allPosts: [],
      displayedPosts: [],
      loading: false,
      error: null,
      expandedPosts: [],
      pageLogoUrl: '',
      postsPerPage: 10,
      currentPage: 0
    }
  },
  async created() {
    this.loading = true
    try {
      // Fetch the cached feed from the local JSON file
      const response = await axios.get('/api/facebook-feed.json')
      this.allPosts = response.data.posts
      this.pageLogoUrl = response.data.pageLogoUrl
      this.displayPosts()
    } catch (err) {
      this.error = 'Error fetching posts. Please run "npm run update-feed".'
      console.error(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    // --- Pagination Logic ---
    displayPosts() {
      const start = this.currentPage * this.postsPerPage
      const end = start + this.postsPerPage
      if (start < this.allPosts.length) {
        this.displayedPosts.push(...this.allPosts.slice(start, end))
      }
    },
    loadMore() {
      this.currentPage++
      this.displayPosts()
    },

    // --- Helper: Get Page Logo ---
    getPageLogo() {
      return this.pageLogoUrl
    },

    // --- Helper: Date Formatting ---
    formatDate(dateString) {
      const options = { month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    },

    // --- Helper: Text Truncation ---
    getTruncatedText(text) {
      if (!text) return ''
      if (text.length <= 150) return text
      return text.substring(0, 150) + '... '
    },
    isExpanded(postId) {
      return this.expandedPosts.includes(postId)
    },
    expandPost(postId) {
      this.expandedPosts.push(postId)
    },

    // --- Helper: Image Extraction ---
    getPostImages(post) {
      let images = []
      if (post.attachments && post.attachments.data) {
        const attachment = post.attachments.data[0]

        // Check for subattachments (multiple photos in one post)
        if (attachment.subattachments && attachment.subattachments.data) {
          images = attachment.subattachments.data.map((sub) => ({
            src: sub.media.image.src
          }))
        }
        // Fallback: Check for single media
        else if (attachment.media && attachment.media.image) {
          images.push({ src: attachment.media.image.src })
        }
      }
      // Limit to 4 images for the grid layout
      return images.slice(0, 4)
    },

    // --- Helper: Grid Class Logic ---
    getGridClass(post) {
      const count = this.getPostImages(post).length
      if (count === 1) return 'grid-1'
      if (count === 2) return 'grid-2'
      if (count === 3) return 'grid-3'
      return 'grid-4'
    },
    openLink(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>
.feed-container {
  max-width: 550px;
  margin: 0 auto;
  font-family: Helvetica, Arial, sans-serif;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  overflow: hidden;
}

/* --- Header Styling --- */
.post-header {
  display: flex;
  align-items: center;
  padding: 12px 16px 0 16px;
  margin-bottom: 12px;
}
.page-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.header-info {
  display: flex;
  flex-direction: column;
}
.page-name {
  font-weight: bold;
  font-size: 15px;
  color: #050505;
}
.post-date {
  font-size: 13px;
  color: #65676b;
}

/* --- Content Styling --- */
.post-content {
  padding: 0 16px 12px 16px;
  font-size: 15px;
  color: #050505;
  white-space: pre-wrap; /* Keeps line breaks */
}
.see-more {
  font-weight: bold;
  color: #65676b;
  cursor: pointer;
}
.see-more:hover {
  text-decoration: underline;
}

/* --- Image Grid Styling --- */
.image-grid {
  display: grid;
  width: 100%;
  height: 350px; /* Fixed height for consistency */
  gap: 2px;
  cursor: pointer;
}

.grid-item {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Layouts based on number of images */
.grid-1 {
  grid-template-columns: 1fr;
}

.grid-2 {
  grid-template-columns: 1fr 1fr;
}

.grid-3 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.grid-3 .grid-item:first-child {
  grid-row: span 2; /* First image takes full left side */
}

.grid-4 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

/* --- Footer --- */
.post-footer {
  padding: 10px;
  border-top: 1px solid #e1e1e1;
  text-align: center;
}
.fb-link {
  text-decoration: none;
  color: #65676b;
  font-size: 14px;
  font-weight: 600;
}

.btn-load-more {
  width: 100%;
  padding: 12px;
  background: #e4e6eb;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  color: #050505;
  cursor: pointer;
}
.btn-load-more:hover {
  background: #d8dadf;
}
</style>
