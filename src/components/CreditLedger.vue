<template>
  <!-- The credit balance replaying its recent history: each class taken off and each pack
       paid for slides in (newest on top) while the balance ticks to match, ending on
       today's balance. Pre-rendered HTML and "reduce motion" show the finished ledger. -->
  <div ref="root" class="mt-auto flex flex-col gap-4">
    <TransitionGroup class="flex flex-col gap-1.5" name="row" tag="ul">
      <li
        v-for="t in shownRows"
        :key="t.date + t.desc"
        class="flex items-center justify-between gap-3 rounded-2xl bg-white/75 px-3.5 py-2.5 text-[13px]"
      >
        <span class="flex min-w-0 items-center gap-2.5">
          <span
            :class="t.amount < 0 ? 'bg-blush text-brand' : 'bg-[#E5F7EC] text-[#0E8A43]'"
            class="grid h-7 w-7 flex-none place-items-center rounded-full text-[13px] font-bold"
            >{{ t.amount < 0 ? '−' : '+' }}</span
          >
          <span class="min-w-0">
            <span class="block truncate font-medium text-ink">{{
              t.kind === 'pay' ? 'ชำระ ' + t.price : t.desc
            }}</span>
            <span class="block text-[11.5px] text-muted">{{ t.date }}</span>
          </span>
        </span>
        <span
          :class="t.amount < 0 ? 'text-brand' : 'text-[#0E8A43]'"
          class="flex-none font-condensed text-[15px] font-bold"
          >{{ t.amount > 0 ? '+' : '−' }}{{ Math.abs(t.amount) }}</span
        >
      </li>
    </TransitionGroup>
    <p class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span
        :class="bump ? 'scale-110' : 'scale-100'"
        class="inline-block origin-left font-condensed text-[56px] font-bold leading-none tabular-nums transition-transform duration-300"
        >{{ Math.round(display) }}</span
      >
      <span class="text-sm text-body">เครดิต · ใช้ได้ถึง {{ validUntil }}</span>
    </p>
  </div>
</template>

<script>
import { watchOnScreen } from '@/composables/useOnScreen'

const STEP = 1300 // ms between one entry and the next
const START = 500

export default {
  name: 'CreditLedger',
  props: {
    balance: { type: Number, required: true }, // today's balance
    transactions: { type: Array, required: true }, // newest first: { kind, desc, date, amount, price? }
    validUntil: { type: String, required: true }
  },
  data() {
    // shown: how many of the oldest entries have happened; all of them until the replay
    return { shown: this.transactions.length, display: this.balance, bump: false, timers: [] }
  },
  computed: {
    // the entries that have happened, newest first
    shownRows() {
      return this.transactions.slice(this.transactions.length - this.shown)
    },
    // the balance once `shown` entries have happened
    target() {
      const pending = this.transactions.slice(0, this.transactions.length - this.shown)
      return this.balance - pending.reduce((sum, t) => sum + t.amount, 0)
    }
  },
  watch: {
    target(to, from) {
      this.tween(from, to)
    }
  },
  mounted() {
    this.stop = watchOnScreen(this.$refs.root, {
      onEnter: () => this.replay(),
      onLeave: () => this.clear()
    })
  },
  beforeUnmount() {
    this.stop?.()
    this.clear()
  },
  methods: {
    clear() {
      this.timers.forEach(clearTimeout)
      this.timers = []
      cancelAnimationFrame(this.frame)
      // stopped midway (scrolled away): settle on the figure for the entries shown
      this.display = this.target
      this.bump = false
    },
    replay() {
      this.clear()
      this.shown = 0
      cancelAnimationFrame(this.frame)
      this.display = this.target
      this.transactions.forEach((_, i) => {
        this.timers.push(setTimeout(() => (this.shown = i + 1), START + i * STEP))
      })
    },
    // count the balance from one figure to the next, with a small bump as it lands
    tween(from, to) {
      cancelAnimationFrame(this.frame)
      const start = performance.now()
      const run = (now) => {
        const t = Math.min(1, (now - start) / 600)
        this.display = from + (to - from) * (1 - Math.pow(1 - t, 3))
        if (t < 1) this.frame = requestAnimationFrame(run)
        else {
          this.bump = true
          this.timers.push(setTimeout(() => (this.bump = false), 220))
        }
      }
      this.frame = requestAnimationFrame(run)
    }
  }
}
</script>

<style scoped>
.row-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.row-enter-from {
  opacity: 0;
  transform: translateY(-14px) scale(0.96);
}
.row-move {
  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>
