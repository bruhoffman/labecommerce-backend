import { users, products, createUser, createProduct, getAllUsers, getAllProducts, searchProductsByName } from "./database";
import express, { Request, Response } from "express"
import cors from "cors"
import { TProduct } from "./types"

//console.table(users)
//console.table(products)

//       Exercício 1 - Typescript II
//createUser("user7", "Gedalia", "gedalia@email.com", "ge789+")
//getAllUsers()

//       Exercício 2 - Typescript II
//createProduct("prod4", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo")
//getAllProducts()

//       Exercício 3 - Typescript

//searchProductsByName("Mouse")

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.post("/users", (req: Request, res: Response) => {
    createUser("user7", "Gedalia", "gege@email.com", "ge.1234")
    res.status(201).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/products/search", (req: Request, res: Response) => {
    const q = req.query.q as string;
    let result = searchProductsByName(q)
    
    if (result === undefined) {
        res.status(404).send(products)
    } else {
        res.status(200).send(result)
    }
})

app.post("/products", (req: Request, res: Response) => {
    createProduct("prod4", "impressora", 979, "Impressora multfuncionarl Epson", "https://encurtador.com.br/uuzKU")
    res.status(201).send(products)
})
