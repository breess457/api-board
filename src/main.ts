import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser'
import {config} from 'dotenv'

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

  app.enableCors({
    origin:process.env.URL_FRONTEND,
    credentials: true
  })


  await app.listen(process.env.PORT ?? 3001,()=>{
    console.log(`Start Server on Port : ${process.env.PORT}`)
    console.log("prosess:",process.env.URL_FRONTEND)
  });
}
bootstrap();
