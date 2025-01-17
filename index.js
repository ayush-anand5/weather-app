// Get the current time
setInterval(() => {
    const currentTime = new Date().toLocaleTimeString(); 
    document.querySelector(".time").innerHTML = (` ${currentTime}`);
}, 1000);




const inputBox = document.querySelector(".inputText");
const searchBtn = document.getElementById("searchBtn");

const weather_Img = document.querySelector(".weather_img");

const temperature = document.querySelector(".currentTemp");
const description = document.querySelector(".description");
const minMax = document.querySelector(".minMax");
const city = document.querySelector(".locationText");

const uv = document.getElementById("uv");
const feelslike = document.getElementById("feelslike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");
const sunPosition = document.querySelector(".sunPosition");
// const sunset = document.querySelector(".sunset");


async function checkWhether(cityName) {
    const apiKey = "b36c7bdb81bb89f46c37847283718256";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    const weatherData = await fetch(`${url}`).then(response => response.json());
    // console.log(weatherData);
    if (weatherData.cod != "" && weatherData.cod != 200) {
        alert(weatherData.message);
        return;
    }

    const allMainValues = weatherData.weather.map(item => item.main);

    console.log(allMainValues);

    // temperature.innerHTML = `${weatherData.main.temp}°C`;
    temperature.innerHTML = tempconvert(weatherData.main.temp);

    description.innerHTML = `${weatherData.weather[0].description}`;
    minMax.innerHTML = tempconvert(weatherData.main.temp_min) + " / " + tempconvert(weatherData.main.temp_max);

    city.innerHTML = `${weatherData.name} ${weatherData.sys.country}`;
    uv.innerHTML = `${weatherData.wind.speed}`;
    feelslike.innerHTML = tempconvert(weatherData.main.temp_min);
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${weatherData.wind.speed} m/s`;
    visibility.innerHTML = `${weatherData.visibility / 1000}km`;
    pressure.innerHTML = `${weatherData.main.pressure} hpa`;

    const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
    sunPosition.innerHTML = ` ${sunriseTime} / ${sunsetTime} `;
    // sunset.innerHTML = `${sunsetTime}`;

    // description.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;` +weatherData.weather[0].description;

    weather_Img.src=`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`


}

function tempconvert(temp) {
    let cvt;
    if (converter.value == "°C") {
        cvt = Math.round(temp) + "<span>" + "\xB0C</span>";
    } else {
        let cfar = Math.round((temp * 9) / 5 + 32);
        cvt = cfar + "<span>" + "\xB0f</span>";
    }
    return cvt;
}

searchBtn.addEventListener("click", () => {
    checkWhether(inputBox.value);
});
