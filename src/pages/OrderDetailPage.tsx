import React, { ComponentType, useState } from 'react'
import { ProductList } from 'domain/order/types'
import {
    ChangeProductQuantityAction,
    RemoveProductAction,
    SubmitOrderAction,
    useOrder
} from 'domain/order/hooks'
import { ProductGrid } from 'domain/product/components/ProductGrid'
import { Alert, Button, Col, Row, Spinner } from 'react-bootstrap'

type OrderProductsProps = {
    products: ProductList
    onQuantityChange: ChangeProductQuantityAction
    onRemove: RemoveProductAction
}

const OrderProducts: ComponentType<OrderProductsProps> = ({
    products,
    onQuantityChange,
    onRemove
}) => {
    return (
        <div>
            {Object.values(products).map(p => {
                return (
                    <Row key={p.id} className="mb-2" aria-label={`product-${p.id}-row`}>
                        <Col>
                            <b>{p.description}</b>
                        </Col>
                        <Col>
                            <input
                                type="number"
                                value={p.quantity}
                                aria-label={`product-${p.id}-quantity`}
                                onChange={e => {
                                    const val = parseInt(e.target.value)
                                    if (val > 0) onQuantityChange(p.id, val)
                                }}
                                min="1"
                            />
                        </Col>
                        <Col>Unit price: {p.price.toFixed(2)}</Col>
                        <Col>Total price: {p.total.toFixed(2)}</Col>
                        <Col sm={{ span: 2 }}>
                            <Button
                                variant="danger"
                                onClick={() => onRemove(p.id)}
                                aria-label={`product-${p.id}-remove`}
                            >
                                REMOVE
                            </Button>
                        </Col>
                    </Row>
                )
            })}
        </div>
    )
}

const useOrderSubmit = () => {
    const [{ success, error, submitting }, setSubmitResult] = useState({
        submitting: false,
        error: false,
        success: false
    })
    const submitAction = (submit: SubmitOrderAction) => {
        setSubmitResult({
            submitting: true,
            success: false,
            error: false
        })
        submit()
            .then(() =>
                setSubmitResult({
                    submitting: false,
                    success: true,
                    error: false
                })
            )
            .catch(() =>
                setSubmitResult({
                    submitting: false,
                    success: false,
                    error: true
                })
            )
    }
    return {
        submitting,
        success,
        error,
        submitAction
    }
}

export const OrderDetailPage: ComponentType = () => {
    const {
        order,
        isLoading,
        methods: { changeProductQuantity, removeProduct, submitOrder }
    } = useOrder()
    const { submitting, success, error, submitAction } = useOrderSubmit()

    return (
        <div>
            <h1>Order Detail</h1>
            {isLoading && <Spinner animation="border" />}
            {order && (
                <div>
                    <OrderProducts
                        products={order.items}
                        onQuantityChange={changeProductQuantity}
                        onRemove={removeProduct}
                    />
                    <Row className="mb-2">
                        <Col sm={{ offset: 8 }}>
                            <b>Total: {order.total.toFixed(2)}</b>
                        </Col>
                        <Col className="submit-panel">
                            {submitting && <Spinner animation="border" />}
                            {!submitting && (
                                <Button
                                    disabled={order.total === 0}
                                    onClick={() => submitAction(submitOrder)}
                                >
                                    SUBMIT
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <div>
                        {success && <Alert variant="success">Order was submitted!</Alert>}
                        {error && <Alert variant="danger">Error occurred during order submission</Alert>}
                    </div>
                </div>
            )}
            <ProductGrid />
        </div>
    )
}
