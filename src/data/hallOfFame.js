// Hall of Fame (/hall-of-fame): real test results of Brighton students.
// Report images live in public/images/hall_of_frame; candidate numbers, IDs, dates of
// birth and form numbers are blurred out before they go there (the Oxford report has none);
// the IELTS report also hides the student's name and face, the Oxford report the name.
const IMG = '/images/hall_of_frame'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthYear = (d) => `${MONTHS[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}`
const fullDate = (d) => `${+d.slice(8, 10)} ${monthYear(d)}`
const band = (n) => n.toFixed(1)

export const ieltsReport = `${IMG}/ielts-report-chaiyaphat.jpg`
export const oxfordReport = `${IMG}/oxford-report-athiphat.jpg`

// IELTS Academic, highest overall first, then most recent
const ielts = [
  {
    first: 'Chaiyaphat',
    last: 'Vijakkanawong',
    photo: `${IMG}/chaiyaphat.jpg`,
    date: '2023-06-17',
    overall: 7.5,
    cefr: 'C1',
    scores: { Listening: 8.5, Reading: 8.5, Writing: 6.5, Speaking: 6.0 }
  },
  {
    first: 'Teetawat',
    last: 'Thanapornpoonpong',
    photo: `${IMG}/teetawat.jpg`,
    date: '2025-12-13',
    overall: 7.0,
    cefr: 'C1',
    scores: { Listening: 8.5, Reading: 7.0, Writing: 6.0, Speaking: 6.0 }
  },
  {
    first: 'Sarinda',
    last: 'Sriphongkul',
    photo: `${IMG}/sarinda.jpg`,
    date: '2025-12-12',
    overall: 7.0,
    cefr: 'C1',
    scores: { Listening: 8.0, Reading: 6.5, Writing: 6.0, Speaking: 6.5 }
  }
]

export const ieltsStudents = ielts
  .sort((a, b) => b.overall - a.overall || b.date.localeCompare(a.date))
  .map((s) => {
    const top = Math.max(...Object.values(s.scores))
    return {
      ...s,
      name: `${s.first} ${s.last}`,
      initials: s.first[0] + s.last[0],
      testDate: `Test date · ${fullDate(s.date)}`,
      overall: band(s.overall),
      skills: Object.entries(s.scores).map(([label, v]) => ({
        label,
        score: band(v),
        pct: `${(v / 9) * 100}%`,
        top: v === top
      }))
    }
  })

// Chaiyaphat's path from the Oxford test to IELTS
export const journey = {
  name: 'Chaiyaphat Vijakkanawong',
  photo: `${IMG}/chaiyaphat.jpg`,
  from: { label: 'Oxford · 2018', score: 'B1+' },
  to: { label: 'IELTS · 2023', score: '7.5' }
}

// Oxford Placement Test for Young Learners: [first, last, score, CEFR, test date or '']
const oxford = [
  ['Promkoon', 'Damrongwiriyanupap', 75, 'B1', ''],
  ['Worawarun', 'Modgum', 77, 'B1', ''],
  ['Nichapa', 'Nounhom', 76, 'B1', ''],
  ['Suphasiin', 'Numpaisarn', 68, 'B1', ''],
  ['Thanakrit', 'Srimamas', 80, 'B1', ''],
  ['Laphatrada', 'Thammachai', 76, 'B1', ''],
  ['Yodwatcharee', 'Thepjunta', 80, 'B1', ''],
  ['Phetchara', 'Huamtham', 76, 'B1', '2024-03-26'],
  ['Naphat', 'Kulnitichai', 81, 'B1', '2024-03-26'],
  ['Pulparit', 'Photong', 81, 'B1', '2024-03-26'],
  ['Athiphat', 'Pinyo', 69, 'B1', '2026-05-13'],
  ['Lucksika', 'Sudthana', 77, 'B1', '2026-05-13'],
  ['Kunjira', 'Thanapornpoonpong', 80, 'B1', '2026-04-28'],
  ['Kunnida', 'Thanapornpoonpong', 77, 'B1', '2026-04-28'],
  ['Chanya', 'Chaidarun', 77, 'B1', '2018-10-30'],
  ['Teeratum', 'Kamma', 67, 'B1', '2018-10-31'],
  ['Pichaya', 'Limprasert', 72, 'B1', '2018-10-31'],
  ['Chaiyapat', 'Vijakkanawong', 81, 'B1+', '2018-10-31']
]

const CEFR_RANK = { 'B1+': 3, B1: 2, A2: 1 }

// highest level first, then highest score
export const oxfordStudents = oxford
  .sort((a, b) => CEFR_RANK[b[3]] - CEFR_RANK[a[3]] || b[2] - a[2])
  .map(([first, last, , cefr, date]) => ({
    first,
    last,
    cefr,
    top: cefr === 'B1+',
    testDate: date ? `Test date · ${monthYear(date)}` : ''
  }))
