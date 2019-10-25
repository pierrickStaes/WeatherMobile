import axios from 'axios';

const key='5c3629c0f1348c109ac2485fc4776461';
const url=`https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric`;

class WeatherService{
    getWeatherHome(ville){
        return axios.get(`${url}&q=${ville},fr`);
    }
    getWeatherCoords(long, lat){
        return axios.get(`${url}&lat=${lat}&lon=${long}`)
    }
}

export default WeatherService;