// Enhancing of Order Product to match type of provided data and use numbers where its useful
import { OldProduct, OrderProduct, Product } from 'domain/product/types'

export let enhanceOrderProduct = (p: OldProduct, dataProducts: Product[]): OrderProduct => {
    const dataProduct = dataProducts.find(dp => dp.id === p['product-id'])!
    return {
        id: p['product-id'],
        quantity: parseInt(p.quantity),
        category: dataProduct.category,
        description: dataProduct.description,
        price: parseFloat(dataProduct.price),
        total: parseFloat(p.total)
    }
}

// Conversion back to provided API format
export let deEnhanceOrderProduct = (p: OrderProduct): OldProduct => ({
    'product-id': p.id,
    quantity: p.quantity.toString(),
    'unit-price': p.price.toString(),
    total: p.total.toString()
})
