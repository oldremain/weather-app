<script setup lang="ts">
import type { CurrentWeather, GeoLocation } from '../types/weather'
import { getWeatherInfo } from '../types/weather'

const props = defineProps<{
  weather: CurrentWeather
  location: GeoLocation
}>()

const info = getWeatherInfo(props.weather.weatherCode)
</script>

<template>
  <div
    class="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-8 text-white shadow-xl"
  >
    <div class="mb-2 text-sm font-medium uppercase tracking-wider text-white/60">
      Текущая погода
    </div>
    <h2 class="mb-6 text-2xl font-semibold">
      {{ location.name }}, {{ location.country }}
    </h2>

    <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div class="flex items-center gap-4">
        <span class="text-7xl">{{ info.icon }}</span>
        <div>
          <div class="text-6xl font-bold tracking-tight">
            {{ Math.round(weather.temperature) }}°
          </div>
          <div class="text-sm text-white/60">
            Ощущается как {{ Math.round(weather.apparentTemperature) }}°
          </div>
        </div>
      </div>

      <div class="text-center sm:text-right">
        <div class="mb-3 text-lg font-medium text-white/80">{{ info.label }}</div>
        <div class="space-y-1.5 text-sm text-white/60">
          <div class="flex items-center gap-2 sm:justify-end">
            <span>💧</span> Влажность: {{ weather.humidity }}%
          </div>
          <div class="flex items-center gap-2 sm:justify-end">
            <span>💨</span> Ветер: {{ weather.windSpeed }} км/ч
          </div>
          <div class="flex items-center gap-2 sm:justify-end">
            <span>🌧️</span> Осадки: {{ weather.precipitation }} мм
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
