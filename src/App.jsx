import React, { useEffect, useState } from 'react';
import Highlights from './components/Highlights';
import Temperature from './components/Temperature';
import BarChart from './components/BarChart';
import Notepad from './components/Notepad';

function App() {
  const [city, setCity] = useState('Pune');
  const [weatherData, setWeatherData] = useState(null);
  const [avgTempWeek, setAvgTempWeek] = useState(null);
  const [avgHumidityWeek, setAvgHumidityWeek] = useState(null);
  const [avgRainfallWeek, setAvgRainfallWeek] = useState(null);

  useEffect(() => {
    const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=c4dc37f31e6649538ad184247242805&q=${city}&days=7&aqi=no&alerts=no`;

    fetch(apiURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Weather Data not found');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);

        const forecastDays = data.forecast.forecastday;
        const totalAvgTemp = forecastDays.reduce((sum, day) => sum + day.day.avgtemp_c, 0);
        const avgTemp = totalAvgTemp / forecastDays.length;

        setAvgTempWeek(avgTemp.toFixed(1));

        const totalAvgHumidity = forecastDays.reduce((sum, day) => sum + day.day.avghumidity, 0);
        const avgHumidity = totalAvgHumidity / forecastDays.length;
        setAvgHumidityWeek(avgHumidity.toFixed(1));

        const totalAvgRainfall = forecastDays.reduce((sum, day) => sum + day.day.totalprecip_mm, 0);
        const avgRainfall = totalAvgRainfall / forecastDays.length;
        setAvgRainfallWeek(avgRainfall.toFixed(1));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  return (
    <div className='bg-slate-800 min-h-screen flex flex-col items-center'>
      {/* Notepad on top */}
      <div className="w-full flex justify-center mt-10">
        <Notepad />
      </div>
      
      {/* Temperature and Highlights block */}
      <div className="w-7/12 flex justify-center items-start mt-40 bg-slate-700 p-9 rounded-md ">
        <div className="w-1/3">
          {weatherData && (
            <Temperature
              setCity={setCity}
              stats={{
                temp: weatherData.current.temp_c,
                condition: weatherData.current.condition.text,
                isDay: weatherData.current.is_day,
                location: weatherData.location.name,
                time: weatherData.location.localtime,
              }}
            />
          )}
        </div>
        <div className="w-2/3 p-10 grid grid-cols-2 gap-6">
          <h1 className="text-white text-2xl col-span-2">
            Today's Highlights
          </h1>
          {weatherData && (
            <>
              <Highlights
                stats={{
                  title: "Wind Status",
                  value: weatherData.current.wind_mph,
                  unit: "mph",
                  direction: weatherData.current.wind_dir,
                }}
              />
              {avgHumidityWeek && (
                <Highlights
                  stats={{
                    title: "Average Humidity this Week",
                    value: avgHumidityWeek,
                    unit: "%",
                  }}
                />
              )}
              {avgTempWeek && (
                <Highlights
                  stats={{
                    title: "Average Temp This Week",
                    value: avgTempWeek,
                    unit: "°C",
                  }}
                />
              )}
              {avgRainfallWeek && (
                <Highlights
                  stats={{
                    title: "Average Rainfall This Week",
                    value: avgRainfallWeek,
                    unit: "mm",
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Bar Chart at the bottom */}
      <div className="w-full flex justify-center mt-10 p-10">
        {weatherData && (
          <div className="w-3/4">
            <BarChart forecastDays={weatherData.forecast.forecastday} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
