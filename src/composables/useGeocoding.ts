import { ref } from 'vue'
import axios from 'axios'
import type { GeoLocation } from '../types/weather'

export function useGeocoding() {
  const locations = ref<GeoLocation[]>([])
  const isSearching = ref(false)
  const searchError = ref<string | null>(null)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  async function searchLocations(query: string) {
    if (debounceTimer) clearTimeout(debounceTimer)

    if (query.length < 2) {
      locations.value = []
      return
    }

    debounceTimer = setTimeout(async () => {
      isSearching.value = true
      searchError.value = null

      try {
        const response = await axios.get(
          'https://geocoding-api.open-meteo.com/v1/search',
          {
            params: {
              name: query,
              count: 8,
              language: 'ru',
              format: 'json',
            },
          }
        )

        locations.value = (response.data.results ?? []).map(
          (r: Record<string, unknown>) => ({
            id: r.id as number,
            name: r.name as string,
            latitude: r.latitude as number,
            longitude: r.longitude as number,
            country: r.country as string,
            admin1: (r.admin1 as string) ?? undefined,
          })
        )
      } catch {
        searchError.value = 'Ошибка поиска. Попробуйте ещё раз.'
        locations.value = []
      } finally {
        isSearching.value = false
      }
    }, 300)
  }

  function clearResults() {
    locations.value = []
  }

  return {
    locations,
    isSearching,
    searchError,
    searchLocations,
    clearResults,
  }
}
