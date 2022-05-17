import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {BooksService} from "./books.service";
import CreateBookDto from "./dto/create-book.dto";
import UpdateBookDto from "./dto/update-book.dto";

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
	create(@Body() dto: CreateBookDto) {
		return this.booksService.addBook(dto);
	}

	@Delete('/:id')
	async deleteBook(@Param('id') id: string) {
		await this.booksService.deleteBook(id);
		return { message: 'OK' }
	}

	@Patch('/:id')
	updateBook(@Param('id') id: string, @Body() dto: UpdateBookDto) {
		return this.booksService.updateBook(id, dto);
	}
}
