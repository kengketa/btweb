import { computed, ref } from 'vue'

// The Facebook feed is cached to /api/facebook-feed.json by scripts/update-feed.cjs.
// Loaded once and shared by every page that shows photos or news.
const posts = ref([])
const loaded = ref(false)
let request = null

const EMOJI = /\p{Extended_Pictographic}|\p{Emoji_Modifier}|\u200d|\ufe0f/gu

function imagesOf(post) {
  const att = post.attachments?.data?.[0]
  if (!att) return []
  if (att.subattachments?.data) {
    return att.subattachments.data.map((s) => s.media?.image?.src).filter(Boolean)
  }
  return att.media?.image?.src ? [att.media.image.src] : []
}

function categoryOf(text) {
  if (/ตารางเรียน|ประกาศ|หยุด|ปิดทำการ/.test(text)) return 'ประกาศ'
  if (/Activity|Halloween|Camp|กิจกรรม|Art|Krathong|Chef|Fun Day|เวที/i.test(text)) return 'กิจกรรม'
  if (/คอร์ส|Combo|โปร|สมัคร/i.test(text)) return 'คอร์สเรียน'
  return 'ข่าวสาร'
}

function normalize(post) {
  const message = post.message || ''
  const lines = message
    .split('\n')
    .map((l) => l.replace(EMOJI, '').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
  return {
    id: post.id,
    url: post.permalink_url,
    date: new Date(post.created_time).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    title: lines[0] || 'อัลบั้มภาพจาก Brighton',
    excerpt: lines.slice(1).join(' '),
    category: categoryOf(message),
    message,
    images: imagesOf(post)
  }
}

export function loadFeed() {
  // pre-rendered pages ship without the feed, matching the browser's first render
  // before its fetch returns
  if (import.meta.env.SSR) return Promise.resolve()
  if (!request) {
    request = fetch('/api/facebook-feed.json')
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((data) => {
        posts.value = (data.posts || []).map(normalize).filter((p) => p.images.length)
      })
      .catch(() => {})
      .finally(() => {
        loaded.value = true
      })
  }
  return request
}

export function useFeed() {
  loadFeed()
  // timetables and promos are graphics, not classroom photos
  const photoPosts = computed(() =>
    posts.value.filter((p) => !['ประกาศ', 'คอร์สเรียน'].includes(p.category))
  )
  const photos = computed(() => [...new Set(photoPosts.value.flatMap((p) => p.images))])
  const photoFor = (keyword, fallbackIndex = 0) => {
    const match = keyword && photoPosts.value.find((p) => p.message.includes(keyword))
    return match ? match.images[0] : photos.value[fallbackIndex]
  }
  return { posts, loaded, photos, photoFor }
}
