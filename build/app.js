"use strict";
// Loading env variables while starting the app
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const databaseLoader_1 = require("./Engine/Loaders/databaseLoader");
const userRoutes_1 = __importDefault(require("./Modules/User/userRoutes"));
const communityRoutes_1 = __importDefault(require("./Modules/Community/communityRoutes"));
const roleRoutes_1 = __importDefault(require("./Modules/Role/roleRoutes"));
const bodyparser = require("body-parser");
// import routes
// import publicRoutes from "./Public/index";
// import moduleRoutes from "./Modules/index";
// Initializing Express App
const app = (0, express_1.default)();
// Parse the request body
// app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)());
// Static path
// app.use(express.static(path.join(`${process.env.APP_ASSET_PATH}`)));
// Sequelize Initialization
app.use('/user/auth', userRoutes_1.default);
app.use('/community/', communityRoutes_1.default);
app.use('/role/', roleRoutes_1.default);
(0, databaseLoader_1.databaseLoader)();
// Express router
// console.log(Snowflake.generate());
const router = express_1.default.Router();
// Routes
// router.use("/public", publicRoutes);
// router.use("/", authenticateUser, moduleRoutes);
// Use imported routes
// app.use("/api", router);
app.get("/", (req, res) => {
    res.status(200).json({ msg: "CampMonk's Homepage" });
});
console.log('c');
// Listen to a port
app.listen(process.env.API_SERVICE_PORT || 3000, () => {
    console.log(`Server started on port || 3000}`);
});
