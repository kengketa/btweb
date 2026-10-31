<template>
  <!-- A PromptPay QR being paid: a scan line sweeps over the code, then a green tick pops
       up with "ชำระแล้ว", and it starts again — on a loop while on screen. -->
  <div ref="root" class="mt-auto flex items-end gap-4">
    <div
      class="relative h-[104px] w-[104px] flex-none overflow-hidden rounded-[20px] border-2 border-app-navy bg-white p-2 shadow-[0_4px_0_#1B2559]"
    >
      <svg
        aria-hidden="true"
        class="h-full w-full"
        :viewBox="`-1 -1 ${qr.size + 2} ${qr.size + 2}`"
      >
        <path :d="qr.path" fill="#1B2559" />
        <g v-for="f in qr.finders" :key="f.join()">
          <rect :x="f[0] + 0.5" :y="f[1] + 0.5" fill="none" height="6" stroke="#1B2559" width="6" />
          <rect :x="f[0] + 2" :y="f[1] + 2" fill="#1B2559" height="3" width="3" />
        </g>
      </svg>
      <span v-if="phase === 'scan'" aria-hidden="true" class="scan"></span>
      <Transition name="paid">
        <span
          v-if="phase === 'paid'"
          class="absolute inset-0 grid place-items-center bg-white/85 backdrop-blur-[1px]"
        >
          <span class="grid h-12 w-12 place-items-center rounded-full bg-[#06C755] text-white">
            <svg
              class="tick h-6 w-6"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 12.5 9.5 17 19 7.5" />
            </svg>
          </span>
        </span>
      </Transition>
    </div>
    <div class="flex min-w-0 flex-col gap-2">
      <span class="font-condensed text-[40px] font-bold leading-none">{{ amount }}</span>
      <span class="self-start rounded-full bg-white px-3 py-1.5 text-[13px] font-medium">{{
        title
      }}</span>
      <span class="flex h-5 items-center gap-1.5 text-[13px] font-medium">
        <Transition mode="out-in" name="status">
          <span v-if="phase === 'paid'" key="paid" class="text-[#0E8A43]">✓ ชำระแล้ว</span>
          <span v-else-if="phase === 'scan'" key="scan" class="text-body">กำลังสแกน…</span>
          <span v-else key="idle" class="text-muted">สแกนด้วยแอปธนาคารใดก็ได้</span>
        </Transition>
      </span>
    </div>
  </div>
</template>

<script>
import { watchOnScreen } from '@/composables/useOnScreen'

export default {
  name: 'PayScan',
  props: {
    qr: { type: Object, required: true }, // { size, path, finders }
    amount: { type: String, required: true },
    title: { type: String, required: true }
  },
  data() {
    return { phase: 'idle', timer: 0 }
  },
  mounted() {
    this.stop = watchOnScreen(this.$refs.root, {
      onEnter: () => this.loop(600),
      onLeave: () => {
        clearTimeout(this.timer)
        this.phase = 'idle'
      }
    })
  },
  beforeUnmount() {
    this.stop?.()
    clearTimeout(this.timer)
  },
  methods: {
    // idle → scan (1.8s) → paid (2.6s) → idle (1.4s) → …
    loop(wait = 1400) {
      clearTimeout(this.timer)
      this.phase = 'idle'
      this.timer = setTimeout(() => {
        this.phase = 'scan'
        this.timer = setTimeout(() => {
          this.phase = 'paid'
          this.timer = setTimeout(() => this.loop(), 2600)
        }, 1800)
      }, wait)
    }
  }
}
</script>

<style scoped>
.scan {
  position: absolute;
  inset-inline: 6px;
  top: 6px;
  height: 3px;
  border-radius: 9999px;
  background: #c8102e;
  box-shadow: 0 0 12px 3px rgb(200 16 46 / 0.45);
  animation: scan 0.9s ease-in-out infinite alternate;
}
@keyframes scan {
  to {
    top: calc(100% - 9px);
  }
}
.paid-enter-active {
  transition: opacity 0.25s ease;
}
.paid-enter-active > span {
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.paid-leave-active {
  transition: opacity 0.3s ease;
}
.paid-enter-from,
.paid-leave-to {
  opacity: 0;
}
.paid-enter-from > span {
  transform: scale(0.3);
}
.tick path {
  stroke-dasharray: 24;
  animation: draw 0.4s 0.2s ease-out backwards;
}
@keyframes draw {
  from {
    stroke-dashoffset: 24;
  }
}
.status-enter-active,
.status-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.25s ease;
}
.status-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
.status-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
