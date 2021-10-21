import { OldOrder, Order } from 'domain/order/types'
import { deEnhanceOrder } from 'domain/order/utils'
import { ApiClient } from 'api/apiClient'
import exampleOrder from 'example-orders/order3.json'

export default class OrderApi {
    private basePath = ''
    constructor(private api: ApiClient) {}

    // Real API call
    // getOrder = () => this.api.get<OldOrder>('order')
    getOrder = () =>
        new Promise<OldOrder>((resolve) => {
            setTimeout(() => {
                resolve(exampleOrder)
            }, 500)
        })

    // Real API call
    // submitOrder = () => this.api.post<boolean>('order', {data: deEnhanceOrder(order)})
    submitOrder = (order: Order) => {
        // For testing
        const success = true
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (success) {
                    console.log('SUBMIT', deEnhanceOrder(order))
                    resolve()
                } else {
                    reject({ message: 'Error' })
                }
            }, 500)
        })
    }
}
