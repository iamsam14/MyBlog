if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = require("./server/app");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Express server is up on port ${PORT}`);
});
