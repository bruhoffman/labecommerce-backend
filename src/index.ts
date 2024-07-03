import { users, products, createUser } from "./database";
import { TCustomer } from "./types";

const newUser: TCustomer = {
    id: "user7",
    name: "Gedalia",
    email: "ge@email.com",
    password: "gege321",
    createAt: `${new Date().toISOString()}`
}

createUser(newUser)

//console.table(users)
//console.table(products)
