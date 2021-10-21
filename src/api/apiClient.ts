import { AxiosInstance } from 'axios'

export type ApiOpOpts = {
    data?: any
    queryParams?: Record<string, string | number | null | boolean>
}
export class ApiClient {
    private basePath: string

    constructor(private http: AxiosInstance) {
        this.basePath = ''
    }

    get = <T>(path: string, opts: ApiOpOpts = {}): Promise<T> => {
        return this.http
            .request<T>({
                method: 'GET',
                url: this.basePath + path,
                params: opts.queryParams || {}
            })
            .then(r => r.data)
    }

    post = <T>(path: string, opts: ApiOpOpts = { data: {} }): Promise<T> => {
        return this.http
            .request<T>({
                method: 'POST',
                url: this.basePath + path,
                params: opts.queryParams || {},
                data: opts.data
            })
            .then(r => r.data)
    }
}
