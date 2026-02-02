import { Router } from "express"
import { Routes } from "../utils/route.Interface"
import BookController from "../controllers/book.controller"

class BookRoutes implements Routes {
    path: string = "/books"
    router: Router = Router()
    private controller: BookController

    constructor() {
        this.controller = new BookController()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(this.path, this.controller.createBook)
        this.router.get(this.path, this.controller.getAllBooks)
        this.router.get(`${this.path}/:id`, this.controller.getBook)
        this.router.put(`${this.path}/:id`, this.controller.updateBook)
        this.router.delete(`${this.path}/:id`, this.controller.deleteBook)
    }
}

export default BookRoutes
