import { OldProduct, OrderProduct } from 'domain/product/types'

export type ProductList = { [key: string]: OrderProduct }

export type Order = {
    id: string
    'customer-id': string
    items: ProductList
    total: number
}

export type OldOrder = {
    id: string
    'customer-id': string
    items: OldProduct[]
    total: string
}
