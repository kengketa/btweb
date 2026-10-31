<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'div'"
    :class="[tones[tone].card, (to || href) && 'group']"
    v-bind="linkAttrs"
    class="lift flex min-w-0 flex-col rounded-[28px] border p-5 md:rounded-[32px] md:p-8"
  >
    <div v-if="title" class="flex flex-col gap-1.5">
      <!-- the icon keeps its place beside the title even when a long title wraps -->
      <div class="flex items-start gap-2.5">
        <BentoIcon
          v-if="icon"
          :class="tones[tone].icon"
          :name="icon"
          class="card-icon mt-[3px] h-6 w-6 flex-none md:mt-1"
        />
        <div class="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          <component
            :is="`h${level}`"
            class="font-display text-xl font-semibold leading-snug md:text-[24px]"
            ><slot name="title">{{ title }}</slot></component
          >
          <span
            v-if="tag"
            :class="tones[tone].tag"
            class="card-tag rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5"
            >{{ tag }}</span
          >
        </div>
      </div>
      <p v-if="sub" :class="tones[tone].sub" class="text-[15px] leading-[1.65]">{{ sub }}</p>
    </div>
    <div :class="title && 'mt-4 md:mt-6'" class="flex flex-1 flex-col">
      <slot />
    </div>
    <div v-if="$slots.foot" :class="tones[tone].sub" class="mt-4 text-[13px] leading-[1.6] md:mt-5">
      <slot name="foot" />
    </div>
  </component>
</template>

<script>
import BentoIcon from './BentoIcon.vue'

// As a card arrives with v-reveal, its icon and tag pop in (.card-icon / .card-tag in
// tailwind.scss). One idea per card: icon + title + one-line subtitle, then the card's own visual (the
// default slot) and an optional footnote. Cards sit in bento grids of mixed widths
// (issue #31). `to` makes the whole card a router link, `href` an external one (new tab).
const TONES = {
  white: {
    card: 'border-line bg-white text-ink shadow-[0_24px_48px_-36px_rgba(34,28,25,.28)]',
    sub: 'text-muted',
    icon: 'text-brand',
    tag: 'bg-sun text-ink'
  },
  paper: {
    card: 'border-line2 bg-paper text-ink',
    sub: 'text-muted',
    icon: 'text-brand',
    tag: 'bg-white text-ink'
  },
  sun: {
    card: 'border-[#F1DFAE] bg-sunsoft text-ink',
    sub: 'text-body',
    icon: 'text-ink',
    tag: 'bg-ink text-sun'
  },
  blush: {
    card: 'border-[#F0CFC9] bg-blush text-ink',
    sub: 'text-body',
    icon: 'text-brand',
    tag: 'bg-white text-brand'
  },
  sage: {
    card: 'border-[#D3E0CF] bg-sage text-ink',
    sub: 'text-body',
    icon: 'text-sagedeep',
    tag: 'bg-white text-sagedeep'
  },
  peach: {
    card: 'border-[#F4D2BF] bg-peach text-ink',
    sub: 'text-body',
    icon: 'text-peachdeep',
    tag: 'bg-white text-peachdeep'
  },
  brand: {
    card: 'border-brand bg-brand text-white shadow-[0_24px_48px_-30px_rgba(190,30,45,.6)]',
    sub: 'text-white/80',
    icon: 'text-sun',
    tag: 'bg-sun text-ink'
  },
  ink: {
    card: 'border-ink bg-ink text-cream shadow-[0_24px_48px_-30px_rgba(34,28,25,.55)]',
    sub: 'text-cream/70',
    icon: 'text-sun',
    tag: 'bg-sun text-ink'
  }
}

export default {
  name: 'BentoCard',
  components: { BentoIcon },
  props: {
    title: { type: String, default: '' },
    sub: { type: String, default: '' },
    icon: { type: String, default: '' },
    tag: { type: String, default: '' },
    tone: { type: String, default: 'white', validator: (t) => t in TONES },
    // heading level of the title: h3 inside a section, h2 when the card is the section
    level: { type: Number, default: 3 },
    to: { type: [String, Object], default: null },
    href: { type: String, default: null }
  },
  data() {
    return { tones: TONES }
  },
  computed: {
    // only the attributes the rendered element needs: a null `href` falling through to a
    // router-link would override the href it generates
    linkAttrs() {
      if (this.to) return { to: this.to }
      if (this.href) return { href: this.href, rel: 'noopener', target: '_blank' }
      return {}
    }
  }
}
</script>
