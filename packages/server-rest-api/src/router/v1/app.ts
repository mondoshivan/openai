import asyncHandler from "express-async-handler"
import { Request, Response, Router } from "express";

const appRouter = Router();

appRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    res.status(200).json(req.query);
}));

export default appRouter;
