//import fs so i can use it in code along with unique ids
import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// DONE: Define a City class with name and id properties

class City {
  cityName: string;
  cityID: string;
                                                    //--------PAGE POSSIBLY COMPLETE-------------
  constructor (
    cityName: string,
    cityID: string
  ) {
    this.cityName = cityName;
    this.cityID = cityID;
  }

}
// DONE: Complete the HistoryService class
class HistoryService {
  // DONE: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('db/db.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
   }
  // DONE: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
   return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
   }
  // DONE: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities =[];
      }

      return parsedCities;
    });
   }
  // DONE: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    if (!city) {
      throw new Error('city cannot be blank');
    }
    const newCity: City = { cityName: city, cityID: uuidv4() };
    return await this.getCities()
    .then((cities) => {
      if (cities.find((index) => index.cityName === city)) {
        return cities;
      }
      return [...cities, newCity];
    })
    .then((updatedCities) => this.write(updatedCities))
    .then(() => newCity);
   }
  // * BONUS DONE: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
    .then((cities) => cities.filter((city) => city.cityID !== id))
    .then((filteredCities) => this.write(filteredCities));
   }
}

export default new HistoryService();
