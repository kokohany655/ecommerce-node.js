"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).send({
        message: err.message,
        error: process.env.NODE_ENV === "development" ? err : undefined,
        status: err.status,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
exports.default = globalError;
