const FB_PAGE_ID = '987333421284380'

// m.me opens the Messenger app on phones, but on desktop it lands on messenger.com, which
// asks for a separate login. Desktop visitors chat inside facebook.com instead, where they
// are usually signed in already. Only m.me supports a pre-filled message.
export const chatPrefills =
  typeof navigator !== 'undefined' && /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent)

export function chatUrl(text = '') {
  if (!chatPrefills) return `https://www.facebook.com/messages/t/${FB_PAGE_ID}`
  return `https://m.me/brightonlanguage${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export const contact = {
  phone: '082-184-9070',
  tel: 'tel:0821849070',
  facebook: 'https://www.facebook.com/brightonlanguage',
  facebookName: 'Brighton Language Academy',
  reviews: 'https://www.facebook.com/brightonlanguage/reviews',
  // LINE official account: parents view their child's report here (the /results page)
  line: 'https://lin.ee/O3Da95C',
  lineName: 'BrightonLA Official',
  address: ['56/3 ถ.ประตูชัย ต.เวียง อ.เมือง', 'จ.พะเยา 56000'],
  hours: 'เปิดทุกวัน · 09.00 – 19.00 น.',
  // the same hours for search engines and AI (structured data); keep in step with `hours`
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '19:00'
  },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5626798299395!2d99.90315867559715!3d19.170610948994746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d82ccdbfef0777%3A0xa255be9ca9f77c5e!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4Liq4Lit4LiZ4Lig4Liy4Lip4LiyIOC5hOC4muC4o-C4l-C5jOC4leC4seC4mSAoIEJyaWdodG9uIExhbmd1YWdlIEFjYWRlbXkgKQ!5e0!3m2!1sen!2sth!4v1764565999332!5m2!1sen!2sth'
}

// Booking form, configured in .env (read at build time, so rebuild after changing it).
// Without an endpoint, bookings are handed to Messenger instead. The endpoint receives
// a JSON POST; the Turnstile key is the public site key. Both end up in the public bundle.
export const booking = {
  endpoint: import.meta.env.VITE_BOOKING_ENDPOINT || '',
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
}

export const yearsLabel = '10+'

// Brighton's teaching team across Phayao (the /teachers page, home page and llms.txt)
export const team = {
  foreignTeachers: 50, // approximate; shown as "~50"
  schools: 12,
  years: yearsLabel
}
