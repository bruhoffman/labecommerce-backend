"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const newUser = {
    id: "user7",
    name: "Gedalia",
    email: "ge@email.com",
    password: "gege321",
    createAt: `${new Date().toISOString()}`
};
(0, database_1.createUser)(newUser);
//console.table(users)
//console.table(products)
