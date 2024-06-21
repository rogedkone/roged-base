import axios, { AxiosInstance } from 'axios';
import config from '@utils/config';
import { Forecast } from '../types';

const openWeatherInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

openWeatherInstance.interceptors.request.use(async (req) => ({
  ...req,
  params: {
    ...req.params,
    appid: config.OPEN_WEATHER_API_KEY,
    units: 'metric',
    lang: 'ru',
  },
}));

interface OpenWeatherClient {
  lat: string | number;
  lon: string | number;
}

export default class ApiOpenWeather {
  protected lat: string | number;

  protected lon: string | number;

  protected api: AxiosInstance;

  constructor({ lat, lon }: OpenWeatherClient) {
    this.lat = lat;
    this.lon = lon;
    this.api = openWeatherInstance;
  }

  get forecast() {
    return this.api
      .get<{
      list: Forecast[];
    }>('forecast', { params: { lat: this.lat, lon: this.lon } })
      .then(({ data: { list } }) => list);
  }
}
