// server.js
// where your node app starts

// init project
var express = require("express")
var app = express()
require("dotenv").config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// listen for requests :)
// eslint-disable-next-line no-undef
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port)
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  // eslint-disable-next-line no-undef
  res.sendFile(__dirname + "/views/index.html")
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" })
})

app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
})

app.get("/api", (req, res) => {
  const time = new Date()
  res.json({ unix: time.getTime(), utc: time.toUTCString() })
})

app.get("/api/:date", (req, res) => {
  const dateInt = Date.parse(req.params.date)

  if (isNaN(dateInt)) {
    Date(dateInt)
    res.json({ error: "Invalid Date" })
  } else {
    const dateObject = new Date(dateInt)
    res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() })
  }
})