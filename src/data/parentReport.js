// /results: how parents follow their child in the LINE parent app (Student Progress).
// Everything here is sample content for the phone demo on that page; no real student data.

export const steps = [
  {
    title: 'สแกน QR เพิ่มเพื่อน',
    desc: 'เพิ่มเพื่อน LINE “BrightonLA Official” ด้วยกล้องมือถือหรือแอป LINE หรือกดลิงก์ lin.ee/O3Da95C'
  },
  {
    title: 'แตะ “Student Progress”',
    desc: 'ที่เมนูด้านล่างของแชท LINE เพื่อเปิดแอปผู้ปกครอง'
  },
  {
    title: 'เพิ่มลูก',
    desc: 'แตะ “+ เพิ่มลูก” แล้วกรอกเลขบัตรประชาชนของลูก และเบอร์โทรที่ให้ไว้กับโรงเรียน'
  },
  {
    title: 'ดูผลการเรียน',
    desc: 'แตะชื่อลูก เพื่อดูกราฟผลการประเมินเทียบค่าเฉลี่ยระดับชั้น และความเห็นจากครู'
  },
  {
    title: 'ดูเครดิต',
    desc: 'เลือกแท็บ “เครดิต” ดูเครดิตคงเหลือ ประวัติการลงเรียน และการชำระ'
  },
  {
    title: 'ชำระค่าเรียน',
    desc: 'แตะ “ชำระ” ที่ใบแจ้งหนี้ ตรวจสอบยอดแล้วแตะ “ชำระเงิน” จากนั้นสแกน QR พร้อมเพย์ด้วยแอปธนาคารใดก็ได้ภายใน 15 นาที'
  }
]

// made-up ID and phone for the "ใส่ข้อมูลตัวอย่าง" button; the ID passes the checksum
export const sampleId = '1569900123453'
export const samplePhone = '0812345678'

export const sampleChild = {
  nickname: 'น้องมะลิ',
  name: 'Mali Sukjai',
  initials: 'MS',
  level: 'Bunny 3y',
  credit: 600,
  validUntil: '2 ธ.ค. 2569'
}

// latest month on the radar chart: the child against the class average
export const radar = {
  axes: [
    'Listening',
    'Speaking',
    'Writing',
    'Vocabularies',
    'Attendance',
    'Social development',
    'Participation',
    'Confident',
    'Concentration',
    'Hand-WR',
    'Phonic'
  ],
  child: [96, 95, 82, 98, 100, 88, 95, 96, 90, 86, 92],
  average: [92, 90, 84, 91, 96, 90, 92, 90, 89, 86, 88]
}

export const history = [
  {
    unit: 'Unit 5 Vehicles',
    date: '25 ก.ย. 2569',
    teacher: 'Teacher Peter',
    scores: {
      Listening: 98,
      Speaking: 95,
      Vocabularies: 98,
      Attendance: 100,
      Participation: 95,
      Confident: 96,
      Concentration: 90,
      Phonic: 92
    },
    comment:
      'Mali is a bright and active learner. She is often the first to answer questions and joins every activity with great enthusiasm.'
  },
  {
    unit: 'Places in Town',
    date: '27 ส.ค. 2569',
    teacher: 'ครูณัฐธิดา',
    scores: {
      Listening: 95,
      Speaking: 90,
      Vocabularies: 97,
      Attendance: 100,
      Participation: 92,
      Confident: 90,
      Concentration: 78,
      Phonic: 85
    },
    comment:
      'น้องมะลิมีคลังคำศัพท์เยอะมาก กล้าแสดงออก และสื่อสารความต้องการของตนเองได้ดี มีความมั่นใจในการร่วมกิจกรรมในชั้นเรียนค่ะ'
  }
].map((h) => ({ ...h, scores: Object.entries(h.scores).map(([label, v]) => ({ label, v })) }))

// the credit tab: classes taken off the balance and credit packs paid for
export const transactions = [
  { kind: 'class', desc: 'Bunny 3y · English Sat Sun', date: '27 ก.ย. 2569', amount: -100 },
  {
    kind: 'pay',
    desc: 'English Level 100 credit pack',
    date: '6 ก.ย. 2569',
    amount: 100,
    price: '฿1,900'
  },
  { kind: 'class', desc: 'Bunny 3y · English Sat Sun', date: '30 ส.ค. 2569', amount: -100 }
]

// the invoice on the payment step
export const invoice = {
  title: 'English Level 100 credit pack',
  number: 'INV-2569-0123',
  due: '5 ต.ค. 2569',
  amount: '฿1,900'
}

// what parents see in the app, on /results and the home page's LINE app card
export const appFeatures = [
  {
    title: 'ผลการประเมิน และความเห็นจากครู',
    text: 'กราฟทักษะ เช่น การฟัง การพูด การเขียน คำศัพท์ และ Phonics เทียบค่าเฉลี่ยของระดับชั้น พร้อมคะแนนแต่ละหน่วยการเรียนและความเห็นจากคุณครูผู้สอน'
  },
  {
    title: 'เครดิตคงเหลือ',
    text: 'ดูเครดิตที่เหลือและวันหมดอายุ พร้อมประวัติการลงเรียนและการชำระทุกครั้ง ไม่ต้องโทรถามโรงเรียน'
  },
  {
    title: 'ชำระค่าเรียนผ่านพร้อมเพย์',
    text: 'แตะชำระที่ใบแจ้งหนี้ แล้วสแกน QR ด้วยแอปธนาคารใดก็ได้ จ่ายเสร็จในมือถือภายในไม่กี่นาที'
  }
]
