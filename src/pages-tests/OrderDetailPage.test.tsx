import React from 'react'
import { render, screen, fireEvent } from 'test/utils'
import App from 'App'
import { OldOrder } from 'domain/order/types'

// TODO api class mock, didnt have time
// jest.mock('domain/order/api');
//
// beforeEach(() => {
//     // Clear all instances and calls to constructor and all methods:
//     // @ts-ignore
//     OrderApi.mockClear();
// });

// Example used in dummy API calls
const testOrder: OldOrder = {
    id: '3',
    'customer-id': '3',
    items: [
        {
            'product-id': 'A101',
            quantity: '2',
            'unit-price': '9.75',
            total: '19.50'
        },
        {
            'product-id': 'A102',
            quantity: '1',
            'unit-price': '49.50',
            total: '49.50'
        }
    ],
    total: '69.00'
}

describe('OrderDetailPage', () => {
    test('show order summary when Order is loaded', async () => {
        render(<App />)

        expect(screen.queryByText(/SUBMIT/i)).not.toBeInTheDocument()
        expect(await screen.findByText(/SUBMIT/i)).toBeInTheDocument()
        expect(await screen.findByText(/Total: 69.00/i)).toBeInTheDocument()
    })

    test('on product click that is not in order, product is added with quantity of 1', async () => {
        render(<App />)
        expect(await screen.findByText(/SUBMIT/i)).toBeInTheDocument()
        fireEvent.click(screen.getByLabelText('product-B101-add'))
        expect(await screen.getByLabelText('product-B101-row')).toBeInTheDocument()
        expect(screen.queryByText(/Total: 69.00/i)).not.toBeInTheDocument()
    })

    test('on product click that is in order, product has increased quantity by 1', async () => {
        render(<App />)
        expect(await screen.findByText(/SUBMIT/i)).toBeInTheDocument()
        fireEvent.click(await screen.findByLabelText('product-A101-add'))


        expect(screen.getByDisplayValue('3')).toHaveAttribute(
            'aria-label',
            'product-A101-quantity'
        )
        expect(screen.queryByText(/Total: 69.00/i)).not.toBeInTheDocument()
    })

    test('product quantity is change, order is recalculated', async () => {
        render(<App />)

        fireEvent.change(
            await screen.findByLabelText('product-A101-quantity'),
            { target: { value: '9' } }
        )

        expect(screen.queryByText(/Total: 69.00/i)).not.toBeInTheDocument()
    })

    test('clicked on REMOVE button of product, product is removed from order', async () => {
        render(<App />)

        fireEvent.click(await screen.findByLabelText('product-A101-remove'))

        expect(
            screen.queryByLabelText('product-A101-remove')
        ).not.toBeInTheDocument()
        expect(screen.queryByText(/Total: 69.00/i)).not.toBeInTheDocument()
    })

    test('order is submitted successfully', async () => {
        render(<App />)

        fireEvent.click(await screen.findByText('SUBMIT'))

        expect(
            await screen.findByText('Order was submitted!')
        ).toBeInTheDocument()
    })
})
