// Content for the program pages (/teachers, /camp, /ef, /mep), all drawn by
// src/views/ProgramView.vue. Edit the wording here; the layout lives in the view.
//
// Each page targets the searches parents in Phayao use (see GitHub issue #11) in natural
// sentences. Keep it true: Brighton supports MEP/EP students but is not an MEP/EP school
// or an international school, and the ~50 teachers are foreign teachers, not all native speakers.
//
// `english` is the summary box near the bottom of each page: English by default, for
// English searches; add `lang: 'th'` to write it in Thai instead.
import { contact, team } from './site.js'

export const programs = [
  {
    slug: 'teachers',
    path: '/teachers',
    label: 'ครูชาวต่างชาติ',
    card: 'ครูชาวต่างชาติราว 50 คน สอนอยู่ใน 12 โรงเรียนทั่วพะเยา',
    photoKeyword: 'Teacher',
    meta: {
      title: 'ครูเจ้าของภาษาในพะเยา (Native Speaker) - Brighton Language Academy',
      description: `เรียนภาษาอังกฤษกับครูชาวต่างชาติในพะเยา Brighton มีครูชาวต่างชาติราว ${team.foreignTeachers} คน สอนอยู่ใน ${team.schools} โรงเรียนทั่วจังหวัดพะเยา พร้อมคลาสสำหรับเด็กที่โรงเรียนของเรา`
    },
    eyebrow: 'Our Teachers',
    title: { lead: 'เรียนกับ', highlight: 'ครูชาวต่างชาติ', tail: 'ใกล้บ้าน ในพะเยา' },
    intro:
      'ครูของ Brighton ไม่ได้สอนเฉพาะที่โรงเรียนของเรา แต่สอนภาษาอังกฤษอยู่ในโรงเรียนต่างๆ ทั่วจังหวัดพะเยา ลูกจึงได้เรียนกับทีมครูที่คุ้นเคยกับเด็กพะเยา และรู้ว่าเด็กแต่ละวัยต้องการอะไร',
    stats: [
      [`~${team.foreignTeachers}`, 'ครูชาวต่างชาติที่สอนอยู่ในพะเยา'],
      [String(team.schools), 'โรงเรียนในจังหวัดพะเยา'],
      [team.years, 'ปีที่ดูแลเด็กๆ ในพะเยา']
    ],
    sections: [
      {
        heading: 'ทำไมต้องเรียนกับครูชาวต่างชาติ',
        style: 'cards',
        items: [
          [
            'ได้ยินภาษาจริงทุกคาบ',
            'ฟังสำเนียงและการออกเสียงที่เป็นธรรมชาติ จนลูกคุ้นหูและพูดตามได้เอง'
          ],
          [
            'กล้าพูดโดยไม่กลัวผิด',
            'ครูชวนคุยเป็นภาษาอังกฤษตลอดคาบ ลูกได้ลองใช้ภาษาโดยไม่ต้องแปลไทยในหัว'
          ],
          ['เรียนรู้วัฒนธรรม', 'เปิดโลกผ่านเพลง เกม เทศกาล และเรื่องเล่าจากครูชาวต่างชาติ'],
          ['ครูไทยช่วยดูแล', 'ทีมงานคนไทยช่วยประสานกับผู้ปกครอง และแจ้งพัฒนาการของลูกเป็นระยะ']
        ]
      },
      {
        heading: 'ครูของเราสอนที่ไหนบ้าง',
        style: 'points',
        items: [
          [
            'ที่โรงเรียน Brighton',
            'คลาสภาษาอังกฤษสำหรับเด็กอนุบาลถึงมัธยม คอร์สส่วนตัว และค่ายภาษาอังกฤษช่วงปิดเทอม ใจกลางเมืองพะเยา'
          ],
          [
            `ใน ${team.schools} โรงเรียนทั่วพะเยา`,
            'ครูชาวต่างชาติของ Brighton สอนภาษาอังกฤษประจำอยู่ในโรงเรียนต่างๆ ของจังหวัดพะเยา'
          ],
          [
            'กิจกรรมกับโรงเรียน',
            'เช่น Academic Camp 2026 ที่ Brighton จัดให้นักเรียนชั้น ป.3 และ ป.6 โรงเรียนอนุบาลพะเยา เรียนรู้แบบ Active Learning ครบ 5 กลุ่มสาระ'
          ]
        ]
      }
    ],
    english: {
      heading: 'Native and foreign English teachers in Phayao',
      text: `Brighton Language Academy has about ${team.foreignTeachers} foreign English teachers working in Phayao, teaching in ${team.schools} schools across the province as well as at our own school in the city centre. Children learn with teachers who speak English with them throughout the lesson, supported by Thai staff who keep parents informed.`
    },
    faqs: [
      [
        'ครูที่สอนลูกเป็นชาวต่างชาติไหม?',
        'คลาสภาษาอังกฤษของ Brighton สอนโดยครูชาวต่างชาติ และมีทีมงานคนไทยช่วยดูแลและสื่อสารกับผู้ปกครองค่ะ'
      ],
      [
        'ลูกยังพูดอังกฤษไม่ได้เลย จะเรียนกับครูต่างชาติไหวไหม?',
        'ไหวค่ะ ก่อนเริ่มเรียนเราวัดระดับให้ฟรี แล้วจัดกลุ่มตามระดับ ครูใช้ภาพ ท่าทาง เพลง และเกม ให้เด็กเข้าใจได้แม้ยังไม่มีพื้นฐาน'
      ],
      [
        'โรงเรียนของเราอยากได้ครูชาวต่างชาติ ติดต่อได้ไหม?',
        `ได้ค่ะ โทร ${contact.phone} หรือทัก Facebook ของ Brighton เพื่อสอบถามเรื่องครูชาวต่างชาติและกิจกรรมสำหรับโรงเรียน`
      ]
    ],
    cta: {
      title: 'อยากให้ลูกลองเรียนกับครูของเรา?',
      text: 'เริ่มจากวัดระดับภาษาฟรี แล้วครูจะแนะนำคลาสที่เหมาะกับลูก'
    }
  },

  {
    slug: 'camp',
    path: '/camp',
    label: 'ค่ายปิดเทอม',
    card: 'Kindy Fun Camp ค่ายภาษาอังกฤษทุกช่วงปิดเทอม',
    photoKeyword: 'Camp',
    meta: {
      title: 'ค่ายภาษาอังกฤษปิดเทอม พะเยา (Kindy Fun Camp) - Brighton Language Academy',
      description:
        'Kindy Fun Camp ค่ายภาษาอังกฤษช่วงปิดเทอมที่พะเยา เรียนกับครูชาวต่างชาติ ทำอาหาร ทดลองวิทยาศาสตร์ ออกสำรวจธรรมชาติ จันทร์–พฤหัสบดี 08:30–15:30 น.'
    },
    eyebrow: 'Kindy Fun Camp',
    title: { lead: 'ค่ายภาษาอังกฤษ', highlight: 'ปิดเทอม', tail: 'ที่พะเยา' },
    intro:
      'ค่ายปิดเทอมที่ชวนเด็กๆ ออกจากห้องเรียน มาเล่น ลงมือทำ ทดลอง และออกสำรวจ พร้อมใช้ภาษาอังกฤษกับครูชาวต่างชาติแบบเป็นธรรมชาติ เพราะการเรียนรู้ที่ดีที่สุด อาจเริ่มต้นจากคำว่า “สนุก!”',
    // Update each school break: the term, the weeks and the price. Dates are ISO (YYYY-MM-DD).
    camp: {
      term: 'ปิดเทอม ตุลาคม 2569',
      schedule: 'จันทร์–พฤหัสบดี 08:30–15:30 น.',
      opens: '08:30',
      closes: '15:30',
      price: 1900,
      priceLabel: '1,900 บาท / สัปดาห์',
      bundleLabel: '3 สัปดาห์ 4,900 บาท (ปกติ 5,700 บาท)',
      weeks: [
        {
          name: 'Week 1 · Cooking Camp',
          start: '2026-10-12',
          end: '2026-10-15',
          text: 'Little Chefs เปิดครัว 4 ประเทศ ทั้งไทย ตะวันตก จีน และญี่ปุ่น ไปจ่ายตลาด ลงมือทำอาหาร และชิมฝีมือตัวเอง'
        },
        {
          name: 'Week 2 · Science Camp',
          start: '2026-10-19',
          end: '2026-10-22',
          text: 'เปลี่ยนความสงสัยให้เป็นการค้นพบ ทดลองจริง สังเกตจริง กับวิทยาศาสตร์แบบ Hands-on'
        },
        {
          name: 'Week 3 · Camping Adventure',
          start: '2026-10-26',
          end: '2026-10-29',
          text: 'ออกไปเรียนรู้นอกห้องเรียน ฝึกทักษะชีวิต ใกล้ชิดธรรมชาติ ดูสัตว์ และลองทำนาด้วยตัวเอง'
        }
      ]
    },
    sections: [
      {
        heading: 'ลูกจะได้อะไรจากค่าย',
        style: 'cards',
        items: [
          ['ภาษาอังกฤษ', 'ใช้ภาษาอังกฤษกับครูชาวต่างชาติตลอดวัน ผ่านกิจกรรมจริง ไม่ใช่การท่องจำ'],
          ['ความกล้าและความมั่นใจ', 'ได้ลองสิ่งใหม่ นำเสนอผลงาน และพูดต่อหน้าเพื่อนๆ'],
          ['ทักษะชีวิตและ EF', 'วางแผน ทำตามขั้นตอน แก้ปัญหา และทำงานร่วมกับเพื่อน'],
          ['เพื่อนใหม่', 'สนุกไปกับเพื่อนวัยเดียวกันตลอดช่วงปิดเทอม']
        ]
      },
      {
        heading: 'ค่ายสำหรับโรงเรียน',
        style: 'points',
        items: [
          [
            'Academic Camp',
            'Brighton จัด Academic Camp ให้นักเรียนชั้น ป.3 และ ป.6 โรงเรียนอนุบาลพะเยา เรียนรู้แบบ Active Learning ครบ 5 กลุ่มสาระ ได้แก่ คณิตศาสตร์ วิทยาศาสตร์ สังคมศึกษา ภาษาไทย และภาษาอังกฤษ'
          ],
          [
            'จัดค่ายให้โรงเรียนของคุณ',
            `โรงเรียนที่สนใจจัดค่ายภาษาอังกฤษหรือ Academic Camp ติดต่อได้ที่ ${contact.phone}`
          ]
        ]
      }
    ],
    english: {
      lang: 'th',
      heading: 'ค่ายภาษาอังกฤษช่วงปิดเทอมในพะเยา',
      text: 'Kindy Fun Camp จัดขึ้นทุกช่วงปิดเทอมที่ Brighton Language Academy พะเยา แต่ละสัปดาห์มีธีมของตัวเอง ทั้งทำอาหาร วิทยาศาสตร์ และผจญภัยนอกห้องเรียน เด็กๆ ได้ใช้ภาษาอังกฤษตลอดทั้งวันกับครูชาวต่างชาติของเรา เลือกสมัครเป็นรายสัปดาห์ หรือสมัครครบทั้งค่ายก็ได้'
    },
    faqs: [
      [
        'ค่ายจัดช่วงไหนบ้าง?',
        'Kindy Fun Camp จัดทุกช่วงปิดเทอม ติดตามรอบถัดไปได้ที่หน้านี้และ Facebook ของ Brighton ค่ะ'
      ],
      [
        'สมัครเป็นรายสัปดาห์ได้ไหม?',
        'ได้ค่ะ เลือกเฉพาะสัปดาห์ที่สนใจ หรือสมัครครบทุกสัปดาห์ในราคาพิเศษก็ได้'
      ],
      [
        'ลูกไม่เก่งภาษาอังกฤษ มาค่ายได้ไหม?',
        'ได้ค่ะ ค่ายเน้นให้เด็กได้ใช้ภาษาผ่านกิจกรรม ครูช่วยด้วยภาพ ท่าทาง และการลงมือทำ ไม่ต้องมีพื้นฐานมาก่อน'
      ],
      ['สมัครอย่างไร?', `โทร ${contact.phone} หรือทัก Facebook ของ Brighton ได้เลยค่ะ`]
    ],
    cta: {
      title: 'จองที่นั่งค่ายปิดเทอม',
      text: 'ที่นั่งมีจำนวนจำกัด สอบถามรอบที่ว่างและสมัครได้เลย'
    }
  },

  {
    slug: 'ef',
    path: '/ef',
    label: 'เสริมพัฒนาการ EF',
    card: 'กิจกรรมในและนอกห้องเรียน ที่ช่วยฝึกทักษะ EF ของลูก',
    photoKeyword: 'Fun Day',
    meta: {
      title: 'เรียนภาษาอังกฤษ เสริมพัฒนาการ EF สำหรับเด็ก พะเยา - Brighton Language Academy',
      description:
        'เรียนภาษาอังกฤษพร้อมเสริมพัฒนาการเด็กด้วยกิจกรรมที่ฝึกทักษะ EF ทั้งในห้องเรียนและนอกห้องเรียน ที่ Brighton Language Academy พะเยา'
    },
    eyebrow: 'Executive Functions',
    title: { lead: 'เรียนภาษาอังกฤษ', highlight: 'เสริม EF', tail: 'ให้ลูกเติบโตอย่างรอบด้าน' },
    intro:
      'EF (Executive Functions) คือทักษะของสมองที่ช่วยให้เด็กจำ วางแผน ควบคุมตัวเอง และปรับตัวได้ ที่ Brighton เราออกแบบกิจกรรมทั้งในและนอกห้องเรียนให้ลูกได้ฝึกทักษะเหล่านี้ ไปพร้อมกับการใช้ภาษาอังกฤษ',
    sections: [
      {
        heading: 'ทักษะ EF ที่ลูกได้ฝึก',
        style: 'cards',
        items: [
          ['ความจำใช้งาน', 'Working Memory — จำคำสั่ง จำขั้นตอน และนำสิ่งที่เรียนมาใช้ต่อ'],
          ['การยั้งคิด', 'Inhibitory Control — รอคอย ผลัดกันเล่น และทำตามกติกา'],
          [
            'ความคิดยืดหยุ่น',
            'Cognitive Flexibility — เปลี่ยนกิจกรรม ลองวิธีใหม่ เมื่อแผนแรกไม่ได้ผล'
          ],
          ['การวางแผนและลงมือทำ', 'Planning — คิด เตรียม และทำงานจนสำเร็จ ทั้งคนเดียวและเป็นทีม']
        ]
      },
      {
        heading: 'ในห้องเรียน',
        style: 'points',
        items: [
          ['เกมและเพลงที่มีกติกา', 'ฝึกฟังคำสั่ง รอคิว และควบคุมตัวเองระหว่างเล่น'],
          ['Phonics และเรื่องเล่า', 'ฝึกจำเสียง ลำดับเรื่อง และนำคำใหม่ไปใช้ในประโยค'],
          ['งานกลุ่มและการนำเสนอ', 'วางแผนกับเพื่อน แบ่งหน้าที่ และนำเสนอผลงานเป็นภาษาอังกฤษ'],
          [
            'คาบเรียนหลายช่วง',
            'Warm-up, Learn, Practice, Share ฝึกเปลี่ยนโหมดความคิดอย่างเป็นธรรมชาติ'
          ]
        ]
      },
      {
        heading: 'นอกห้องเรียน',
        style: 'points',
        items: [
          ['ทำอาหาร', 'ไปจ่ายตลาด เตรียมวัตถุดิบ และทำตามสูตรทีละขั้นตอน'],
          ['ทดลองวิทยาศาสตร์', 'ตั้งคำถาม สังเกต และหาคำตอบด้วยตัวเอง'],
          ['ออกสำรวจธรรมชาติ', 'ฝึกทักษะชีวิต แก้ปัญหาเฉพาะหน้า และทำงานร่วมกับเพื่อน'],
          ['กิจกรรมตามเทศกาล', 'เช่น Halloween และลอยกระทง ได้คิด สร้างสรรค์ และแสดงออก']
        ]
      }
    ],
    english: {
      heading: 'English lessons that build executive function skills',
      text: 'At Brighton in Phayao, games with rules, phonics routines, group projects, cooking, science experiments and outdoor activities are planned so children practise working memory, self-control, flexible thinking and planning while they use English.'
    },
    faqs: [
      [
        'EF คืออะไร?',
        'EF หรือ Executive Functions คือทักษะการคิดขั้นสูงของสมอง เช่น ความจำใช้งาน การยั้งคิด ความคิดยืดหยุ่น และการวางแผน ซึ่งช่วยให้เด็กเรียนรู้และใช้ชีวิตได้ดี'
      ],
      [
        'กิจกรรม EF มีในคอร์สไหนบ้าง?',
        'อยู่ในคลาสภาษาอังกฤษสำหรับเด็ก เช่น English Level และ Brighton Phonics และในค่ายปิดเทอม Kindy Fun Camp ค่ะ'
      ],
      [
        'ผู้ปกครองจะรู้พัฒนาการของลูกได้อย่างไร?',
        'ครูจะแจ้งความคืบหน้าและผลงานของลูกเป็นระยะ พร้อมแนะนำวิธีฝึกต่อที่บ้าน'
      ]
    ],
    cta: {
      title: 'ให้ลูกได้ทั้งภาษาและทักษะชีวิต',
      text: 'นัดวัดระดับภาษาฟรี แล้วครูจะแนะนำคลาสและกิจกรรมที่เหมาะกับวัยของลูก'
    }
  },

  {
    slug: 'mep',
    path: '/mep',
    label: 'ติวเสริม MEP / EP',
    card: 'ติวเสริมสำหรับนักเรียนห้องเรียน MEP / EP และเตรียมสอบเข้า',
    photoKeyword: 'English Level',
    meta: {
      title: 'ติวเสริม MEP / EP พะเยา (Mini English Program) - Brighton Language Academy',
      description:
        'ติวเสริมภาษาอังกฤษสำหรับนักเรียนห้องเรียน MEP และ EP ในพะเยา ทบทวนบทเรียน คำศัพท์วิชาต่างๆ เป็นภาษาอังกฤษ และเตรียมสอบเข้า กับครูชาวต่างชาติ'
    },
    eyebrow: 'MEP / EP Support',
    title: { lead: 'ติวเสริมสำหรับนักเรียน', highlight: 'MEP / EP', tail: 'ในพะเยา' },
    intro:
      'ลูกเรียนห้อง MEP (Mini English Program) หรือ EP (English Program) อยู่ หรือกำลังเตรียมสอบเข้า? Brighton ช่วยเสริมให้ลูกตามบทเรียนทัน เข้าใจวิชาที่เรียนเป็นภาษาอังกฤษ และกล้าใช้ภาษามากขึ้น กับครูชาวต่างชาติที่สอนอยู่ในโรงเรียนต่างๆ ทั่วพะเยา',
    sections: [
      {
        heading: 'เหมาะกับใคร',
        style: 'cards',
        items: [
          ['นักเรียนห้อง MEP / EP', 'ที่อยากตามบทเรียนให้ทัน และเข้าใจเนื้อหามากขึ้น'],
          ['เตรียมสอบเข้า MEP / EP', 'ฝึกทักษะภาษาอังกฤษ ทั้งข้อสอบและการสัมภาษณ์'],
          ['เด็กที่ยังไม่กล้าพูด', 'ฝึกพูดและฟังกับครูชาวต่างชาติ จนมั่นใจในห้องเรียน']
        ]
      },
      {
        heading: 'เราช่วยอะไรได้บ้าง',
        style: 'points',
        items: [
          ['ทบทวนบทเรียนและการบ้าน', 'ช่วยให้ลูกเข้าใจสิ่งที่เรียนในห้อง MEP / EP และทำงานได้เอง'],
          ['คำศัพท์รายวิชา', 'คำศัพท์และรูปประโยคที่ใช้ในวิชาคณิตศาสตร์และวิทยาศาสตร์ภาษาอังกฤษ'],
          ['ฟังและพูด', 'ฝึกสื่อสารกับครูชาวต่างชาติ ให้คุ้นกับสำเนียงและการตอบคำถามในห้อง'],
          ['เตรียมสอบเข้า', 'ฝึกทำข้อสอบและซ้อมสัมภาษณ์ก่อนสอบเข้าห้อง MEP / EP'],
          [
            'เรียนตัวต่อตัวหรือกลุ่มเล็ก',
            'ผ่าน Private Course ปรับเนื้อหาตามบทเรียนและเป้าหมายของลูก'
          ]
        ]
      }
    ],
    english: {
      heading: 'Mini English Program (MEP) and English Program (EP) support in Phayao',
      text: 'Brighton Language Academy is a language school, not an MEP/EP school. We tutor children who study in Mini English Program or English Program classrooms at Phayao schools, and children preparing for MEP/EP entry: lesson review, subject vocabulary in English, speaking and listening with foreign teachers, and entrance test practice, one-to-one or in small groups.'
    },
    faqs: [
      [
        'Brighton เป็นโรงเรียน MEP หรือโรงเรียนอินเตอร์ไหม?',
        'ไม่ใช่ค่ะ Brighton เป็นโรงเรียนสอนภาษา เราติวเสริมให้นักเรียนที่เรียนห้อง MEP / EP ของโรงเรียนต่างๆ และเด็กที่เตรียมสอบเข้า โดยเรียนกับครูชาวต่างชาติ'
      ],
      [
        'ติวเสริม MEP / EP เรียนแบบไหน?',
        'เรียนตัวต่อตัวหรือกลุ่มเล็กผ่าน Private Course เนื้อหาปรับตามบทเรียนของลูก สอบถามวันและเวลาเรียนได้ที่โรงเรียนค่ะ'
      ],
      [
        'ต้องวัดระดับก่อนไหม?',
        'ก่อนเริ่มเรียนเราวัดระดับภาษาให้ฟรี เพื่อวางแผนการติวให้ตรงกับระดับและเป้าหมายของลูกค่ะ'
      ]
    ],
    cta: {
      title: 'ปรึกษาเรื่องติวเสริม MEP / EP',
      text: 'นัดวัดระดับภาษาฟรี แล้วครูจะวางแผนการติวให้ตรงกับบทเรียนของลูก'
    }
  }
]

export const programBySlug = Object.fromEntries(programs.map((p) => [p.slug, p]))
