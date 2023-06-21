
import express from "express";
import cors from "cors";
import path from "path";
import { databaseLoader } from "./Engine/Loaders/databaseLoader";
import userRouter from "./Modules/User/userRoutes";
import commRouter from "./Modules/Community/communityRoutes";
import roleRouter from "./Modules/Role/roleRoutes";
import memberRouter from "./Modules/Member/memberRoutes";
const bodyparser = require("body-parser");
import { Snowflake } from "@theinternetfolks/snowflake";


const app = express();


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());
databaseLoader();

app.use('/user/auth',userRouter)
app.use('/community/',commRouter)
app.use('/role/',roleRouter)
app.use('/member/',memberRouter)

// Express router
// console.log(Snowflake.generate());


const router = express.Router();

console.log('c')

app.listen(process.env.API_SERVICE_PORT || 3000, () => {
    console.log(`Server started on port || 3000}`);
});
