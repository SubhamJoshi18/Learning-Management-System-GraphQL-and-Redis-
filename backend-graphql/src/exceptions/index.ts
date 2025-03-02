import httpStatusCode from 'http-status-codes'


class AppError extends Error {

    public message : string
    public status : string
    public statusCode : number

    constructor(message : string,statusCode:number){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.status = this.statusCode.toString().startsWith('4') ? 'Client Error' : 'Server Error' 
        this.name = 'App Error'
        Object.setPrototypeOf(this,new.target.prototype)
    }


    public getStatusCode() : number {
        return this.statusCode
    }

    public getMessage () : string {
        return this.message
    }
}


class DatabaseError extends AppError {
    constructor(message : string,statusCode : number= httpStatusCode.CONFLICT) {
        super(message,statusCode)
        this.name = 'Database Error'
    }
}


class ValidationError extends AppError {
    constructor(message : string,statusCode : number = httpStatusCode.BAD_REQUEST) {
        super(message,statusCode)
        this.name = 'Validation Error'
    }
}


class BadGatewayError extends AppError {
    constructor(message : string,statusCode : number = httpStatusCode.BAD_GATEWAY) {
        super(message,statusCode)
        this.name = 'BadGateway Error'
    }
}



export {
    DatabaseError,
    ValidationError,
    BadGatewayError
}