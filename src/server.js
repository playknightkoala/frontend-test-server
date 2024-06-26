const express = require("express");
const memberRoutes = require("./routes/memberRoutes");
const loginRoutes = require("./routes/loginRoutes");
const chartRoutes = require("./routes/chartRoutes");
const filter = require("./filter/filter");
const { createCors } = require("./units/cors");
const app = express();

app.use(createCors());
app.use(filter);
app.use(express.json());
memberRoutes(app);
loginRoutes(app);
chartRoutes(app);

app.listen(6666, () => {
  console.log("Listening on port 6666!");
});
