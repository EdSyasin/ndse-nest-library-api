import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateBookDto from "./dto/create-book.dto";
import UpdateBookDto from "./dto/update-book.dto";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "./books.schema";
import { Connection, Model } from "mongoose";

@Injectable()
export class BooksService {

	constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>,
				@InjectConnection() private connection: Connection ) {}

	async findById(id: string) {
		const book = await this.BookModel.findById(id).exec();
		console.log(book)
		if (!book) {
			throw new HttpException({message: "Книга не найдена"}, HttpStatus.NOT_FOUND);
		}
		return book;
	}

	findAll() {
		return this.BookModel.find();
	}

	addBook(bookDto: CreateBookDto) {
		const book = new this.BookModel(bookDto);
		return book.save()
	}

	async deleteBook(id: string) {
		const book = await this.BookModel.findById(id).exec();
		if(!book) {
			throw new HttpException({message: "Книга не найдена"}, HttpStatus.NOT_FOUND);
		}
		book.delete()
	}

	async updateBook(id: string, dto: UpdateBookDto) {
		const book = await this.BookModel.findById(id).exec();
		if(!book) {
			throw new HttpException({message: "Книга не найдена"}, HttpStatus.NOT_FOUND);
		}
		if(dto.title) {
			book.title = dto.title;
		}
		if(dto.description) {
			book.description = dto.description;
		}
		if(dto.author) {
			book.author = dto.author;
		}
		return book.save();
	}
}
