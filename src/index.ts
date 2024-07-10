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

// Busca todos os usuário
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

// Cadastra um novo usuário, chama a função createUser
app.post("/users", (req: Request, res: Response) => {
    createUser("user7", "Gedalia", "gege@email.com", "ge.1234")
    res.status(201).send(users)
})

// Busca por params id e deleta o user selecionado
app.delete("/users/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id
    
    const index = users.findIndex((user) => user.id === idToDelete)

    index < 0 ? res.status(400).send("User não encontrato") : users.splice(index, 1)

    res.status(200).send("User apagado com sucesso!")
})

// Busca todos os produtos.
app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

// Busca produto por nome do produto via query.
app.get("/products/search", (req: Request, res: Response) => {
    const q = req.query.q as string;
    let result = searchProductsByName(q)
    
    if (result === undefined) {
        res.status(404).send(products)
    } else {
        res.status(200).send(result)
    }
})

// Cadastra um novo produto, chama a função createProducts
app.post("/products", (req: Request, res: Response) => {
    createProduct("prod4", "impressora", 979, "Impressora multfuncionarl Epson", "https://encurtador.com.br/uuzKU")
    res.status(201).send(products)
})

// Busca por params id e deleta o product selecionado
app.delete("/products/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id
    
    const index = products.findIndex((product) => product.id === idToDelete)

    index < 0 ? res.status(400).send("Product não encontrato") : products.splice(index, 1)

    res.status(200).send("Product apagado com sucesso!")
})

// Atualizar um produto por ID
app.put("/products/:id", (req: Request, res: Response) => {
    const { id } = req.params

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const productFound = products.find((product) => product.id === id)

    if (productFound){
        productFound.id = newId || productFound.id
        productFound.name = newName || productFound.name
        productFound.price = newPrice || productFound.price
        productFound.description = newDescription || productFound.description
        productFound.imageUrl = newImageUrl || productFound.imageUrl
    }

    res.status(200).send("Produto atualizado com sucesso!")

})