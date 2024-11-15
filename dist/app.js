"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const app = (0, express_1.default)();
/////parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
//// user router
const userRouter = express_1.default.Router();
app.use("/api/v1/users", userRouter);
/////
userRouter.get("/createUser", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        massage: "user create Successfully",
        data: user,
    });
});
const logger = (req, res, next) => {
    console.log("all in one", req.url, req.method, req.hostname);
    next();
};
app.get("/", (req, res, next) => {
    try {
        console.log(req.query);
        const cpuInfo = os_1.default.cpus();
        res.status(200).json({ cpuInfo });
    }
    catch (error) {
        next(error);
    }
});
app.post("/post", (req, res) => {
    console.log(req.body);
    res.send("got data");
});
///route error handle
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "route is not found",
    });
});
////global erro
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            massege: "soothing went wrong",
        });
    }
});
exports.default = app;
