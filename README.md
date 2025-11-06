# Weather App

This is a simple weather application built with React. It allows users to search for weather data by city and displays temperature, humidity, and wind speed along with weather icons.

## Features

- Search for weather by city name.
- Displays temperature in Celsius.
- Shows weather icons based on weather conditions.
- Displays additional data such as humidity and wind speed.

## Technologies Used

- React.js
- Open-Meteo API
- CSS for styling

## Setup Instructions

Follow these steps to run the project on your local machine.

### 1. Clone the Repository:

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/React_Weather_App.git
cd React_Weather_App
```
### Install dependencies:

```bash
npm install
```

### Run Command
```bash
npm run dev
```
### Test the app:
- Enter the city name in the search bar.
- Click on the search icon and click on the search icon to see the weather details.
- This app displays the temperature,humidity,wind speed, and updates the background based on the weather condition.

### To deploy the app on gh-pages follow the below process:
- Open vite.config.js and and add `base: "/name-of-your-repo"`.
- Open package.json and below the "name" add `"homepage":"https://username.github.io/name-of-your-repo/"` and also under the scripts add `"predeploy": "npm run build", "deploy": "gh-pages -d dist"`.
- Install gh-pages with the command `npm install gh-pages`.
- Now it is ready to be deployed. You can write the command `npm run deploy` and paste this link on the browser you will see your app running `https://username.github.io/name-of-your-repo/`.