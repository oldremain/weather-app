<script setup lang="ts">
import { useWeather } from './composables/useWeather'
import type { GeoLocation } from './types/weather'
import SearchLocation from './components/SearchLocation.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import HourlyForecast from './components/HourlyForecast.vue'
import DailyForecast from './components/DailyForecast.vue'

const {
  currentWeather,
  dailyForecast,
  hourlyForecast,
  selectedLocation,
  isLoading,
  error,
  fetchWeather,
} = useWeather()

function onSelectLocation(location: GeoLocation) {
  fetchWeather(location)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
    <div class="mx-auto max-w-3xl px-4 py-10">
      <!-- Header -->
      <header class="mb-10 text-center">
        <h1 class="mb-2 text-4xl font-bold text-white">
          <span class="mr-2">🌤️</span>Прогноз погоды
        </h1>
        <p class="text-white/50">
          Выберите город, чтобы увидеть текущую погоду и прогноз
        </p>
      </header>

      <!-- Search -->
      <div class="mb-8">
        <SearchLocation @select="onSelectLocation" />
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div
          class="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"
        />
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300"
      >
        {{ error }}
      </div>

      <!-- Weather data -->
      <div
        v-else-if="currentWeather && selectedLocation"
        class="space-y-6"
      >
        <CurrentWeather
          :weather="currentWeather"
          :location="selectedLocation"
        />
        <HourlyForecast :hours="hourlyForecast" />
        <DailyForecast :days="dailyForecast" />
      </div>

      <!-- Empty state -->
      <div v-else class="py-20 text-center">
        <div class="mb-4 text-6xl">🌍</div>
        <p class="text-lg text-white/40">
          Введите название города в строке поиска
        </p>
      </div>
    </div>
  </div>
</template>
