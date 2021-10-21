import { OldOrder, Order, ProductList } from 'domain/order/types'
import {
    deEnhanceOrderProduct,
    enhanceOrderProduct
} from 'domain/product/utils'
import { OldProduct } from 'domain/product/types'
import { roundTo2Decimals } from 'utils'
import dataProducts from 'data/products.json'

// Enhancing order with indexed product list and products converted to useful DTO
export const enhanceOrder = (order: OldOrder): Order => {
    const convertedProductsList: ProductList = {}
    order.items.forEach(item => {
        convertedProductsList[item['product-id']] = enhanceOrderProduct(
            item,
            dataProducts
        )
    })

    return {
        ...order,
        total: parseFloat(order.total),
        items: convertedProductsList
    }
}
// Conversion back to provided API format
export const deEnhanceOrder = (order: Order): OldOrder => {
    const convertedProductsList: OldProduct[] = Object.values(order.items).map(
        item => deEnhanceOrderProduct(item)
    )
    return {
        ...order,
        items: convertedProductsList,
        total: order.total.toString()
    }
}

export const countOrderTotal = (items: ProductList): number =>
    roundTo2Decimals(
        Object.values(items).reduce((prev, cur) => prev + cur.total, 0)
    )
