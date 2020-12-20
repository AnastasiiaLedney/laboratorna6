import {Router} from "express";
import passport from "passport";
import carControler from "./controllerMogoose";


const carRouter = new Router();
carRouter.get("/", carControler.get);
carRouter.get("/:id", carControler.getById);
carRouter.post("/", passport.authenticate("jwt", {session:false}), carControler.post);
carRouter.delete("/:id",  passport.authenticate("jwt", {session:false}), carControler.delete);
carRouter.patch("/:id",  passport.authenticate("jwt", {session:false}), carControler.patch);

export default carRouter;