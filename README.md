# Weather-app

## About the App
When the Web-App is loaded the home page will show today's forecast for 3 Cities: Auckland, Vladivostor and Melbourne. To get forecasts for any other cities the search bar is provided with available option of cities in New Zealand, Russia and Australia. The city forecast will return today's forecast as well as forecast for the next 2 days including astronomy information. 

By clicking on the `question mark` or `moon phase image` or `arrow down` it will show additional information if a user is interested to know about the levels of UV and what protection needed, or what the moon phase means or just additional information for the next couple of days.

## How to install
1. Run `npm install` in the project directiory. 
2. Run `npm run start` . Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.
3. In order to return any result back, you will need an API key that you could place in `.env` file. The API used is [WeatherAPI.com](https://rapidapi.com/weatherapi/api/weatherapi-com). Then you will need to store the **API key** and the **Host** values such as:
- REACT_APP_WEATHER_API_KEY
- REACT_APP_WEATHER_HOST

