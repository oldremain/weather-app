<script setup lang="ts">
import { ref } from 'vue'
import { useGeocoding } from '../composables/useGeocoding'
import type { GeoLocation } from '../types/weather'

const emit = defineEmits<{
  select: [location: GeoLocation]
}>()

const query = ref('')
const showDropdown = ref(false)
const { locations, isSearching, searchError, searchLocations, clearResults } =
  useGeocoding()

function onInput() {
  showDropdown.value = true
  searchLocations(query.value)
}

function selectLocation(location: GeoLocation) {
  query.value = `${location.name}, ${location.country}`
  showDropdown.value = false
  clearResults()
  emit('select', location)
}

function onBlur() {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}
</script>

<template>
  <div class="relative w-full max-w-lg mx-auto">
    <div class="relative">
      <input
        v-model="query"
        type="text"
        placeholder="Введите название города..."
        class="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-3.5 text-white placeholder-white/50 outline-none transition-all focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
        @input="onInput"
        @focus="showDropdown = true"
        @blur="onBlur"
      />
      <svg
        v-if="!isSearching"
        class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <div
        v-else
        class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
      />
    </div>

    <div
      v-if="showDropdown && (locations.length > 0 || searchError)"
      class="absolute z-50 mt-2 w-full rounded-xl border border-white/20 bg-slate-800/95 backdrop-blur-md shadow-2xl overflow-hidden"
    >
      <p v-if="searchError" class="px-4 py-3 text-sm text-red-400">
        {{ searchError }}
      </p>
      <button
        v-for="loc in locations"
        :key="loc.id"
        class="flex w-full items-center gap-3 px-4 py-3 text-left text-white/90 transition-colors hover:bg-white/10"
        @click="selectLocation(loc)"
      >
        <span class="text-lg">📍</span>
        <div>
          <div class="font-medium">{{ loc.name }}</div>
          <div class="text-xs text-white/50">
            {{ [loc.admin1, loc.country].filter(Boolean).join(', ') }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
