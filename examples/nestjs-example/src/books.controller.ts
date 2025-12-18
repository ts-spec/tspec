import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { Book, CreateBookDto, UpdateBookDto, BookListQuery } from './dto/book.dto';

/**
 * Books API Controller
 * @tag Books
 */
@Controller('books')
export class BooksController {
  /**
   * Get all books with pagination
   * @summary List all books
   * @tag Books
   */
  @Get()
  findAll(@Query() query: BookListQuery): Promise<Book[]> {
    return Promise.resolve([]);
  }

  /**
   * Get a single book by ID
   * @summary Get book by ID
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return Promise.resolve({} as Book);
  }

  /**
   * Create a new book
   * @summary Create book
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return Promise.resolve({} as Book);
  }

  /**
   * Update an existing book
   * @summary Update book
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return Promise.resolve({} as Book);
  }

  /**
   * Delete a book
   * @summary Delete book
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return Promise.resolve();
  }
}
