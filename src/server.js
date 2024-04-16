const express = require("express");
const memberRoutes = require("./routes/memberRoutes");
const loginRoutes = require("./routes/loginRoutes");
const chartRoutes = require("./routes/chartRoutes");
const filter = require("./filter/filter");
const app = express();

app.use(filter);
app.use(express.json());
memberRoutes(app);
loginRoutes(app);
chartRoutes(app);

app.listen(9091, () => {
  console.log("Listening on port 9091!");
});
