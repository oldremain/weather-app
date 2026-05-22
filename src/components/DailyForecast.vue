<script setup lang="ts">
import type { DailyForecast } from '../types/weather'
import { getWeatherInfo } from '../types/weather'

defineProps<{
  days: DailyForecast[]
}>()

function formatDay(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.getTime() === today.getTime()) return 'Сегодня'
  if (date.getTime() === tomorrow.getTime()) return 'Завтра'

  return date.toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}
</script>

<template>
  <div
    class="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 text-white shadow-xl"
  >
    <h3 class="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
      Прогноз на 7 дней
    </h3>

    <div class="space-y-2">
      <div
        v-for="day in days"
        :key="day.date"
        class="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
      >
        <div class="w-28 text-sm font-medium">{{ formatDay(day.date) }}</div>

        <div class="flex items-center gap-2">
          <span class="text-2xl">{{
            getWeatherInfo(day.weatherCode).icon
          }}</span>
          <span class="hidden w-36 text-xs text-white/50 sm:inline">{{
            getWeatherInfo(day.weatherCode).label
          }}</span>
        </div>

        <div class="flex items-center gap-3 text-sm">
          <span class="font-semibold">{{ Math.round(day.temperatureMax) }}°</span>
          <span class="text-white/40">{{ Math.round(day.temperatureMin) }}°</span>
        </div>

        <div class="hidden items-center gap-4 text-xs text-white/40 sm:flex">
          <span>🌧️ {{ day.precipitationSum }} мм</span>
          <span>💨 {{ Math.round(day.windSpeedMax) }} км/ч</span>
        </div>
      </div>
    </div>
  </div>
</template>
