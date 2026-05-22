<script setup lang="ts">
import type { HourlyForecast } from '../types/weather'
import { getWeatherInfo } from '../types/weather'

defineProps<{
  hours: HourlyForecast[]
}>()

function formatHour(time: string): string {
  return time.slice(11, 16)
}
</script>

<template>
  <div
    v-if="hours.length > 0"
    class="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 text-white shadow-xl"
  >
    <h3 class="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
      Почасовой прогноз
    </h3>

    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
      <div
        v-for="hour in hours"
        :key="hour.time"
        class="flex min-w-[80px] flex-col items-center gap-1.5 rounded-xl bg-white/5 px-3 py-3"
      >
        <span class="text-xs font-medium text-white/50">{{
          formatHour(hour.time)
        }}</span>
        <span class="text-2xl">{{ getWeatherInfo(hour.weatherCode).icon }}</span>
        <span class="text-sm font-semibold">{{ Math.round(hour.temperature) }}°</span>
        <span class="text-xs text-white/40">{{ hour.windSpeed }} км/ч</span>
      </div>
    </div>
  </div>
</template>
