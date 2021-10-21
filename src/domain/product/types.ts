export type OldProduct = {
    "product-id": string
    quantity: string
    "unit-price": string
    total: string
}

export type Product = {
    id: string
    description: string
    category: string
    price: string
}

export type OrderProduct = {
    id: string
    description: string
    category: string
    price: number
    quantity: number
    total: number
}
