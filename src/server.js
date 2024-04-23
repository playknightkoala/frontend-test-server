const express = require("express");
const memberRoutes = require("./routes/memberRoutes");
const loginRoutes = require("./routes/loginRoutes");
const chartRoutes = require("./routes/chartRoutes");
const filter = require("./filter/filter");
const cors = require("cors");
const app = express();

const whitelist = JSON.parse(process.env.ALLOW_HREF_LIST);
const corsOptions = {
  origin: (origin, callback) => {
    if (origin && (whitelist.indexOf(origin) !== -1 || origin.indexOf("localhost") >= 0 || origin.indexOf("127.0.0.1") >= 0)) {
      callback(null, true);
    } else {
      // eslint-disable-next-line n/no-callback-literal
      callback("Not allowed by CORS");
    }
  },
};

app.use(filter);
app.use(express.json());
app.use(cors(corsOptions));
memberRoutes(app);
loginRoutes(app);
chartRoutes(app);

app.listen(9091, () => {
  console.log("Listening on port 9091!");
});
