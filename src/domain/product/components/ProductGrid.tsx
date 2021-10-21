import dataProducts from 'data/products.json'
import React, { ComponentType } from 'react'
import { useOrder } from 'domain/order/hooks'

export const ProductGrid: ComponentType = () => {
    const {
        methods: { addProduct }
    } = useOrder()
    return (
        <div className="all-products">
            <h2>All Products</h2>
            <div className="grid">
                {dataProducts.map(dp => (
                    <button
                        aria-label={`product-${dp.id}-add`}
                        key={dp.id}
                        onClick={() => addProduct(dp.id, 1)}
                    >
                        {`${dp.description} - ${dp.price}`}
                    </button>
                ))}
            </div>
        </div>
    )
}
