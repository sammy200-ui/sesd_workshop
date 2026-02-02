import BookModel from "../models/book.model"
import { BookInterface, BookDocument, BookQuery } from "../interfaces/book.interface"
import { NotFoundException } from "../exceptions/http.exception"

class BookRepository {
    private model = BookModel

    public async create(bookData: Partial<BookInterface>): Promise<BookDocument> {
        const book = await this.model.create(bookData)
        return book
    }

    public async findById(id: string): Promise<BookDocument> {
        const book = await this.model.findById(id)
        if (!book) {
            throw new NotFoundException("Book not found")
        }
        return book
    }

    public async findAll(query: BookQuery): Promise<{ books: BookDocument[], total: number }> {
        const { search, author, genre, year, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = query

        let filter: any = {}

        if (search) {
            filter.$text = { $search: search }
        }

        if (author) {
            filter.author = { $regex: author, $options: "i" }
        }

        if (genre) {
            filter.genre = { $regex: genre, $options: "i" }
        }

        if (year) {
            filter.year = year
        }

        const sortOrder = order === "asc" ? 1 : -1
        const skip = (page - 1) * limit

        const books = await this.model
            .find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)

        const total = await this.model.countDocuments(filter)

        return { books, total }
    }

    public async update(id: string, bookData: Partial<BookInterface>): Promise<BookDocument> {
        const book = await this.model.findByIdAndUpdate(id, bookData, { new: true, runValidators: true })
        if (!book) {
            throw new NotFoundException("Book not found")
        }
        return book
    }

    public async delete(id: string): Promise<BookDocument> {
        const book = await this.model.findByIdAndDelete(id)
        if (!book) {
            throw new NotFoundException("Book not found")
        }
        return book
    }
}

export default BookRepository
