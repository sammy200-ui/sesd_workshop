import { Document, Model } from "mongoose"

export interface BookInterface {
    title: string
    author: string
    genre: string
    year: number
    isbn: string
    description: string
    pages: number
    available: boolean
}

export interface BookDocument extends Document, BookInterface {
    createdAt: Date
    updatedAt: Date
}

export type BookModelInterface = Model<BookDocument>

export interface BookQuery {
    search?: string
    author?: string
    genre?: string
    year?: number
    sortBy?: string
    order?: "asc" | "desc"
    page?: number
    limit?: number
}

export interface PaginatedResponse<T> {
    data: T[]
    pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}
