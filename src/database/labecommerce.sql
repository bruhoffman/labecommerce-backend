-- Active: 1722615884940@@127.0.0.1@3306
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
        "Monitor Dell 17" ",
        750,
        " Monitor Dell 17 " UHD.",
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

SELECT * FROM products WHERE name LIKE "%dell%"

INSERT INTO
    users
VALUES (
        "user04",
        "Danilo",
        "dandan@email.com",
        "dan8723",
        "2024-07-18 14:23:4531"
    )

INSERT INTO
    products
VALUES (
        "p006",
        "Notebook Lenovo IdeaPad 1i",
        3989,
        "Intel Core i7 12GB RAM - 512GB SSD 15,6” Windows 11.",
        "https://encurtador.com.br/EJnJI"
    )

DELETE FROM users WHERE id = "user03"

DELETE FROM products WHERE id = "p004"

UPDATE products
SET
    id = "p001",
    name = "Monitor Dell 17.5",
    price = 898,
    description = "Monitor Dell 17.5 UHD c/ HDMI",
    image_url = "https://encurtador.com.br/L8dfT"
WHERE
    id = "p001"

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

SELECT * FROM purchases;

INSERT INTO
    purchases
VALUES (
        "p001",
        "user01",
        259.90,
        "2024-08-02 14:04:05"
    ),
    (
        "p002",
        "user02",
        468.79,
        "2024-08-02 14:06:55"
    ),
    (
        "p003",
        "user04",
        321.20,
        "2024-08-02 14:08:34"
    );

UPDATE purchases SET total_price = 1785.99 WHERE id = "p002"

SELECT purchases.id, purchases.buyer_id, users.name, users.email, purchases.total_price, purchases.created_at
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id;