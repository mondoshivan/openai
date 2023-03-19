import asyncHandler from "express-async-handler"
import { Request, Response, Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import log from '@mondoshivan-openai/log';
import config from "../../config/config.js";

type OpenAIErrorResponse = Error & {
  response: {
    status: unknown,
    data: unknown
  }
}

const configuration = new Configuration({
  apiKey: config.openAIKey,
});

const openai = new OpenAIApi(configuration);

const appRouter = Router();

appRouter.post('/', asyncHandler(async (req: Request, res: Response) => {

  if (!req.body.prompt) {
    res.status(400).json({ error: 'no prompt given'});
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
    });

    log.debug(completion);

    if (completion.status === 200) {
      res.status(200).json(completion.data.choices[0].text);
    } else {
      res.status(400).json({ statusText: completion.statusText});
    }

  } catch (error) {

    const errorResponse = error as OpenAIErrorResponse;

    if (errorResponse.response) {
      log.error(errorResponse.response.status);
      log.error(errorResponse.response.data);
    } else {
      log.error(errorResponse.message);
    }
  }

}));

export default appRouter;
