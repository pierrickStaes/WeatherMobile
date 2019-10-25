import WeatherService from '../services/weather-services';

export const SEARCH_WEATHER = "activer_weather_service";
const serv = new WeatherService();

export const getWeatherService=()=>{
    return {type:SEARCH_WEATHER, paylord:serv}
}