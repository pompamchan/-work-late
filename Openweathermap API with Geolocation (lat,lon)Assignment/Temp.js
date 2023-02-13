const express = require("express");
const https = require("https");

const app = express();

app.listen(3000, () => {
  console.log("server started on port 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/displaytemp", (req, res) => {
  console.log(req.query.lat, req.query.lon);
  https.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=2f72ef1f0ca0491e030f764baa237b75&units=metric&lang=TH`,
    (response) => {
      try {
        response.on("data", (data) => {
          const { weather, name, main } = JSON.parse(data);
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          res.write(`<h1>บรรยากาศตอนนี้ ${weather[0].description}</h1>`);
          res.write(
            `<h1 style = 'display: flex; align-items: center;'>อุณหภูมิใน ${
              name + " " + main.temp
            } Cº
            <img src="http://openweathermap.org/img/wn/${
              weather[0].icon
            }@2x.png"></h1>`
          );
          res.send();
        });
      } catch (error) {
        console.error(response.statusCode, response.statusMessage);
      }
    }
  );
});
