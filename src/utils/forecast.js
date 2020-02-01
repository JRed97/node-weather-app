const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const forecast_url = "https://api.darksky.net/forecast/7a166b2b21598e0e832d8ad4054c61ab/" + latitude + "," + longitude;

    request({url: forecast_url, json: true}, (error, {body}) => {
        if(error)
        {
            callback("Cannot connect to weather service!", undefined);
        }
        else if(body.error)
        {
            callback("Error detected! " + body.error, undefined);
        }
        else
        {
            const forecast_info = {
                "summary": body.daily.data[0].summary,
                "current_temp": body.currently.temperature,
                "current_precip": body.currently.precipProbability,
                "temp_high": body.daily.data[0].temperatureMax,
                "temp_low": body.daily.data[0].temperatureMin,
            };

            callback(undefined, forecast_info);
        }
    });
};

module.exports = forecast;