import { Product } from 'domain/product/types'
import { OrderState } from 'domain/order/reducers'

export const SET_ORDER = 'SET_ORDER'
export function setOrder(order: OrderState) {
    return {
        type: SET_ORDER,
        order
    }
}

export const ADD_PRODUCT = 'ADD_PRODUCT'
export function addProduct(product: Product, quantity: number) {
    return {
        type: ADD_PRODUCT,
        product,
        quantity
    }
}

export const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY'
export function changeProductQuantity(product: Product, newQuantity: number) {
    return {
        type: CHANGE_PRODUCT_QUANTITY,
        product,
        newQuantity
    }
}

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export function removeProduct(productId: string) {
    return {
        type: REMOVE_PRODUCT,
        productId
    }
}

export const CLEAR_ORDER = 'CLEAR_ORDER'
export function clearOrder() {
    return {
        type: CLEAR_ORDER
    }
}
