console.log("Hello this is me serving some assets to the user");

const messageOne = document.querySelector(".message-1")
const messageTwo = document.querySelector(".message-2")
const statusImg = document.querySelector(".status-img");
const someInfo = document.querySelector(".some-info");

const getWeather = (address = "boston", callback) => {
    fetch(`/weather?address=${encodeURIComponent(address)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                callback("Please provide valid address!", undefined);
            } else {
                callback(undefined, data);
            }
        })
    });
}

const form = document.querySelector('.form');

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    /* reset all values */
    const value = evt.target.children[0].value;
    messageOne.innerHTML = "Loading...";
    messageTwo.innerHTML = "";
    statusImg.src = './img/loading.gif';
    someInfo.innerHTML = "";

    getWeather(value, (error, data) => {
        if (error) {
            messageOne.innerHTML = messageTwo.innerHTML = "";
            messageOne.innerHTML = error;
            statusImg.src = "https://img.icons8.com/color/48/000000/cancel.png";
        } else {
            messageOne.innerHTML = "location: " + data.location.name + " " + data.location.region + " " + data.location.country;
            messageTwo.innerHTML = "temperature: " + data.current.temperature + "°C ";
            statusImg.src = data.current.weather_icons[0];
            someInfo.innerHTML = "weather: " + data.current.weather_descriptions[0] + "<br><br>wind: " + data.current.wind_speed + "km/h " + data.current.wind_dir + "<br><br>humidity: " + data.current.humidity + "%" + "<br><br>visibility: " + data.current.visibility + "km"; + "<br><br>pressure: " + data.current.pressure + "hPa" + "<br><br>precip: " + data.current.precip + "mm" + "<br><br>cloudcover: " + data.current.cloudcover + "%" + "<br><br>feelslike: " + data.current.feelslike + "°C" + "<br><br>uvindex: " + data.current.uv_index + "<br>";
        }
    })
})