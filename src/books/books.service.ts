import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import IBook from "../interfaces/book.interface";
import CreateBookDto from "./dto/create-book.dto";
import {v4 as uuid} from 'uuid';
import UpdateBookDto from "./dto/update-book.dto";

@Injectable()
export class BooksService {
	books: IBook[] = []

	findById(id: string) {
		const book = this.books.find(x => x.id === id);
		if (!book) {
			throw new HttpException({message: "Книга не найдена"}, HttpStatus.NOT_FOUND);
		}
		return book;
	}

	findAll() {
		return this.books;
	}

	addBook(bookDto: CreateBookDto) {
		const newUser: IBook = { ...bookDto, id: uuid() };
		this.books.push(newUser);
		return newUser
	}

	deleteBook(id: string) {
		const book = this.books.find(x => x.id === id);
		if(!book) {
			throw new HttpException({message: "Книга не найдена"}, HttpStatus.NOT_FOUND);
		}
		this.books = this.books.filter(x => x !== book);
	}

	updateBook(id: string, dto: UpdateBookDto) {
		const book = this.books.find(x => x.id === id);
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
		return book;
	}
}
