import { users, products, createUser, createProduct, getAllUsers, getAllProducts } from "./database";
import express, { query, Request, Response } from "express"
import cors from "cors"
import { db } from "./database/knex";

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

//           <<<--- USUÁRIOS --->>>

// Cria a tabela de Usuários
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

// Busca todos os Usuários
app.get("/users", async (req: Request, res: Response) => {
    try{
        const result = await db.raw(`
            SELECT * FROM users;    
        `)

        res.status(200).send(result)

    } catch(error: any){
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

// Cadastra um novo Usuário
app.post("/users", async (req: Request, res: Response) => {
    try{
        
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password        

       if (!id || !name || !email || !password){
            res.status(400)
            throw new Error("Dados inválidos!")
        }

       await db.raw(`
            INSERT INTO users (id, name, email, password, created_at)
            VALUES ("${id}", "${name}", "${email}", "${password}", "${"2024-08-15 11:39:32"}");
        `)
        
        res.status(201).send({message: "Usuário cadastrado com sucesso!"})

    } catch(error: any){
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

// Busca por params id e DELETA o Usuário selecionado
app.delete("/users/:id", async (req: Request, res: Response) => {
    try{
        const idToDelete = req.params.id
        
        const [ user ] = await db.raw(`
            SELECT * FROM users WHERE id = "${idToDelete}";
        `)

        if (!user){
            res.status(404)
            throw new Error("User não encontrato")
        } 
        
        await db.raw(`
	        DELETE FROM users
			WHERE id = "${idToDelete}";
        `)

        res.status(200).send("User apagado com sucesso!")

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

//           <<<--- PRODUTOS --->>>

// Cria a tabela de Produtos
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

// Busca todos os produtos.
app.get("/products", async (req: Request, res: Response) => {
    try{
        const result = await db.raw(`
            SELECT * FROM products;    
        `)

        res.status(200).send(result)

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

// Busca produto por nome do produto via query.
app.get("/products/:name", async (req: Request, res: Response) => {
    try{
        const name = req.params.name

        const productsList = await db.raw(`
            SELECT * FROM products
            WHERE name LIKE '%${name}%';
        `)

        res.status(200).send(productsList)
        
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

// Cadastra um novo produto, chama a função createProducts
app.post("/products", async (req: Request, res: Response) => {

    try{
        
        const id: string = req.body.id
        const name: string = req.body.name
        const price: number = req.body.price
        const description: string = req.body.description    
        const imageUrl: string = req.body.imageUrl    

        if (!id || !name || !price || !description || !imageUrl){
            res.status(400)
            throw new Error("Dados inválidos!")
        }

        await db.raw(`
            INSERT INTO products (id, name, price, description, image_url)
            VALUES ("${id}", "${name}", "${price}", "${description}", "${imageUrl}")
            `)

        res.status(201).send({message: "Produto cadastrado com sucesso!"})

    } catch(error: any){
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

//           <<<--- PEDIDOS --->>>

// Cria a tabela Compras
app.post('/create-table-purchases', async (req: Request, res: Response) => {
    try {
        await db.raw(`
            CREATE TABLE purchases (
                id TEXT PRIMARY KEY UNIQUE NOT NULL,
                buyer TEX NOT NULL,
                total_price REAL NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY (buyer) REFERENCES users(id)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            );
        `)

        res.status(200).send({message: 'Tabela de pedidos criada com sucesso!'})

    }catch(error){
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

//           <<<--- PEDIDOS X PRODUTOS --->>>

// Cria a tabela de relações Compras x Produtos
app.post('/create-table-purchases-products', async (req: Request, res: Response) => {
    try {
        await db.raw(`
            CREATE TABLE purchases_products (
                purchase_id TEXT NOT NULL,
                product_id TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                FOREIGN KEY (purchase_id) REFERENCES purchases(id) 
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) 
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            );
        `)

    res.status(200).send({message: 'Tabela de pedidos-produtos criada com sucesso!'})

    }catch(error){
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
