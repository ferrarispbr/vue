import axios from 'axios';

import type {HttpClient}      from './HttpClient';
import type {HttpResponse}    from '@/interfaces/HttpResponse';
import {API_BASE_URL}         from '@/constants/constants';

const axiosInstance = axios.create({baseURL:API_BASE_URL});

/*
    axiosInstance define o servidor para esse caso esta na variavel API_BASE_URL
    get(url, params) define o recurso e os parâmetros.
    O Axios junta tudo para montar a URL final da requisição.
*/

export class AxiosHttpClient implements HttpClient 
{
    async get<T>(url:string,params?:Record<string, unknown>): Promise<HttpResponse<T>> 
    {
        /*
            params? -->>> indica parametro opcional
            Record<string, unknown>
                Objeto "params" composto por:
                                    chave: "string",
                                    valor: "unknown": de tipo desconhecido
        */

        const response = await axiosInstance.get(url,{params}); /*-- url é dada pela variavel PRODUTOS_ENDPOINT,  params = objeto --*/ 
        return {
            data:   response.data as T,
            status: response.status,
            headers:response.headers
        };
    }

    async post<T>(url:string,data?:unknown): Promise<HttpResponse<T>>
    {
        const response = await axiosInstance.post(url,data); // post() usa data diretamente porque o Axios espera o corpo da requisição.
        return {
            data: response.data as T,
            status: response.status,
            headers: response.headers
        };
    }

    async put<T>(url:string,data?:unknown): Promise<HttpResponse<T>>
    {
        const response = await axiosInstance.put(url, data);
        return {
            data: response.data as T,
            status: response.status,
            headers: response.headers
        };
    }

    async delete<T>(url: string,params?: Record<string, unknown>): Promise<HttpResponse<T>> 
    {
        const response = await axiosInstance.delete(url, {params});
        return {
                data: response.data as T,
                status: response.status,
                headers: response.headers
        };
    }
}