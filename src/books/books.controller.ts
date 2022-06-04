import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { BooksService } from "./books.service";
import CreateBookDto from "./dto/create-book.dto";
import UpdateBookDto from "./dto/update-book.dto";
import { ValidationPipe } from '../pipes'

@Controller('api/books')
export class BooksController {

	constructor(private booksService: BooksService) {}

	@Get('/:id')
	findById(@Param('id') id: string) {
		return this.booksService.findById(id);
	}

	@Get()
	findAll() {
		return this.booksService.findAll();
	}

	@Post()
	@UsePipes(new ValidationPipe())
	create(@Body() dto: CreateBookDto) {
		return this.booksService.addBook(dto);
	}

	@Delete('/:id')
	async deleteBook(@Param('id') id: string) {
		await this.booksService.deleteBook(id);
		return { message: 'OK' }
	}

	@Patch('/:id')
	@UsePipes(new ValidationPipe())
	updateBook(@Param('id') id: string, @Body() dto: UpdateBookDto) {
		return this.booksService.updateBook(id, dto);
	}
}
