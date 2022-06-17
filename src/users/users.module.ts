import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./users.schema";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
      })
  ],
  providers: [UsersService],
  controllers: [UsersController],

})
export class UsersModule {}
