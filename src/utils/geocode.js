const request = require("request");

const geocode = (address, callback) => {
    const geocode_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1IjoianJlZDk3NDczIiwiYSI6ImNrNWJpYmJzZzA3bHUzbXBnM2dqc292c3QifQ.7qfMsnMmsNxWnRf2s0Yz3w";

    request({url: geocode_url, json: true}, (error, {body}) => {
        if(error)
        {
            callback("Cannot obtain geocoding data!", undefined);
        }
        else if(body.features.length === 0)
        {
            callback("Unable to find location. Try another search.", undefined);
        }
        else
        {
            const geocode_info = {
                "place": body.features[0].place_name,
                "latitude": body.features[0].center[1],
                "longitude": body.features[0].center[0]
            };

            callback(undefined, geocode_info);
        }
    });
};

module.exports = geocode;