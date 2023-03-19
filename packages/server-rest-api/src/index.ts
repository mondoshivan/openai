import "reflect-metadata";
import log from '@mondoshivan-openai/log';
import { App } from "./app.js";
import routers from "./router/v1/index.js";

export const get = () => {
  const apiVersion = 1;
  const port = 8082;
  return new App(apiVersion, routers, port);
};

const start = async () => {
  try {
      const app = get();
      app.listen();
  } catch (error) {
      log.error(error);
  }
};

start();