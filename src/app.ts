import { error } from "console";
import express, { NextFunction, Request, Response } from "express";
import os from "os";
const app = express();

/////parsers

app.use(express.json());
app.use(express.text());

//// user router

const userRouter = express.Router();
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

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("all in one", req.url, req.method, req.hostname);
  next();
};

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.query);
    const cpuInfo = os.cpus();
    res.status(200).json({ cpuInfo });
  } catch (error) {
    next(error);
  }
});

app.post("/post", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("got data");
});

///route error handle

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "route is not found",
  });
});

////global erro

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      massege: "soothing went wrong",
    });
  }
});

export default app;
