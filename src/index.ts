import { users, products, createUser, createProduct, getAllUsers, getAllProducts } from "./database";
import express, { query, Request, Response } from "express"
import cors from "cors"
import { db } from "./database/knewx";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Criar tabela de usuários
app.post('/create-table-users', async (req: Request, res: Response) => {
    try {
        await db.raw(`
            CREATE TABLE users (
                id TEXT PRIMARY KEY UNIQUE NOT NULL,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TEXT NOT NULL
            );    
        `)
    
        res.status(200).send({message: 'Tabela de usuários criada com sucesso!'})

    } catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send('Erro inesperado!')
        }
    }
});

app.post('/create-table-products', async (req: Request, res: Response) => {
    try{
        await db.raw(`
            CREATE TABLE products (
                id TEXT PRIMARY KEY UNIQUE NOT NULL,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT NOT NULL
            );
        `)

        res.status(200).send({message: 'Tabela de produtos criada com sucesso!'})

    } catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send('Erro inesperado!')
        }
    }

})


// Busca todos os usuários
app.get("/users", (req: Request, res: Response) => {
    try{
        res.status(200).send(getAllUsers())
    }catch(error: any){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send('Erro inesperado!')
        }
    }
})

// Cadastra um novo usuário, chama a função createUser
app.post("/users", (req: Request, res: Response) => {

    try{
        
        const id: string = req.body.id
        const name: string = req.body.name
        const email: string = req.body.email
        const password: string = req.body.password        

       users.map((user) => {
        if (id === user.id) {
            res.status(409)
            throw new Error("ID já existe! Insira um ID diferente.")
        }
        if (email === user.email) {
            res.status(409)
            throw new Error("E-mail já existe! Insira um e-mail diferente.")
        }
       })
        
        res.status(201).send(createUser(id, name, email, password))

    }catch(error: any){
        res.send(error.message)
    }
})

// Busca por params id e DELETA o USER selecionado
app.delete("/users/:id", (req: Request, res: Response) => {
    try{
        const idToDelete = req.params.id
        const index = users.findIndex((user) => user.id === idToDelete)

        if (index < 0){
            res.status(404)
            throw new Error("User não encontrato")
        } 
        
        users.splice(index, 1)
        res.status(200).send("User apagado com sucesso!")

    }catch(error: any){
        res.send(error.message)
    }
})

// Busca todos os produtos.
app.get("/products", (req: Request, res: Response) => {
    try{
        res.status(200).send(getAllProducts())

    }catch(error: any){
        res.status(400).send(error.message)
    }
})

// Busca produto por nome do produto via query.
app.get("/products/search", (req: Request, res: Response) => {
    try{
        const q = req.query.q as string;

        if (q === ""){
            res.status(404)
            throw new Error("Informe pelo menos 1 caracter.")
        }

        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })    
        
        if (result.length === 0) {
            res.status(404)
            throw new Error("Produto não encontrado.")
        } else {
            res.status(200).send(result)
        }
    }catch(error: any){
        res.send(error.message)
    }
})

// Cadastra um novo produto, chama a função createProducts
app.post("/products", (req: Request, res: Response) => {

    try{
        
        const id: string = req.body.id
        const name: string = req.body.name
        const price: number = req.body.price
        const description: string = req.body.description    
        const imageUrl: string = req.body.imageUrl    

       products.map((product) => {
        if (id === product.id) {
            res.status(409)
            throw new Error("ID já existe! Insira um ID diferente.")
        }
       })
        
        res.status(201).send(createProduct(id, name, price, description, imageUrl))

    }catch(error: any){
        res.send(error.message)
    }
})

// Busca por params id e DELETA o PRODUCT selecionado
app.delete("/products/:id", (req: Request, res: Response) => {
    try{
        const idToDelete = req.params.id
        const index = products.findIndex((product) => product.id === idToDelete)

        if (index < 0){
            res.status(404)
            throw new Error("Product não encontrato")
        } 
        
        products.splice(index, 1)
        res.status(200).send("Product apagado com sucesso!")

    }catch(error: any){
        res.send(error.message)
    }

})

// Atualizar um produto por ID
app.put("/products/:id", (req: Request, res: Response) => {

    try{
        const { id } = req.params

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined

        const productFound = products.find((product) => product.id === id)

        if (!productFound){
            res.status(404)
            throw new Error("Product não encontrato")
            
        } else{
            productFound.id = newId || productFound.id
            productFound.name = newName || productFound.name
            productFound.price = newPrice || productFound.price
            productFound.description = newDescription || productFound.description
            productFound.imageUrl = newImageUrl || productFound.imageUrl
        }

        res.status(200).send("Produto atualizado com sucesso!")
    
    }catch(error: any){
        res.send(error.message)
    }
})