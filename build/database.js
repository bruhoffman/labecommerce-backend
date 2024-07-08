"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.products = exports.createUser = exports.users = void 0;
exports.getAllUsers = getAllUsers;
exports.getAllProducts = getAllProducts;
exports.searchProductsByName = searchProductsByName;
exports.users = [
    {
        id: "user1",
        name: "Antonio",
        email: "antonio@email.com",
        password: "123",
        createAt: `${new Date().toISOString()}`
    },
    {
        id: "user2",
        name: "Beatriz",
        email: "bea@email.com",
        password: "bea456",
        createAt: `${new Date().toISOString()}`
    },
    {
        id: "user3",
        name: "Carlos",
        email: "caca@email.com",
        password: "caca987",
        createAt: `${new Date().toISOString()}`
    },
    {
        id: "user4",
        name: "Daniele",
        email: "daniele@email.com",
        password: "321654987",
        createAt: `${new Date().toISOString()}`
    },
    {
        id: "user5",
        name: "Elaine",
        email: "eli@email.com",
        password: "eli2024",
        createAt: `${new Date().toISOString()}`
    },
    {
        id: "user6",
        name: "Fernando",
        email: "fe@email.com",
        password: "2024.fe",
        createAt: `${new Date().toISOString()}`
    }
];
const createUser = (id, name, email, password) => {
    const newUser = { id: id, name: name, email: email, password: password, createAt: `${new Date().toISOString()}` };
    exports.users.push(newUser);
    //console.table(users)
    return console.log("Cadastro realizado com sucesso!");
};
exports.createUser = createUser;
function getAllUsers() {
    console.log("Lista atualizada de users");
    console.table(exports.users);
}
exports.products = [
    {
        id: "prod1",
        name: "Monitor Dell 17'",
        price: 750.00,
        description: "Monitor Dell 17' UHD",
        imageUrl: "https://encurtador.com.br/L8dfT"
    },
    {
        id: "prod2",
        name: "Mouse óptico Dell - MS116",
        price: 79.00,
        description: "O mouse óptico MS116 da Dell tem conectividade com fio",
        imageUrl: "https://encurtador.com.br/W7xjn"
    },
    {
        id: "prod3",
        name: "Teclado colaborativo Dell Premier",
        price: 1041.00,
        description: "Este é o primeiro teclado recarregável* do mundo.",
        imageUrl: "https://encurtador.com.br/uuzKU"
    },
];
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    return console.log("Produto criado com sucesso!");
};
exports.createProduct = createProduct;
function getAllProducts() {
    console.log("Lista atualizada de produtos:");
    console.table(exports.products);
}
function searchProductsByName(name) {
    const search = exports.products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
    console.table(search);
}
