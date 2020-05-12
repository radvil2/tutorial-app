const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/upload", require("./multer"));

const startApp = async () => {
  try {
    app.listen(port, () => {
      console.log(`App started on port ${port}...`);
    });
  } catch (err) {
    console.log(`Unable to start app with Error \n ${err}`);
  }
};

startApp();
