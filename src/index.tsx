import React from 'react'
import 'style/index.css'
import { Provider } from 'react-redux'
import { store } from 'store'
import ReactDOM from 'react-dom'
import App from 'App'
import { AppContextProvider, createAppContext } from 'context/AppContext'

const ctx = createAppContext()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppContextProvider value={ctx}>
                <App />
            </AppContextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
