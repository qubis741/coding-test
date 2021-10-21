const testOrder = {
    id: '1',
    'customer-id': '1',
    items: [
        {
            'product-id': 'B102',
            quantity: '10',
            'unit-price': '4.99',
            total: '49.90'
        }
    ],
    total: '49.90'
}

const mockGetOrder = jest
    .fn()
    .mockImplementation(() => Promise.resolve(testOrder))
const mock = jest.mock('domain/order/api', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { getOrder: mockGetOrder }
        })
    }
})

export default mock
