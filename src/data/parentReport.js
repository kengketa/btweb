// /results: how parents see their child's report in LINE. Everything here is sample
// content for the phone demo on that page; no real student data.

export const steps = [
  {
    title: 'สแกน QR หรือกดลิงก์',
    desc: 'เพิ่มเพื่อน LINE “BrightonLA Official” ด้วยการสแกน QR Code หรือกดลิงก์ lin.ee/O3Da95C'
  },
  {
    title: 'แตะเมนู “ดูผลสอบ”',
    desc: 'ในหน้าแชท LINE แตะปุ่ม “ดูผลสอบ” ที่เมนูด้านล่าง'
  },
  {
    title: 'กรอกเลขบัตรประชาชน 13 หลัก',
    desc: 'กรอกเลขบัตรประชาชนของนักเรียน แล้วกด “เพิ่มนักเรียน” — ระบบจะค้นหาชื่อลูกให้อัตโนมัติ'
  },
  {
    title: 'แตะชื่อนักเรียน เพื่อดูผล',
    desc: 'ดูกราฟทักษะเทียบค่าเฉลี่ยระดับชั้น ประวัติการประเมิน และความคิดเห็นจากคุณครูทุกเดือน'
  }
]

// a made-up ID for the "ใส่เลขตัวอย่าง" button
export const sampleId = '1569900123456'

export const sampleChild = {
  nickname: 'น้องมะลิ',
  name: 'Mali Sukjai',
  initials: 'ML',
  level: 'Bunny 3y'
}

// latest month on the radar chart: the child against the class average
export const radar = {
  axes: [
    'Listening',
    'Speaking',
    'Vocabularies',
    'Attendance',
    'Social development',
    'Participation',
    'Confident',
    'Concentration'
  ],
  child: [96, 97, 98, 100, 88, 95, 96, 94],
  average: [92, 94, 91, 96, 92, 93, 92, 93]
}

const skills = [
  'Listening',
  'Speaking',
  'Vocabularies',
  'Attendance',
  'Participation',
  'Confident',
  'Concentration'
]

export const history = [
  {
    unit: 'Unit 5 Vehicles',
    date: '25 ก.ย. 2569',
    teacher: 'Teacher Mariniel',
    scores: [98, 98, 98, 100, 97, 98, 98],
    comment:
      'Mali is a bright and active learner. She is often the first to answer questions and joins every activity with great enthusiasm.'
  },
  {
    unit: 'Places in Town',
    date: '27 ส.ค. 2569',
    teacher: 'ครูณัฐธิดา',
    scores: [95, 96, 97, 100, 95, 94, 95],
    comment:
      'น้องมะลิมีคลังคำศัพท์เยอะมาก กล้าแสดงออก และสื่อสารความต้องการของตนเองได้ดี มีความมั่นใจในการร่วมกิจกรรมในชั้นเรียนค่ะ'
  },
  {
    unit: 'My Family',
    date: '26 ก.ค. 2569',
    teacher: 'Teacher Mariniel',
    scores: [90, 92, 93, 96, 90, 90, 91],
    comment:
      'Mali is growing more confident every week. She now speaks in full sentences and loves sharing stories about her family.'
  }
].map((h) => ({ ...h, scores: h.scores.map((v, i) => ({ label: skills[i], v })) }))
