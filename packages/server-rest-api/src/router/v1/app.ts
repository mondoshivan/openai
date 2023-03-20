import asyncHandler from "express-async-handler"
import { Request, Response, Router } from "express";
import log from '@mondoshivan-openai/log';
import { OpenAIController } from "../../controller/openai-controller.js";

const appRouter = Router();

appRouter.post('/', asyncHandler(async (req: Request, res: Response) => {

  if (!req.body.prompt) {
    res.status(400).json({ error: 'no prompt given'});
    return;
  }

  const openAI = new OpenAIController();
  const context = '';
  const text = openAI.query(req.body.prompt, context);

  res.status(200).json(text);
}));

export default appRouter;
