const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const { connect } = require("mongoose");

// initialize app with express;
const app = express();
// initialize public directory
const pubDir = path.join(__dirname, "../../storage");

// define application's config;
const { PORT, DB } = require("../../configs/env.config");

// app middlewares requirements;
app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve the static files;
app.use(express.static(pubDir));

// app endpoints;
app.use("/api/v1/blogs", require("./routes/blog.route"));
app.use("/api/v1/categories", require("./routes/category.route"));
app.use("/api/v1/users", require("./routes/user.route"));
app.use("/api/v1/images", require("./routes/image.route"));

// define application start function;
const startApp = async () => {
  try {
    const dbConnect = connect(DB, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (dbConnect) {
      console.log(`Database connection succeed...`);
      console.log(`...Database path: ${DB}\n`);
    }

    await app.listen(PORT);

    console.log(`Server starter succeed...`);
    console.log(`...Listening on port: ${PORT}\n...Serving statics in: ${pubDir}\n`);
  } catch (ex) {
    console.error(ex);
  }
};

// Start application;
startApp();
