const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = parseInt(process.env.PORT) || 8080;
const { MONGOURI } = require("./config/keys");

// mongoose.connect(MONGOURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on("connected", () => {
//   console.log("conneted to mongo yeahh");
// });
// mongoose.connection.on("error", (err) => {
//   console.log("err connecting", err);
// });

// require("./models/user");
// require("./models/post");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/reading-list/healthz", (_, res) => {
  return res.json({ status: "ok" });
});

app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500);
  res.json({ error: err.message });
});

app.use("*", (_, res) => {
  return res
    .status(404)
    .json({ error: "the requested resource does not exist on this server" });
});

// app.use(require("./routes/auth"));
// app.use(require("./routes/post"));
// app.use(require("./routes/user"));

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
// health check

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
