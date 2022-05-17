const request = require("request");
/* function for getting geocode */

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlkaGFuc2h1IiwiYSI6ImNsMmo2MHA5ajAwaTczanFwbTF5aWxmaGEifQ.5FjxWz_zpG1iLNaYlrjcfw&limit=1`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback("Unable to connect to the geocode services", undefined);
        } else if (res.body.features.length === 0) {
            callback("Unable to find the location", undefined);
        } else {
            console.log();
            const [atitude, longitude ] = res.body.features[0].center;
            const location = res.body.features[0].place_name;
            callback(undefined, {
                longitude,
                latitude,
                location
            });
        }
    })
}

module.exports = geocode;