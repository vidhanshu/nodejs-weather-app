const request = require("request");

/* function to get weather */
const forecast =  (location, callback) => {

    const url = `http://api.weatherstack.com/forecast?access_key=80d23032f198d89adced726d8a83f33d&query=${encodeURIComponent(location)}&limit=1`;

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback("unable to connect to the weather services", undefined);
        }
        else {
            callback(undefined, res.body);
        }
    })

}

module.exports = forecast;