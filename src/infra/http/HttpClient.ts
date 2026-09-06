/*
    ele faz parte da infraestrutura da aplicação.
    não representa um produto.
    não representa um filtro.
    aqui ele representa somente uma forma de comunicação HTTP

*/

import type { HttpResponse } from '@/interfaces/HttpResponse';

export interface HttpClient {

    get<T>( url: string, params?: Record<string, unknown>): Promise<HttpResponse<T>>;

    post<T>(url: string,data?: unknown): Promise<HttpResponse<T>>;

    put<T>(url: string,data?: unknown): Promise<HttpResponse<T>>;

    delete<T>(url: string,params?: Record<string, unknown>): Promise<HttpResponse<T>>;
    
}