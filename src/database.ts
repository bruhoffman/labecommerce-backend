import { TCustomer, TProduct } from "./types";

export const users:TCustomer [] = [
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
]

export const createUser = (newUser:TCustomer):void => {
    users.push(newUser)
    console.table(users)
    return console.log("Cadastro realizado com sucesso!")
}

export const products: TProduct[] = [
    {
        id: "prod1",
        name: "Monitor 17'",
        price: 750.00,
        description: "Monitor Dell 17' UHD",
        imageUrl: "https://i.dell.com/is/image/DellContent//content/dam/images/products/electronics-and-accessories/dell/monitors/e-series/e2020h/e2020h-cfp-0025lf000-bk.psd?fmt=pjpg&pscan=auto&scl=1&wid=3372&hei=3118&qlt=100,1&resMode=sharp2&size=3372,3118&chrss=full&imwidth=5000"
    },

    {
        id: "prod2",
        name: "Mouse óptico Dell - MS116",
        price: 79.00,
        description: "Performance confiável dia após dia, O mouse óptico MS116 da Dell conta com recursos de controle óptico por LED e conectividade com fio",
        imageUrl: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/input-devices/dell/mouse/dell-ms116-optical-mouse-sapphire-1001a-black-hero-504x350.jpg?fmt=jpg&wid=504&hei=350"
    },

    {
        id: "prod3",
        name: "Teclado colaborativo Dell Premier",
        price: 1041.00,
        description: "Este é o primeiro teclado recarregável* do mundo com certificação Zoom, criado para transformar a colaboração, aumentar a produtividade e proporcionar conforto o dia todo.",
        imageUrl: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/input-devices/dell/keyboards/kb900/media-gallery/keyboard-kb900-black-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&wid=4721&hei=2000&qlt=100,1&resMode=sharp2&size=4721,2000&chrss=full&imwidth=5000"
    },

    {
        id: "prod4",
        name: "APC No-break Back-UPS 1200VA, Torre, Bivolt / 115V, 6 tomadas NBR 14136",
        price: 1251.00,
        description: "O Back-UPS™ da APC™ ajuda a fornecer energia para redes sem fio wireless, computadores, consoles de jogos e outros equipamentos eletrônicos",
        imageUrl: "https://snpi.dell.com/snp/images/products/large/pt-br~AC687664/AC687664.jpg"
    },

    {
        id: "prod5",
        name: "Vostro Small Desktop",
        price: 3508.00,
        description: "Compre PC compacto de alto desempenho, com recursos de segurança, conectividade, ideal para aumentar sua produtividade no dia a dia e no trabalho.",
        imageUrl: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/vostro-desktops/vostro-3710-sff/media-gallery/desktop-vostro-3710-gallery-9.psd?fmt=pjpg&pscan=auto&scl=1&wid=2200&hei=3005&qlt=100,1&resMode=sharp2&size=2200,3005&chrss=full&imwidth=5000"
    }
]