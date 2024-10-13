//import fs so i can use it in code
import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

// DONE: Define an interface for the Coordinates object -------------------- PAGE POSSIBLY COMPLETE -------------
interface Coordinates {
 lat: number;
 lon: number;
}

 // TODO: Complete the WeatherService class
 class WeatherService{
  // TODO: Define the baseURL, API key, and city name properties
 private baseURL?: string;
 private apiKey?: string;

 constructor () {

  this.baseURL = process.env.API_BASE_URL || '';
  this.apiKey = process.env.API_KEY || '';

 }

  // DONE: Create fetchLocationData method
  private async fetchLocationData(query: string) {
 //make a fetch call passing the query argument and return the response
    // const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
    const response = this.buildGeocodeQuery(query);
    // const data = await response.json();
    return response;

  }
  // DONE: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
 //if no location data throw an error
  if (!locationData || locationData.length === 0) {
    throw new Error('Location data not found.');
  }
  const { lat, lon } = locationData[0];
  return { lat, lon };
 //destructure the locationData object

 //declare a locally scoped variable that stores an object by calling the coordinates interface with the variables created from destructuring the   locationData object

 //return variable out of method

  }
  // DONE: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
 //declare a locally scoped variable that stores a template literal with base url, city, and api key

 //return variable out

  }
  // DONE: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
 //create a locally scoped variable that stores a template literal with baseURL, coordinates(lat and lon), api key
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
 //return variable out of method

  }
  // DONE: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
 //return a call to the fetchLocationData method and pass as an argument to the function a call to the buildGeocodeQuery() method
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData);
    return coordinates;
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
 //declare a locally scoped response variable and store the results of a fetch call that accepts an argument of buildWeatherQuery(coordinates)
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const weatherData = await response.json();
    return weatherData;
 //return response as JSON

  }
  // DONE: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const currentWeather = {
      temperature: response.main.temp,
      weather: response.weather[0].description,
      city: response.name,
      country: response.sys.country
    };
    return currentWeather;
 //declare a locally scoped variable that stores the format date of response

 //declare a locally scoped variable and store the result of calling new Weather class that returns a new instance

 //return the variable that is storing the object

  }
  // TODO: Complete buildForecastArray method
//   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
//  //declare a locally scoped variable that stores an array of Weather objects...ex [currentWeather]
    
//  //declare a locally scoped variable that filters weatherData

//  //use a for of to iterate thru locally scoped variable of filtered Weather data and push to locally scoped variable that stores an array of Weather objects - a call to the new Weather class for each member of array

//  //return variable that is storing the array of Weather objects

//   }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      const coordinates = await this.fetchAndDestructureLocationData(city);
      const weatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(weatherData);
      return currentWeather;
    //declare a locally scoped variable that store results of calling fetchDestructureLocationData() method
    //if coordinates exist, delcare a locally scoped variable that calls the fetchWeatherData(coordinates) method
   
    //return variable out of method
   
   } catch (err) {
    console.log('Error:', err);
    return err;
   }
  }


}

export default new WeatherService();
