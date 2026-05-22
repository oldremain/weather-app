import { ref } from 'vue'
import axios from 'axios'
import type {
  GeoLocation,
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
} from '../types/weather'

export function useWeather() {
  const currentWeather = ref<CurrentWeather | null>(null)
  const dailyForecast = ref<DailyForecast[]>([])
  const hourlyForecast = ref<HourlyForecast[]>([])
  const selectedLocation = ref<GeoLocation | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchWeather(location: GeoLocation) {
    isLoading.value = true
    error.value = null
    selectedLocation.value = location

    try {
      const response = await axios.get(
        'https://api.open-meteo.com/v1/forecast',
        {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            current: [
              'temperature_2m',
              'relative_humidity_2m',
              'wind_speed_10m',
              'weather_code',
              'apparent_temperature',
              'precipitation',
            ].join(','),
            daily: [
              'weather_code',
              'temperature_2m_max',
              'temperature_2m_min',
              'precipitation_sum',
              'wind_speed_10m_max',
            ].join(','),
            hourly: [
              'temperature_2m',
              'weather_code',
              'relative_humidity_2m',
              'wind_speed_10m',
            ].join(','),
            timezone: 'auto',
            forecast_days: 7,
          },
        }
      )

      const data = response.data

      currentWeather.value = {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        apparentTemperature: data.current.apparent_temperature,
        precipitation: data.current.precipitation,
      }

      dailyForecast.value = data.daily.time.map(
        (date: string, i: number) => ({
          date,
          weatherCode: data.daily.weather_code[i],
          temperatureMax: data.daily.temperature_2m_max[i],
          temperatureMin: data.daily.temperature_2m_min[i],
          precipitationSum: data.daily.precipitation_sum[i],
          windSpeedMax: data.daily.wind_speed_10m_max[i],
        })
      )

      const now = new Date()
      const currentHour = now.getHours()
      const todayStr = now.toISOString().slice(0, 10)

      hourlyForecast.value = data.hourly.time
        .map((time: string, i: number) => ({
          time,
          temperature: data.hourly.temperature_2m[i],
          weatherCode: data.hourly.weather_code[i],
          humidity: data.hourly.relative_humidity_2m[i],
          windSpeed: data.hourly.wind_speed_10m[i],
        }))
        .filter((h: HourlyForecast) => {
          const hDate = h.time.slice(0, 10)
          const hHour = parseInt(h.time.slice(11, 13), 10)
          return hDate === todayStr && hHour >= currentHour
        })
        .slice(0, 12)
    } catch {
      error.value = 'Не удалось загрузить данные о погоде.'
      currentWeather.value = null
      dailyForecast.value = []
      hourlyForecast.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentWeather,
    dailyForecast,
    hourlyForecast,
    selectedLocation,
    isLoading,
    error,
    fetchWeather,
  }
}
