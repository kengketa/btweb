<template>
  <div>
    <h2>Facebook Feed</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-for="post in posts" :key="post.id" class="post">
      <p>{{ post.message }}</p>
      <img v-if="post.full_picture" :src="post.full_picture" alt="Post Image" />
      <span>{{ new Date(post.created_time).toLocaleString() }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    // IMPORTANT: Replace with your actual Facebook Page ID and a Page Access Token.
    // It is strongly recommended to use a server-side proxy to handle API requests
    // to keep your Access Token secure.
    const pageId = 'YOUR_FACEBOOK_PAGE_ID';
    const accessToken = 'YOUR_FACEBOOK_PAGE_ACCESS_TOKEN';
    const url = `https://graph.facebook.com/v12.0/${pageId}/posts?fields=message,full_picture,created_time&access_token=${accessToken}`;

    if (pageId === 'YOUR_FACEBOOK_PAGE_ID' || accessToken === 'YOUR_FACEBOOK_PAGE_ACCESS_TOKEN') {
      this.error = 'Please configure your Facebook Page ID and Access Token in src/components/FacebookFeed.vue';
      this.loading = false;
      return;
    }

    try {
      const response = await axios.get(url);
      this.posts = response.data.data;
    } catch (err) {
      this.error = 'Error fetching Facebook posts. Please check your Page ID, Access Token, and API permissions.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
img {
  max-width: 100%;
}
</style>
