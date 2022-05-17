import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import {MongooseModule} from "@nestjs/mongoose";
import config from './config'

const mongoUrl = `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}:${config.mongoPort}/${config.mongoDb}`;
console.log(mongoUrl)

@Module({
  imports: [
      BooksModule,
      MongooseModule.forRoot(`mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}:${config.mongoPort}/${config.mongoDb}`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
