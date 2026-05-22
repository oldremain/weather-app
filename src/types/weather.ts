export interface GeoLocation {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

export interface CurrentWeather {
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  apparentTemperature: number
  precipitation: number
}

export interface DailyForecast {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  precipitationSum: number
  windSpeedMax: number
}

export interface HourlyForecast {
  time: string
  temperature: number
  weatherCode: number
  humidity: number
  windSpeed: number
}

export const weatherDescriptions: Record<number, { label: string; icon: string }> = {
  0: { label: 'Ясно', icon: '☀️' },
  1: { label: 'Преимущественно ясно', icon: '🌤️' },
  2: { label: 'Переменная облачность', icon: '⛅' },
  3: { label: 'Пасмурно', icon: '☁️' },
  45: { label: 'Туман', icon: '🌫️' },
  48: { label: 'Изморозь', icon: '🌫️' },
  51: { label: 'Лёгкая морось', icon: '🌦️' },
  53: { label: 'Умеренная морось', icon: '🌦️' },
  55: { label: 'Сильная морось', icon: '🌧️' },
  56: { label: 'Ледяная морось', icon: '🌧️' },
  57: { label: 'Сильная ледяная морось', icon: '🌧️' },
  61: { label: 'Небольшой дождь', icon: '🌧️' },
  63: { label: 'Умеренный дождь', icon: '🌧️' },
  65: { label: 'Сильный дождь', icon: '🌧️' },
  66: { label: 'Ледяной дождь', icon: '🌧️' },
  67: { label: 'Сильный ледяной дождь', icon: '🌧️' },
  71: { label: 'Небольшой снег', icon: '🌨️' },
  73: { label: 'Умеренный снег', icon: '🌨️' },
  75: { label: 'Сильный снег', icon: '❄️' },
  77: { label: 'Снежные зёрна', icon: '❄️' },
  80: { label: 'Небольшой ливень', icon: '🌦️' },
  81: { label: 'Умеренный ливень', icon: '🌧️' },
  82: { label: 'Сильный ливень', icon: '🌧️' },
  85: { label: 'Небольшой снегопад', icon: '🌨️' },
  86: { label: 'Сильный снегопад', icon: '❄️' },
  95: { label: 'Гроза', icon: '⛈️' },
  96: { label: 'Гроза с градом', icon: '⛈️' },
  99: { label: 'Гроза с сильным градом', icon: '⛈️' },
}

export function getWeatherInfo(code: number): { label: string; icon: string } {
  return weatherDescriptions[code] ?? { label: 'Неизвестно', icon: '❓' }
}
