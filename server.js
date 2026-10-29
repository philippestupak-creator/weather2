const express = require('express');
const app  = express();

process.loadEnvFile(".env");

app.use(express.static('public'))
app.use(express.json());


app.listen(process.env.PORT);

app.get("/weather/:location", async(req, res) =>
{
const location = req.params.location;
const locEncoded = encodeURIComponent(location);

const url = `https://data.api.xweather.com/conditions/${locEncoded}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

            console.log(url)
            const response = await fetch(url);
            const data = await response.json();

    const newWeather = {
        success: data.success,
        temperature: data.response[0].periods[0].tempF,
        windSpeed: data.response[0].periods[0].windSpeedMPH,
        icon: data.response[0].periods[0].icon,
    }
    res.json(newWeather);

});