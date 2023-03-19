import asyncHandler from "express-async-handler"
import { Request, Response, Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import log from '@mondoshivan-openai/log';

type OpenAIErrorResponse = Error & {
  response: {
    status: string | number,
    data: unknown
  }
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const appRouter = Router();

appRouter.get('/', asyncHandler(async (req: Request, res: Response) => {

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });

    log.debug(completion);

    res.status(200).json(completion.data.choices[0].text);
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
