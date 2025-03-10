let config = require("./config/config");
const routers = require("./routes");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//cors
var whiteList = config.WHITELIST_URLS;
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));

app.use("/api/v1/employees", routers.employee);

const PORT = config.APPLICATION_PORT;
const HOST = config.APPLICATION_HOST;
app.listen(PORT, HOST, () => {
    console.log(`Application server is running on port http://${HOST}:${PORT}`);
});
