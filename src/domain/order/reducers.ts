import {
    ADD_PRODUCT,
    CHANGE_PRODUCT_QUANTITY,
    CLEAR_ORDER,
    REMOVE_PRODUCT,
    SET_ORDER
} from 'domain/order/actions'
import { AnyAction } from 'redux'
import { Order } from 'domain/order/types'
import { countOrderTotal } from 'domain/order/utils'
import { roundTo2Decimals } from 'utils'

const addProduct = (state: OrderState, action: AnyAction) => {
    if (!state) return state
    const productId = action.product.id
    const productInOrder = state.items && state.items[productId]
    const newProductQuantity = productInOrder
        ? productInOrder.quantity + action.quantity
        : action.quantity
    const updatedProduct = {
        ...action.product,
        price: parseFloat(action.product.price),
        quantity: newProductQuantity,
        total: roundTo2Decimals(action.product.price * newProductQuantity)
    }
    const updatedItems = { ...state.items, [productId]: updatedProduct }
    return {
        ...state,
        items: updatedItems,
        total: countOrderTotal(updatedItems)
    }
}

const changeProductQuantityReducer = (state: OrderState, action: AnyAction) => {
    if (!state) return state
    const productId = action.product.id
    const productInOrder = state.items[productId]
    const updatedProduct = {
        ...productInOrder,
        quantity: action.newQuantity,
        total: roundTo2Decimals(productInOrder.price * action.newQuantity)
    }
    const updatedItems = { ...state.items, [productId]: updatedProduct }
    return {
        ...state,
        items: updatedItems,
        total: countOrderTotal(updatedItems)
    }
}

const removeProduct = (state: OrderState, action: AnyAction) => {
    if (!state) return state
    const { [action.productId]: removed, ...updatedItems } = state.items

    return {
        ...state,
        items: updatedItems,
        total: countOrderTotal(updatedItems)
    }
}

export type OrderState = Order | null | undefined
export const defaultOrderState: Order = {
    id: '',
    'customer-id': '',
    items: {},
    total: 0
}

export const order = (state: OrderState, action: AnyAction) => {
    switch (action.type) {
        case SET_ORDER:
            return {
                ...state,
                ...action.order
            }
        case ADD_PRODUCT:
            return addProduct(state, action)
        case CHANGE_PRODUCT_QUANTITY:
            return changeProductQuantityReducer(state, action)
        case REMOVE_PRODUCT:
            return removeProduct(state, action)
        case CLEAR_ORDER:
            return defaultOrderState
        default:
            return state || null
    }
}
