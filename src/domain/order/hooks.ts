import { useAppDispatch, useAppSelector } from 'store'
import { useEffect } from 'react'
import { enhanceOrder } from 'domain/order/utils'
import {
    addProduct,
    changeProductQuantity,
    clearOrder,
    removeProduct,
    setOrder
} from 'domain/order/actions'
import { Order } from 'domain/order/types'
import dataProducts from 'data/products.json'
import { useAppContext } from 'context/AppContext'

export const useInitOrder = () => {
    const dispatch = useAppDispatch()
    const { orderApi } = useAppContext()
    useEffect(() => {
        orderApi.getOrder().then(d => {
            dispatch(setOrder(enhanceOrder(d)))
        })
    }, [dispatch, orderApi])
}

export type AddProductAction = (productId: string, quantity: number) => void
export type ChangeProductQuantityAction = (
    productId: string,
    quantity: number
) => void
export type RemoveProductAction = (productId: string) => void
export type SubmitOrderAction = () => Promise<void>

type UseOrder = {
    isLoading: boolean
    order: Order | null
    methods: {
        addProduct: AddProductAction
        changeProductQuantity: ChangeProductQuantityAction
        removeProduct: RemoveProductAction
        submitOrder: SubmitOrderAction
    }
}

export const useOrder = (): UseOrder => {
    const dispatch = useAppDispatch()
    const order = useAppSelector(state => state.order)
    const { orderApi } = useAppContext()

    return {
        isLoading: !order,
        order: order,
        methods: {
            addProduct: (productId, quantity) => {
                const productData = dataProducts.find(p => p.id === productId)!
                dispatch(addProduct(productData, quantity))
            },
            changeProductQuantity: (productId, newQuantity) => {
                const productData = dataProducts.find(p => p.id === productId)!
                dispatch(changeProductQuantity(productData, newQuantity))
            },
            removeProduct: productId => dispatch(removeProduct(productId)),
            submitOrder: () =>
                orderApi.submitOrder(order).then(() => {
                    dispatch(clearOrder())
                })
        }
    }
}
