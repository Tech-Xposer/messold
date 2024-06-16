
import dotenv from "dotenv";
import app from "./app.js";
import ApiResponse from "./handlers/response.handler.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

app.get('/',async(req,res)=>{
    return ApiResponse.success(
        res,
        200,
        "Hello World"
    )
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
