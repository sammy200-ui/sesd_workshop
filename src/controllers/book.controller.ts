import { Request, Response } from "express"
import BookService from "../services/book.service"
import { HttpException } from "../exceptions/http.exception"

class BookController {
    private service: BookService

    constructor() {
        this.service = new BookService()
    }

    public createBook = async (req: Request, res: Response) => {
        try {
            const book = await this.service.createBook(req.body)
            res.status(201).json({
                success: true,
                data: book
            })
        } catch (err) {
            this.handleError(res, err)
        }
    }

    public getBook = async (req: Request, res: Response) => {
        try {
            const book = await this.service.getBook(req.params.id)
            res.status(200).json({
                success: true,
                data: book
            })
        } catch (err) {
            this.handleError(res, err)
        }
    }

    public getAllBooks = async (req: Request, res: Response) => {
        try {
            const query = {
                search: req.query.search as string,
                author: req.query.author as string,
                genre: req.query.genre as string,
                year: req.query.year ? parseInt(req.query.year as string) : undefined,
                sortBy: req.query.sortBy as string,
                order: req.query.order as "asc" | "desc",
                page: req.query.page ? parseInt(req.query.page as string) : 1,
                limit: req.query.limit ? parseInt(req.query.limit as string) : 10
            }

            const result = await this.service.getAllBooks(query)
            res.status(200).json({
                success: true,
                ...result
            })
        } catch (err) {
            this.handleError(res, err)
        }
    }

    public updateBook = async (req: Request, res: Response) => {
        try {
            const book = await this.service.updateBook(req.params.id, req.body)
            res.status(200).json({
                success: true,
                data: book
            })
        } catch (err) {
            this.handleError(res, err)
        }
    }

    public deleteBook = async (req: Request, res: Response) => {
        try {
            const book = await this.service.deleteBook(req.params.id)
            res.status(200).json({
                success: true,
                message: "Book deleted successfully",
                data: book
            })
        } catch (err) {
            this.handleError(res, err)
        }
    }

    private handleError(res: Response, err: unknown) {
        if (err instanceof HttpException) {
            res.status(err.status).json({
                success: false,
                message: err.message
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
}

export default BookController
