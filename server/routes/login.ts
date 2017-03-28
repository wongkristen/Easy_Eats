import { Router, Request, Response, NextFunction } from "express";

const loginRouter: Router = Router();


loginRouter.get("/", function (request: Request, response: Response, next: NextFunction) {
    console.log("made it here");
    response.render("server");
});


export { loginRouter }
