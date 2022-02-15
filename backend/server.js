const app = require("./app");
const connectDB = require("./db/connect");
const cloudinary = require("cloudinary");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down the Server due to Uncaught Exception");
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const start = async () => {
  try {
    const data = await connectDB(process.env.DB_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Mongodb connect with Server: ${data.connection.host}`);
      console.log(
        `Server is Listening on https://localhost:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
start();

// console.log(youtube);
// unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down the Server due to Unhandle Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
