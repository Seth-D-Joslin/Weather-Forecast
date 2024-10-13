import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data ---------- PAGE I NEED TO WORK ON SOLVING ----------
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  try {
    const { city } = req.body;
    
    if (!city) {
      return res.status(400).json({ error: 'City name is required.' });
    }
    
    const weatherData = await WeatherService.getWeatherForCity(city);
    
    // TODO: save city to search history
    await HistoryService.addCity(city);
    
    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather:', error);
    res.status(500).json({ error: 'Failed to retrieve weather data.' });
  }

});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const history = await HistoryService.getCities();
    res.status(200).json(history);
  } catch (error) {
    console.error('Error retrieving search history:', error);
    res.status(500).json({ error: 'Failed to retrieve search history.' });
  }

});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await HistoryService.removeCity(id);

    if (result) {
      res.status(200).json({ message: 'City search deleted succesfully.' });
    } else {
      res.status(404).json({ error: 'Failed to delete city from history.' });
    } 
  }
    catch (error) {
      console.error('Error deleting city from history:', error);
      res.status(500).json({ error: 'Failed to delete city from history.'});
    }
  });

export default router;
