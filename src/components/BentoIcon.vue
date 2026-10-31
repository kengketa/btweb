<template>
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.75"
    viewBox="0 0 24 24"
  >
    <component :is="el.tag" v-for="(el, i) in shapes" :key="i" v-bind="el.attrs" />
  </svg>
</template>

<script>
// Small line icons for card headings (BentoCard), drawn on a 24px grid.
const path = (d) => ({ tag: 'path', attrs: { d } })
const circle = (cx, cy, r) => ({ tag: 'circle', attrs: { cx, cy, r } })

const ICONS = {
  target: [circle(12, 12, 9), circle(12, 12, 5), circle(12, 12, 1)],
  route: [
    circle(6, 19, 2.5),
    circle(18, 5, 2.5),
    path('M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5')
  ],
  users: [
    circle(9, 8, 3.5),
    path('M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1'),
    path('M16 4.4a3.5 3.5 0 0 1 0 7.2'),
    path('M18.5 14.2A5 5 0 0 1 21.5 19v1')
  ],
  chat: [path('M21 14.5a2 2 0 0 1-2 2H8l-4.5 4V5.5a2 2 0 0 1 2-2H19a2 2 0 0 1 2 2z')],
  chart: [path('M3.5 3.5v17h17'), path('M8 16.5v-4'), path('M12.5 16.5v-8'), path('M17 16.5v-6')],
  book: [
    path('M2.5 4.5h6a3.5 3.5 0 0 1 3.5 3.5v12a2.5 2.5 0 0 0-2.5-2.5h-7z'),
    path('M21.5 4.5h-6A3.5 3.5 0 0 0 12 8v12a2.5 2.5 0 0 1 2.5-2.5h7z')
  ],
  globe: [circle(12, 12, 9), path('M3 12h18'), path('M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z')],
  sun: [
    circle(12, 12, 4),
    path(
      'M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4'
    )
  ],
  sparkle: [
    path('M12 3.5 13.8 9 19.5 11 13.8 13 12 18.5 10.2 13 4.5 11 10.2 9z'),
    path('M19 3v3M17.5 4.5h3')
  ],
  school: [
    path('M22 9.5 12 4.5 2 9.5l10 5z'),
    path('M6 11.5v5c3.5 2.5 8.5 2.5 12 0v-5'),
    path('M22 9.5v5')
  ],
  calendar: [
    { tag: 'rect', attrs: { x: 3.5, y: 4.5, width: 17, height: 16, rx: 2.5 } },
    path('M8 2.5v4M16 2.5v4M3.5 10h17')
  ],
  pin: [
    path('M19.5 10c0 5.5-7.5 11.5-7.5 11.5S4.5 15.5 4.5 10a7.5 7.5 0 0 1 15 0z'),
    circle(12, 10, 2.5)
  ],
  heart: [
    path(
      'M12 20.5s-8-4.6-8-10.6A4.4 4.4 0 0 1 8.4 5.5c1.5 0 2.8.8 3.6 2 .8-1.2 2.1-2 3.6-2A4.4 4.4 0 0 1 20 9.9c0 6-8 10.6-8 10.6z'
    )
  ],
  check: [path('M5 12.5 9.5 17 19 7.5')],
  checkCircle: [circle(12, 12, 9), path('M8 12.3l2.7 2.7L16 9.7')],
  arrow: [path('M5 12h14M13 6l6 6-6 6')],
  home: [path('M3.5 11 12 4l8.5 7'), path('M5.5 9.5V20h13V9.5'), path('M10 20v-5.5h4V20')],
  trophy: [
    path('M7.5 4.5h9v5a4.5 4.5 0 0 1-9 0z'),
    path('M7.5 6.5H4.5a3 3 0 0 0 3 4M16.5 6.5h3a3 3 0 0 1-3 4'),
    path('M12 14v3.5M8.5 20.5h7M9.5 17.5h5v3h-5z')
  ],
  megaphone: [
    path('M3.5 10v4a1 1 0 0 0 1 1H7l9 4.5v-15L7 9H4.5a1 1 0 0 0-1 1z'),
    path('M7 15l1.5 5h2.5L9.8 15.6'),
    path('M19 9.5a3.5 3.5 0 0 1 0 5')
  ],
  phone: [
    path(
      'M5 3.5h3l1.5 4.5-2 1.5a11 11 0 0 0 5 5l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2z'
    )
  ],
  wallet: [
    { tag: 'rect', attrs: { x: 3, y: 6, width: 18, height: 13.5, rx: 2.5 } },
    path('M3 9.5h14.5M16 14.5h1.5'),
    path('M5.5 6l9-2.5 1 2.5')
  ],
  help: [
    circle(12, 12, 9),
    path('M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.6'),
    path('M12 17.2v.1')
  ]
}

export default {
  name: 'BentoIcon',
  props: {
    name: { type: String, required: true }
  },
  computed: {
    shapes() {
      return ICONS[this.name] ?? []
    }
  }
}
</script>
