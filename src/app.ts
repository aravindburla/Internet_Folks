// Loading env variables while starting the app

// Dependencies
import express from "express";
import cors from "cors";
import path from "path";
import { databaseLoader } from "./Engine/Loaders/databaseLoader";
import userRouter from "./Modules/User/userRoutes";
import commRouter from "./Modules/Community/communityRoutes";
import roleRouter from "./Modules/Role/roleRoutes";
import memberRouter from "./Modules/Member/memberRoutes";
const bodyparser = require("body-parser");

// Loaders
// import { databaseLoader } from "@redlof/engine/Loaders/database";
// import { cronLoader } from "@redlof/engine/Loaders/cron";

// Middlewares
// import { authenticateUser } from "@redlof/engine/Middlewares/AuthenticationMiddleware";
import { Snowflake } from "@theinternetfolks/snowflake";

// import routes
// import publicRoutes from "./Public/index";
// import moduleRoutes from "./Modules/index";

// Initializing Express App

const app = express();

// Parse the request body

// app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());

// Static path
// app.use(express.static(path.join(`${process.env.APP_ASSET_PATH}`)));

// Sequelize Initialization
app.use('/user/auth',userRouter)
app.use('/community/',commRouter)
app.use('/role/',roleRouter)
app.use('/member/',memberRouter)
databaseLoader();

// Express router
// console.log(Snowflake.generate());


const router = express.Router();

// Routes

// router.use("/public", publicRoutes);

// router.use("/", authenticateUser, moduleRoutes);

// Use imported routes

// app.use("/api", router);

app.get("/", (req, res) => {
    res.status(200).json({ msg: "CampMonk's Homepage" });
});
console.log('c')
// Listen to a port

app.listen(process.env.API_SERVICE_PORT || 3000, () => {
    console.log(`Server started on port || 3000}`);
});
