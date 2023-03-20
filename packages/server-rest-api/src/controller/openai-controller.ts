import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import config from "../config/config.js";

export class OpenAIController {

  private CONTEXT_INSTRUCTION = 'Based on this context:';
  private INSTRUCTION = `Answer the question below as truthfully as you can, if you don't know the answer, say you don't know in a sarcastic way otherwise, just answer.`;
  private openai: OpenAIApi;
  
  constructor() {
    const configuration = new Configuration({
      apiKey: config.openAIKey
    });
    this.openai = new OpenAIApi(configuration);
  }

  async query(prompt: string, context: string): Promise<string | undefined> {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${this.CONTEXT_INSTRUCTION}\n\n\nContext: "${context}" \n\n\n${this.INSTRUCTION} \n\n\n ${prompt}`,
      max_tokens: 250,
      temperature: 0.2,
    });

    return completion?.data.choices?.[0]?.text;
  }
}