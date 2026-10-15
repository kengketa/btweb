// schema.org structured data (JSON-LD). Search engines and AI assistants read it to
// answer "where / when / what does the school teach" without parsing the page.
import { contact } from './site'
import { courses, faqs } from './courses'
import { SITE_URL } from './pages'

const SCHOOL_ID = `${SITE_URL}/#school`

export const school = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': SCHOOL_ID,
  name: 'Brighton Language Academy',
  alternateName: 'โรงเรียนสอนภาษา ไบรท์ตัน',
  description:
    'โรงเรียนสอนภาษาอังกฤษสำหรับเด็กในจังหวัดพะเยา สอนโดยครูเจ้าของภาษา หลักสูตร Oxford และ Jolly Phonics วัดระดับภาษาฟรีก่อนเริ่มเรียน',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: `${SITE_URL}/images/cover.jpg`,
  telephone: `+66${contact.tel.replace(/\D/g, '').slice(1)}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '56/3 ถ.ประตูชัย ต.เวียง',
    addressLocality: 'อ.เมืองพะเยา',
    addressRegion: 'พะเยา',
    postalCode: '56000',
    addressCountry: 'TH'
  },
  areaServed: 'จังหวัดพะเยา',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: contact.openingHours.days,
    opens: contact.openingHours.opens,
    closes: contact.openingHours.closes
  },
  sameAs: [contact.facebook],
  knowsLanguage: ['th', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'หลักสูตรภาษาอังกฤษ',
    itemListElement: courses.map((c) => ({
      '@type': 'Offer',
      itemOffered: { '@id': `${SITE_URL}/courses/${c.slug}#course` }
    }))
  }
}

export function courseSchema(c) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_URL}/courses/${c.slug}#course`,
        name: c.name,
        description: c.desc,
        url: `${SITE_URL}/courses/${c.slug}`,
        inLanguage: 'en',
        // ages like "3–12" (years) only; grade ranges such as "ม.1–6" have no schema.org form
        ...(c.ageUnit === 'ปี' && { typicalAgeRange: c.age.replace('–', '-') }),
        provider: { '@id': SCHOOL_ID }
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a }
        }))
      }
    ]
  }
}

// a <script type="application/ld+json"> entry for useHead; "<" is escaped so the
// JSON can never close the script tag early
export function jsonLd(data) {
  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify(data).replace(/</g, '\\u003c')
  }
}
