export interface Error {
    message?: string,
    statusCode?:number,
    status?: string,
    stack?: string,
    name?:string
}