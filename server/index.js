
import dotenv from "dotenv";
import app from "./app.js";
import ApiResponse from "./handlers/response.handler.js";
dotenv.config();
import connectDB from './config/db.js'
const PORT = process.env.PORT || 8000;

app.get('/',async(req,res)=>{
    return ApiResponse.success(
        res,
        200,
        "Hello World"
    )
})


connectDB()
  .then(() => {
    app.on('error',(error)=>{
        console.log(`Error: ${error}`);
    })
    app.listen(PORT, () => {
        console.log(process.env.NODE_ENV);
        console.log(`app is listening on port ${PORT}`);
      });
  })
  .catch((error) => {
    console.log(`Connection Failed: ${error.message}`);
  });