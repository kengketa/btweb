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
  address: ['56/6 ถ.ประตูชัย ต.เวียง อ.เมือง', 'จ.พะเยา 56000'],
  hours: 'อังคาร – อาทิตย์ · 09.00 – 18.00 น.',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5626798299395!2d99.90315867559715!3d19.170610948994746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d82ccdbfef0777%3A0xa255be9ca9f77c5e!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4Liq4Lit4LiZ4Lig4Liy4Lip4LiyIOC5hOC4muC4o-C4l-C5jOC4leC4seC4mSAoIEJyaWdodG9uIExhbmd1YWdlIEFjYWRlbXkgKQ!5e0!3m2!1sen!2sth!4v1764565999332!5m2!1sen!2sth'
}

// TODO: stand-in quotes from the design — replace with real parent testimonials before publishing.
export const testimonials = {
  hero: {
    quote: 'ลูกบอกว่าอยากมาเรียนทุกสัปดาห์ ไม่ต้องบังคับเลย',
    who: 'คุณแม่น้องข้าวหอม · ผู้ปกครอง'
  },
  main: {
    quote:
      'จากที่ลูกไม่กล้าพูดภาษาอังกฤษเลย ตอนนี้กลับบ้านมาร้องเพลงและเล่าเรื่องเป็นภาษาอังกฤษให้ฟังทุกวัน',
    who: 'คุณแม่น้องใบเตย',
    role: 'ผู้ปกครอง Brighton Phonics'
  },
  side: {
    quote: 'ครูใส่ใจเด็กทุกคน และเล่าพัฒนาการของลูกให้ฟังเสมอ',
    who: 'คุณพ่อน้องภูมิ · English Level'
  }
}

export const yearsLabel = '10+'
