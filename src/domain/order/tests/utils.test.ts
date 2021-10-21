import { OldProduct, OrderProduct, Product } from 'domain/product/types'
import { deEnhanceOrder, enhanceOrder } from 'domain/order/utils'
import { OldOrder, Order } from 'domain/order/types'
import * as ProductUtils from 'domain/product/utils'

const testOldProduct: OldProduct = {
    'product-id': 'B102',
    quantity: '5',
    'unit-price': '4.99',
    total: '24.95'
}

const testOrderProduct: OrderProduct = {
    id: 'B102',
    description: 'Press button',
    category: '2',
    quantity: 5,
    price: 4.99,
    total: 24.95
}

const testApiOrder: OldOrder = {
    id: '2',
    'customer-id': '2',
    items: [
        {
            'product-id': 'B102',
            quantity: '5',
            'unit-price': '4.99',
            total: '24.95'
        }
    ],
    total: '24.95'
}

const testOrder: Order = {
    id: '2',
    'customer-id': '2',
    items: {
        B102: {
            id: 'B102',
            description: 'Press button',
            category: '2',
            quantity: 5,
            price: 4.99,
            total: 24.95
        }
    },
    total: 24.95
}

/*
 Hack for mocking named imported function
 https://stackoverflow.com/questions/51203516/mock-named-exports-for-testing-using-jest/51223001
*/

//@ts-ignore
ProductUtils.enhanceOrderProduct = jest.fn();
test('enhanceOrder works', () => {
    // Hack for mocking named imported function
    //@ts-ignore
    ProductUtils.enhanceOrderProduct.mockImplementation(() => testOrderProduct);
    expect(enhanceOrder(testApiOrder)).toEqual(testOrder)
})

// Hack for mocking named imported function
//@ts-ignore
ProductUtils.deEnhanceOrderProduct = jest.fn();
test('deEnhanceOrder works', () => {
    // Hack for mocking named imported function
    //@ts-ignore
    ProductUtils.deEnhanceOrderProduct.mockImplementation(() => testOldProduct);
    expect(deEnhanceOrder(testOrder)).toEqual(testApiOrder)
})
