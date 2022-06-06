import {BadRequestException, Injectable} from '@nestjs/common';
import {UserDto} from "./dto/user.dto";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./users.schema";
import {Connection, Model} from "mongoose";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
				@InjectConnection() private connection: Connection ) {}

	async registration(user: UserDto) {
		const existedUser = await this.getUserByUsername(user.username)
		if (existedUser) {
			throw new BadRequestException({message: 'Пользователь существует'})
		}

		const hashedPassword = await bcrypt.hash(user.password, 5);
		const newUser = new this.UserModel({...user, password: hashedPassword})
		await newUser.save();
		return newUser
	}

	async getUserByUsername(username: string) {
		return this.UserModel.findOne({username});
	}

}
