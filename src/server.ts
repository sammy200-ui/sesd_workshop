import App from "./app"
import BookRoutes from "./routes/book.routes"
import "dotenv/config"

const app = new App([new BookRoutes()])
app.startServer()
