const express = require('express')
const app = express()
const port = process.env.PORT || 4000

// const books = [
//     { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
//     { id: 2, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
//     { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
//     { id: 4, title: "The Diary of a Young Girl", author: "Anne Frank" }
// ]

const loggingMiddleware = (req, res, next) => {
    console.log("Request received at " + new Date())
    next()
}

// Middleware at the application level will be called for each request
app.use(loggingMiddleware)


app.get(
    '/', (req, res) => res.send('Hello!')
)


// const bookIdValidatorMiddleware = (req, res, next) => {
//     if (!Number.isInteger(parseInt(req.params.bookId))) {
//         res.status(400).json({ message: "Book ID should be an integer, but was: " + req.params.bookId })
//     } else {
//         next()
//     }
// }



// req = request
// res = response
// app.get('/', (req, res) => res.redirect('/books'))
// app.get(
//     '/', (req, res) => {
//         res.set('location', '/books')
//         // res.json(301, { data: books }) // deprecated
//         res.status(301).json({ data: books })
//     }
// )

// app.get('/books', (req, res) => res.json({
//     data: books
// }))

// app.get('/books/:bookId', (req, res) => {
//     const bookId = req.params.bookId
//     const book = books.find(b => b.id == bookId)
//     if (book) {
//         res.json(book)
//     } else {
//         res.status(404).end()
//     }
// })



// // Middleware at the route level will only be called for requests that match this route
// app.get('/books/:bookId', bookIdValidatorMiddleware, (req, res) => {
//     // ...
// })

// app.get('/books/:bookId', bookIdValidatorMiddleware, (req, res) => {
//     const bookId = req.params.bookId
//     const book = books.find(b => b.id == bookId)
//     if (!book) {
//         return res.status(404).end()
//     }
//     res.json(book)
// })


app.listen(port, () => console.log(`Listening on port: ${port}`))