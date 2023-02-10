const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/config.env" });
const PORT = process.env.PORT;

const start = async () => {
    app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    });
};
  
start();