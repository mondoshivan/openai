import express, { Express, Router, Request, Response } from 'express';
import log from '@mondoshivan-openai/log';
 
export class App {

  private app: Express = express();
  private port: number;
  private apiVersion: number;
 
  constructor(apiVersion:number, routers: Router, port:number) {
    this.port = port;
    this.apiVersion = apiVersion;
 
    this.initializeMiddlewares();
    this.initializeRouters(routers);
  }
 
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(express.static(path.join(process.cwd(), config.service.frontEndDir)));

    this.app.use((err:Error, req:Request, res:Response) => {
      log.error(err);
      res.status(500).send('Internal Server Error!');
    });
  }
 
  private initializeRouters(routers: Router) {
    this.app.use(`/api/${this.apiVersion}`, routers);
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      log.info(`App listening on the port ${this.port}`);
    });
  }
}
