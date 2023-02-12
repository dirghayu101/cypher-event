const app = require("./app");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connect");
dotenv.config({ path: __dirname + "/config.env" });
const PORT = process.env.PORT;

const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI)
    console.log('Database connected successfully!')
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
      });
  }catch(error){
    console.log(error)
  }
};
  
start();