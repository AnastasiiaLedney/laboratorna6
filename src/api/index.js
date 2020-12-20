import {Router} from "express";
import carRouter from "./car";

const apiRouter = new Router();

apiRouter.use("/car", carRouter);

export default apiRouter;
