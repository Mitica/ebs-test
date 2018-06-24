import { ApiUser } from "./api-user";
import { ApiArticle } from "./api-article";

require('es6-promise').polyfill();
require('isomorphic-fetch');

export type ApiClientOptions = {
    baseUrl: string
    token?: string
}

export class ApiClient {
    constructor(private options: ApiClientOptions) { }

    me() {
        return this.request<ApiUser>('/users/me', 'GET');
    }

    login(data: { email?: string, password?: string, facebookId?: string }) {
        return this.request<ApiUser>('/auth/login', 'POST', data);
    }

    register(data: { email?: string, password?: string, facebookId?: string, firstName?: string, lastName?: string }) {
        return this.request<ApiUser>('/auth/register', 'POST', data);
    }

    articles() {
        return this.request<ApiArticle>('/articles', 'GET');
    }

    createArticle(data: ApiArticle) {
        return this.request<ApiArticle>('/articles', 'POST', data);
    }

    voteArticle(data: { articleId: string, type: 'UP' | 'DOWN' }) {
        return this.request<{ counts: { countUpVotes: number, countDownVotes: number } }>(`/articles/${data.articleId}/vote`, 'POST', { type: data.type });
    }

    protected request<T>(path: string, method: string, data?: any): Promise<T> {
        const headers: { [index: string]: string } = {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        if (this.options.token) {
            headers['authorization'] = 'Bearer ' + this.options.token;
        }
        const url = `${this.options.baseUrl}${path}`;

        const options = {
            method,
            headers,
            body: data && JSON.stringify(data),
        }

        return fetch(url, options).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                var error = new Error(response.statusText || response.status && response.status.toString());
                return Promise.reject(error)
            }
        });
    }
}
