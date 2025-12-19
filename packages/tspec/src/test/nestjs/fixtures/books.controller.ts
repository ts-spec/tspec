// Mock NestJS decorators for testing
function Controller(path?: string): ClassDecorator {
  return () => {};
}
function Get(path?: string): MethodDecorator {
  return () => {};
}
function Post(path?: string): MethodDecorator {
  return () => {};
}
function Put(path?: string): MethodDecorator {
  return () => {};
}
function Delete(path?: string): MethodDecorator {
  return () => {};
}
function Param(name?: string): ParameterDecorator {
  return () => {};
}
function Query(): ParameterDecorator {
  return () => {};
}
function Body(): ParameterDecorator {
  return () => {};
}
function ApiResponse(options: { status: number; description?: string; type?: any }): MethodDecorator {
  return () => {};
}

interface Book {
  id: number;
  title: string;
  author: string;
}

interface CreateBookDto {
  title: string;
  author: string;
}

interface UpdateBookDto {
  title?: string;
  author?: string;
}

interface BookListQuery {
  page?: number;
  limit?: number;
}

/**
 * Books API Controller
 */
@Controller('books')
export class BooksController {
  /**
   * Get all books
   * @summary List all books
   */
  @Get()
  findAll(@Query() query: BookListQuery): Promise<Book[]> {
    return Promise.resolve([]);
  }

  /**
   * Get a single book by ID
   */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Book found', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('id') id: string): Promise<Book> {
    return Promise.resolve({} as Book);
  }

  /**
   * Create a new book
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return Promise.resolve({} as Book);
  }

  /**
   * Update an existing book
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
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return Promise.resolve();
  }
}
