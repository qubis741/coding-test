import React, { ComponentType } from 'react'
import 'style/App.scss'
import { OrderDetailPage } from 'pages/OrderDetailPage'
import { useInitOrder } from 'domain/order/hooks'
import { Container } from 'react-bootstrap'

const App: ComponentType = () => {
    useInitOrder()
    return (
        <Container>
            <OrderDetailPage />
        </Container>
    )
}

export default App
