export class HttpException extends Error {
    public status: number
    public message: string

    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.message = message
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string = "Resource not found") {
        super(404, message)
    }
}

export class ValidationException extends HttpException {
    constructor(message: string = "Validation failed") {
        super(400, message)
    }
}

export class InternalException extends HttpException {
    constructor(message: string = "Internal server error") {
        super(500, message)
    }
}
