import { order } from '../reducers'
import {
    ADD_PRODUCT,
    CHANGE_PRODUCT_QUANTITY,
    REMOVE_PRODUCT,
    SET_ORDER
} from 'domain/order/actions'
import { countOrderTotal, enhanceOrder } from 'domain/order/utils'
import { Product } from 'domain/product/types'
import { roundTo2Decimals } from 'utils'
import { OldOrder } from 'domain/order/types'

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

const testOrder = enhanceOrder(testApiOrder)

const testProduct: Product = {
    id: 'A101',
    description: 'Screwdriver',
    category: '1',
    price: '9.75'
}

const testProductInOrder: Product = {
    id: 'B102',
    description: 'Press button',
    category: '2',
    price: '4.99'
}

test('should return null, since order is not fetched yet', () => {
    expect(order(undefined, { type: '' })).toEqual(null)
})

test('provided order is set', () => {
    expect(order(undefined, { type: SET_ORDER, order: testOrder })).toEqual(
        testOrder
    )
})

test('product that is not in order is added', () => {
    const newProductList = {
        ...testOrder.items,
        [testProduct.id]: {
            ...testProduct,
            price: parseFloat(testProduct.price),
            quantity: 1,
            total: parseFloat(testProduct.price)
        }
    }
    expect(
        order(testOrder, {
            type: ADD_PRODUCT,
            product: testProduct,
            quantity: 1
        })
    ).toEqual({
        ...testOrder,
        items: newProductList,
        total: countOrderTotal(newProductList)
    })
})

test('product that is in order is added', () => {
    const productInOrder = testOrder.items[testProductInOrder.id]
    const newProductList = {
        ...testOrder.items,
        [productInOrder.id]: {
            ...productInOrder,
            quantity: productInOrder.quantity + 1,
            total: roundTo2Decimals(productInOrder.total + productInOrder.price)
        }
    }
    expect(
        order(testOrder, {
            type: ADD_PRODUCT,
            product: testProductInOrder,
            quantity: 1
        })
    ).toEqual({
        ...testOrder,
        items: newProductList,
        total: countOrderTotal(newProductList)
    })
})

test('product that is in order has changed quantity', () => {
    const newQuantity = 3
    const productInOrder = testOrder.items[testProductInOrder.id]
    const newProductList = {
        ...testOrder.items,
        [productInOrder.id]: {
            ...productInOrder,
            quantity: newQuantity,
            total: roundTo2Decimals(productInOrder.price * newQuantity)
        }
    }
    expect(
        order(testOrder, {
            type: CHANGE_PRODUCT_QUANTITY,
            product: testProductInOrder,
            newQuantity
        })
    ).toEqual({
        ...testOrder,
        items: newProductList,
        total: countOrderTotal(newProductList)
    })
})

test('remove product that is in order', () => {
    expect(
        order(testOrder, {
            type: REMOVE_PRODUCT,
            productId: testProductInOrder.id
        })
    ).toEqual({
        ...testOrder,
        items: {},
        total: 0
    })
})
