import React, { useState } from "react";

function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [containerDisplay, setContainerDisplay] = useState({ display: "none" });

  async function getData(req) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${req}&appid=cd21d650483e4c87311373a00b24b02f`
      );
      const data = await response.json();
      if(!response.ok){
        window.alert("Please enter a valid location.")
        return;
      }
      else {
        setData(data);
        setContainerDisplay({ display: "flex" }); }

        if(data.sys?.country === "IN"){
          document.getElementById("loc").classList.remove("fa-location-dot");
          document.getElementById("loc").classList.add("fa-house");
            } else if(data.sys?.country !== "IN"){
              document.getElementById("loc").classList.remove("fa-house");
              document.getElementById("loc").classList.add("fa-location-dot");
            }
    } catch (error) {
     console.log(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    getData(location);
  }

  function handleCityChange(event) {
    setLocation(event.target.value);
    if (event.target.value.length === 0) {
      setContainerDisplay({ display: "none" });
    }
  }
  return (
    <div className="weatherapp">
      <form className="inputs" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Enter a location"
          className="enter-bar"
          value={location}
          onChange={handleCityChange}
        />
        <button className="check-btn" type="submit">
          Check the Weather!
        </button>
      </form>
      <div className="container" style={containerDisplay}>
        <p className="location">
          <i className="fa-solid fa-location-dot" id="loc"></i> 
          {data.name}, {data.sys?.country.toUpperCase()}
        </p>
        <p className="temp">
          <i className="fa-solid fa-temperature-three-quarters"></i>
          Temperature: {(data.main?.temp - 273.15).toFixed(2)}°C
        </p>
        <p className="humidity">
          <i className="fa-solid fa-glass-water-droplet"></i> 
          Humidity: {data.main?.humidity}%
        </p>
        <p className="windspeed">
          <i className="fa-solid fa-wind"></i> 
          Wind speed: {data.wind?.speed} m/s
        </p>
      </div>
    </div>
  );
}

export default WeatherApp;
