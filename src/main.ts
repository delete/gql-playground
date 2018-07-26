import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());

  mongoose.connect('mongodb://172.18.0.2:27017/playground', { useNewUrlParser: true });

  await app.listen(5000);
}
bootstrap();
