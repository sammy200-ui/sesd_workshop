import { model, Schema } from "mongoose"
import { BookDocument, BookModelInterface } from "../interfaces/book.interface"

const bookSchema = new Schema<BookDocument>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    pages: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

bookSchema.index({ title: "text", author: "text", description: "text" })

const BookModel = model<BookDocument, BookModelInterface>("Book", bookSchema)

export default BookModel
