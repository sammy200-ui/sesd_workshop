import BookRepository from "../repositories/book.repository"
import { BookInterface, BookQuery, PaginatedResponse, BookDocument } from "../interfaces/book.interface"
import { ValidationException } from "../exceptions/http.exception"

class BookService {
    private repository: BookRepository

    constructor() {
        this.repository = new BookRepository()
    }

    public async createBook(bookData: Partial<BookInterface>): Promise<BookDocument> {
        this.validateBookData(bookData)
        const book = await this.repository.create(bookData)
        return book
    }

    public async getBook(id: string): Promise<BookDocument> {
        this.validateId(id)
        const book = await this.repository.findById(id)
        return book
    }

    public async getAllBooks(query: BookQuery): Promise<PaginatedResponse<BookDocument>> {
        const page = query.page || 1
        const limit = query.limit || 10

        const { books, total } = await this.repository.findAll(query)

        return {
            data: books,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    public async updateBook(id: string, bookData: Partial<BookInterface>): Promise<BookDocument> {
        this.validateId(id)
        this.validateUpdateData(bookData)
        const book = await this.repository.update(id, bookData)
        return book
    }

    public async deleteBook(id: string): Promise<BookDocument> {
        this.validateId(id)
        const book = await this.repository.delete(id)
        return book
    }

    private validateBookData(data: Partial<BookInterface>): void {
        if (!data.title || data.title.trim() === "") {
            throw new ValidationException("Title is required")
        }
        if (!data.author || data.author.trim() === "") {
            throw new ValidationException("Author is required")
        }
        if (!data.genre || data.genre.trim() === "") {
            throw new ValidationException("Genre is required")
        }
        if (!data.year || data.year < 0) {
            throw new ValidationException("Valid year is required")
        }
        if (!data.isbn || data.isbn.trim() === "") {
            throw new ValidationException("ISBN is required")
        }
        if (data.pages !== undefined && data.pages < 0) {
            throw new ValidationException("Pages cannot be negative")
        }
    }

    private validateUpdateData(data: Partial<BookInterface>): void {
        if (data.title !== undefined && data.title.trim() === "") {
            throw new ValidationException("Title cannot be empty")
        }
        if (data.author !== undefined && data.author.trim() === "") {
            throw new ValidationException("Author cannot be empty")
        }
        if (data.year !== undefined && data.year < 0) {
            throw new ValidationException("Year cannot be negative")
        }
        if (data.pages !== undefined && data.pages < 0) {
            throw new ValidationException("Pages cannot be negative")
        }
    }

    private validateId(id: string): void {
        if (!id || id.trim() === "") {
            throw new ValidationException("Valid ID is required")
        }
    }
}

export default BookService
