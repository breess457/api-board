import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import { NextFunction, Request, Response } from 'express';

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())
  app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))

  app.use(function (req:Request, res:Response, next:NextFunction){
      // res.header('Access-Control-Allow-Origin', process.env.URL_FRONTEND);
      // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE')
      // res.header('Authorization, Origin, Content-Type, Accept')

      res.header('Access-Control-Allow-Origin', `${process.env.URL_FRONTEND}`);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
      next()
  })
  

  app.enableCors({
    origin:process.env.URL_FRONTEND,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:'Content-Type, Authorization',
    credentials: true
  })


  await app.listen(process.env.PORT ?? 3001,()=>{
    console.log(`Start Server on Port : ${process.env.PORT}`)
    console.log("prosess:",process.env.URL_FRONTEND)
  });
}
bootstrap();
