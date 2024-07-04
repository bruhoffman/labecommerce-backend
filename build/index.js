"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
//console.table(users)
//console.table(products)
// Exercício 1 - Typescript II
//createUser("user7", "Gedalia", "gedalia@email.com", "ge789+")
//getAllUsers()
// Exercício 2 - Typescript II
(0, database_1.createProduct)("prod4", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo");
//getAllProducts()
// Exercício 3 - Typescript
(0, database_1.searchProductsByName)("Mouse");
