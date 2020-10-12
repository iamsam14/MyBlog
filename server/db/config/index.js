const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  });
} catch (e) {
  console.log(e.toString());
}

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
