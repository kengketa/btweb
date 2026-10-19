// Photos the school chose for each page, served from public/images/<folder>/.
// Shrunk to 1600px with metadata stripped; originals are kept outside the repo.
const numbered = (folder, prefix, count) =>
  Array.from(
    { length: count },
    (_, i) => `/images/${folder}/${prefix}-${String(i + 1).padStart(2, '0')}.jpg`
  )

export const homePhotos = numbered('1_home', 'home', 16)
export const aboutPhotos = numbered('2_about_us', 'about', 5)
export const aboutCover = '/images/cover-brighton.jpg'
