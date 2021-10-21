import React, { ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { order } from 'domain/order/reducers'
import { AppContextProvider, createAppContext } from 'context/AppContext'

function render(
    ui: any,
    {
        preloadedState = { order: null },
        store = configureStore({ reducer: { order: order }, preloadedState }),
        ...renderOptions
    }: any = {}
) {
    function Wrapper({ children }: { children: ReactNode }) {
        const ctx = createAppContext()
        return (
            <Provider store={store}>
                <AppContextProvider value={ctx}>{children}</AppContextProvider>
            </Provider>
        )
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
