class ApiError extends Error{
    statusCode:number
    status:string
    isOperional:boolean

    public constructor(message:string ,statusCode:number){
        super(message)
        this.statusCode = statusCode,
        this.status = `${statusCode}`.startsWith('4')?'fail' : 'error',
        this.isOperional = true
    }
}

export default ApiError