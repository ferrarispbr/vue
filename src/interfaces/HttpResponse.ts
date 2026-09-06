/*
    "T" siginifica que é genérico

*/


export interface HttpResponse<T> {
    data: T;
    status: number;
    headers: unknown;
}