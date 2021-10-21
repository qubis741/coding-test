import React, { useContext } from 'react'
import Axios, { AxiosInstance } from 'axios'
import { ApiClient } from 'api/apiClient'
import OrderApi from 'domain/order/api'

export type AppContextType = {
    api: ApiClient
    orderApi: OrderApi
    http: AxiosInstance
}

export const createAppContext = () => {
    const http = Axios.create()
    const api = new ApiClient(http)

    return {
        api,
        orderApi: new OrderApi(api),
        http
    }
}

export const createAppContextApi = () => {
    // Context is created immediately on App init, so no point in declaring type as null
    // @ts-ignore
    const Context = React.createContext<AppContextType>(null)

    return {
        AppContextProvider: Context.Provider,
        useAppContext: () => useContext(Context)
    }
}

export const { AppContextProvider, useAppContext } = createAppContextApi()
