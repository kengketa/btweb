import { onMounted, ref } from 'vue'

// Pre-rendered pages show the first `count` photos so the browser's first render
// matches the HTML; once mounted, a random set (no repeats) takes their place.
export function useRandomPhotos(list, count) {
  const photos = ref(list.slice(0, count))
  onMounted(() => {
    const pool = [...list]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    photos.value = pool.slice(0, count)
  })
  return photos
}
