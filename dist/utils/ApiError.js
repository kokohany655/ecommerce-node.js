"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode,
            this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error',
            this.isOperional = true;
    }
}
exports.default = ApiError;
