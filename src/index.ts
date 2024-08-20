import express, { Request, Response } from "express"
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
        /* const result = await db.raw(`
            SELECT * FROM users;    
        `) */

        const result = await db.select("*").from("users")

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

       /* await db.raw(`
            INSERT INTO users (id, name, email, password, created_at)
            VALUES ("${id}", "${name}", "${email}", "${password}", "${"2024-08-15 11:39:32"}");
        `) */

        await db.insert({
                id: id,
                name: name,
                email: email,
                password: password,
                created_at: "2024-08-16 16:05:45"
				}).into("users")
        
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
        const result = await db.select("*").from("products")

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
        const nameWanted = req.params.name

        /* const productsList = await db.raw(`
            SELECT * FROM products
            WHERE name LIKE '%${name}%';
        `) */

        const productsList = await db.select('*').from('products').whereLike('name', `%${nameWanted}%`);

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
        
        await db.insert({
                id: id,
                name: name,
                price: price,
                description: description,
                image_url: imageUrl
				}).into("products")

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

// Atualizar um produto por ID
app.put("/products/:id", async (req: Request, res: Response) => {

    try{
        const idWanted = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImageUrl = req.body.imageUrl

        if (newId !== undefined){
            if (typeof newId !== "string"){
                res.status(400)
                throw new Error("'Id' deve ser uma string")
            }

            if (newId.length < 2){
                res.status(400)
                throw new Error ("'Id' deve possuir no mínimo 2 caracteres")
            }
        }

        if (newName !== undefined){
            if (typeof newName !== "string"){
                res.status(400)
                throw new Error("'Name' deve ser uma string")
            }

            if (newName.length < 2){
                res.status(400)
                throw new Error ("'Name' deve possuir no mínimo 2 caracteres")
            }
        }

        if (newPrice !== undefined){
            if (typeof newPrice !== "number"){
                res.status(400)
                throw new Error("'Preço' deve ser um número real")
            }

            if (newPrice < 0){
                res.status(400)
                throw new Error ("'Preço' deve possuir um valor real")
            }
        }

        if (newDescription !== undefined){
            if (typeof newDescription !== "string"){
                res.status(400)
                throw new Error("'Descrição' deve ser uma string")
            }

            if (newDescription.length < 2){
                res.status(400)
                throw new Error ("'Descrição' deve possuir no mínimo 2 caracteres")
            }
        }

        if (newImageUrl !== undefined){
            if (typeof newImageUrl !== "string"){
                res.status(400)
                throw new Error("'URL' deve ser um endereço válido")
            }

            if (newImageUrl.length < 2){
                res.status(400)
                throw new Error ("'URL' deve possuir no mínimo 2 caracteres")
            }
        }

        const [ productFound ] = await db.select("*").from("productsusers").where({ id: `${idWanted}` })

        if (!productFound){
            res.status(404)
            throw new Error("'Produto' não encontrato")
            
        } else{
            await db.raw(`
                UPDATE products
                SET
                    id = "${newId || productFound.id}",
                    name = "${newName || productFound.name}",
                    price = "${newPrice || productFound.price}",
                    description = "${newDescription || productFound.description}",
                    image_url = "${newImageUrl || productFound.image_Url}"
                WHERE id = "${idWanted}";
            `)
        }

        res.status(200).send("Produto atualizado com sucesso!")
    
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

// Busca por params id e DELETA o PRODUCT selecionado
app.delete("/products/:id", async (req: Request, res: Response) => {
    try{
        const idToDelete = req.params.id
        
        const [ product ] = await db.select("*").from("products").where( {id : idToDelete})

        if (!product){
            res.status(404)
            throw new Error("Produto não encontrato")
        } 
        
        await db.delete().from("products").where({ id : idToDelete})

        res.status(200).send("Produto deletado com sucesso!")

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

//           <<<--- COMPRAS --->>>

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

// Busca todos as compras
app.get("/purchases", async (req: Request, res: Response) => {
    try{

        const result = await db("purchases")

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

// Cadastra nova compra.
app.post('/purchases', async (req: Request, res: Response) => {
    try{
        const id: string = req.body.id
        const buyer: string = req.body.buyer
        const total_price: number = req.body.total_price
        const created_at: string = req.body.created_at
        
        if (!id || !buyer || !total_price){
            res.status(400)
            throw new Error("Dados inválidos!")
        }

        await db.insert({
            id: id,
            buyer: buyer,
            total_price: total_price,
            created_at: created_at
        }).into("purchases")

        res.status(201).send({message: "Compra cadastrada com sucesso!"})

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

// Busca a compra e relaciona com o comprador.
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idPurchase = req.params.id

        if (idPurchase !== undefined){
            if (typeof idPurchase !== "string") {
                res.status(400)
                throw new Error ("ID deve ser uma string")
            }

            if (idPurchase.length < 2){
                res.status(400)
                throw new Error ("'Id' deve possuir no mínimo 2 caracteres")
            }
        }

        const result = await db("purchases")
            .innerJoin(
                "users",
                "purchases.buyer",
                "=",
                "users.id",
            ).where({"purchaes.id": idPurchase})

        
            console.log(result)

        res.status(200).send(result)

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

//           <<<--- RELAÇÃO DA COMPRA --->>>

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

// Busca todos as compras
app.get("/purchases-products", async (req: Request, res: Response) => {
    try{
        const result = await db.select("*").from("purchases_products")

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

// Cadastra os pedidos
app.post('/purchases-products', async (req: Request, res: Response) => {
    try{
        const purchase_id: string = req.body.purchase_id
        const product_id: string = req.body.product_id
        const quantity: number = req.body.quantity
                
        if (!purchase_id || !product_id || !quantity){
            res.status(400)
            throw new Error("Dados inválidos!")
        }

        await db.insert({
            purchase_id: purchase_id,
            product_id: product_id,
            quantity: quantity
        }).into("purchases_products")
        
        res.status(201).send({message: "Compra cadastrada com sucesso!"})

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

