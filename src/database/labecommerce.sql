-- Active: 1721319471283@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        "user01",
        "Alice",
        "alice@email.com",
        "ali.123",
        "2024-07-18 13:24:132165"
    ),
    (
        "user02",
        "Bento",
        "ben@email.com",
        "benbem123",
        "2024-07-18 13:25:32162"
    ),
    (
        "user03",
        "Claudia",
        "cacau@email.com",
        "cacau.654",
        "2024-07-18 13:25:465321"
    );

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "p001",
        "Monitor Dell 17' ",
        750,
        "Monitor Dell 17' UHD.",
        "https://encurtador.com.br/L8dfT"
    ),
    (
        "p002",
        "Mouse óptico Dell - MS116",
        79,
        "O mouse óptico MS116 da Dell tem conectividade com fio.",
        "https://encurtador.com.br/W7xjn "
    ),
    (
        "p003",
        "Teclado colaborativo Dell Premier",
        1041,
        "Este é o primeiro teclado recarregável* do mundo.",
        "https://encurtador.com.br/uuzKU"
    ),
    (
        "p004",
        "Impressora Multifuncional Epson Ecotank L3210",
        836.10,
        "ETanque de Tinta Colorida USB.",
        "https://encurtador.com.br/pgeM9"
    ),
    (
        "p005",
        "Camera de Segurança wifi Externa TP - Link Tapo C500",
        589.90,
        "1080p Full HD, 360° de Alcance, Visão Noturna.",
        "https://encurtador.com.br/au0Wj"
    );