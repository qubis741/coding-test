import { OldProduct, OrderProduct, Product } from 'domain/product/types'
import {
    deEnhanceOrderProduct,
    enhanceOrderProduct
} from 'domain/product/utils'

const testDataProducts: Product[] = [
    {
        id: 'A101',
        description: 'Screwdriver',
        category: '1',
        price: '9.75'
    }
]

const testOldProduct: OldProduct = {
    'product-id': 'A101',
    quantity: '1',
    'unit-price': '9.75',
    total: '9.75'
}

const testOrderProduct: OrderProduct = {
    id: 'A101',
    description: 'Screwdriver',
    category: '1',
    quantity: 1,
    price: 9.75,
    total: 9.75
}

test('enhanceOrderProduct works', () => {
    expect(enhanceOrderProduct(testOldProduct, testDataProducts)).toEqual(
        testOrderProduct
    )
})

test('deEnhanceOrderProduct works', () => {
    expect(deEnhanceOrderProduct(testOrderProduct)).toEqual(testOldProduct)
})
