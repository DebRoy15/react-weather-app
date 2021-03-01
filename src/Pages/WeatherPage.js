import React, { useState } from "react";
import "./weatherPage.css";

const WeatherPage = () => {
  const [weather, setWeather] = useState();
  const [cityInfo, setCityInfo] = useState();
  const [location, setLocation] = useState();
  const [dayTrack, setDayTrack] = useState("today");
  const apiKey = "S7jum6aTR8x4K8WnDjz6g0Fixpj5QcyN";

  const weatherURI =
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const cityURI =
    "http://dataservice.accuweather.com/locations/v1/cities/search";

  const getCity = async (city) => {
    const query = `?apikey=${apiKey}&q=${city}`;

    const response = await fetch(cityURI + query);
    const data = await response.json();
    console.log(data[0]);
    setCityInfo(data[0]);

    return data[0];
  };
  const getWeather = async (id) => {
    const query = `${id}?apikey=${apiKey}`;

    const response = await fetch(weatherURI + query);
    const data = await response.json();

    return data.DailyForecasts.splice(0, 2);
  };

  const searchLocation = async () => {
    const cityDets = await getCity(location);
    const response = await getWeather(cityDets.Key);
    setWeather(response);
    console.log(response);
  };
  return (
    <div>
      <header className="weather-header">
        <h1>Weather App</h1>
        <div className="search-section">
          <input
            type="search"
            placeholder="Enter your city name"
            id="search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={searchLocation}>Search</button>
        </div>
      </header>
      {(weather !== undefined) & (weather !== null) ? (
        <section className="cards">
          {dayTrack === "today" ? (
            <div className="card">
              <h1>
                {cityInfo?.EnglishName ?? ""},{" "}
                {cityInfo.Country?.EnglishName ?? ""}
              </h1>
              <img
                src={`/icons/${weather[0]?.Day?.Icon ?? ""}.svg`}
                alt="weather icon"
              />
              <p>{weather[0]?.Day?.IconPhrase ?? ""}</p>
              <p className="other-info">
                <span>Maximum Temp</span>
                <span>
                  {weather[0]?.Temperature?.Maximum?.Value ?? ""}
                  {weather[0].Temperature.Minimum.Unit === "F" ? (
                    <span>&#x2109;</span>
                  ) : (
                    <span>&#x2103;</span>
                  )}
                </span>
              </p>
              <p className="other-info">
                <span>Minimum Temp</span>
                <span>
                  {weather[0]?.Temperature?.Minimum?.Value ?? ""}
                  {weather[0].Temperature.Minimum.Unit === "F" ? (
                    <span>&#x2109;</span>
                  ) : (
                    <span>&#x2103;</span>
                  )}
                </span>
              </p>
            </div>
          ) : (
            <div className="card">
              <h1>
                {cityInfo?.EnglishName ?? ""},{" "}
                {cityInfo.Country?.EnglishName ?? ""}
              </h1>
              <img
                src={`/icons/${weather[1]?.Day?.Icon ?? ""}.svg`}
                alt="weather icon"
              />
              <p>{weather[1].Day.IconPhrase}</p>
              <p className="other-info">
                <span>Maximum Temp</span>
                <span>
                  {weather[1].Temperature.Maximum.Value}
                  {weather[1].Temperature.Minimum.Unit === "F" ? (
                    <span>&#x2109;</span>
                  ) : (
                    <span>&#x2103;</span>
                  )}
                </span>
              </p>
              <p className="other-info">
                <span>Minimum Temp</span>
                <span>
                  {weather[1].Temperature.Minimum.Value}
                  {weather[1].Temperature.Minimum.Unit === "F" ? (
                    <span>&#x2109;</span>
                  ) : (
                    <span>&#x2103;</span>
                  )}
                </span>
              </p>
            </div>
          )}

          <div className="dates">
            <h4
              className={`${
                dayTrack === "today" ? "date-text-decoration" : null
              } dates`}
              onClick={() => {
                setDayTrack("today");
              }}
            >
              Today, 19Sep
            </h4>
            <h4
              className={`${
                dayTrack === "tomorrow" ? "date-text-decoration" : null
              } dates`}
              onClick={() => {
                setDayTrack("tomorrow");
              }}
            >
              Tomorrow, 20Sep
            </h4>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default WeatherPage;
