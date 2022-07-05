const express = require("express");
const routerKue = require("./routers/kue");
const cors = require("cors");
const app = express();
const port = 5000;

//MENERIMA REQ.BODY
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  cors({
    origin: "*",
  })
);

app.use(routerKue);
app.listen(port, () => {
  console.log("server berjalan pada port" + port);
});
