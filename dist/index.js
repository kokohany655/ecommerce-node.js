"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./config/database"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const subcategoryRoutes_1 = __importDefault(require("./routes/subcategoryRoutes"));
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const globalErrorMiddleware_1 = __importDefault(require("./middleware/globalErrorMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
//datebase
(0, database_1.default)();
//middleware to i can know request status
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)('dev'));
    console.log(`mood :${process.env.NODE_ENV} `);
}
//routes
app.use('/api/v1/categories', categoryRoutes_1.default);
app.use('/api/v1/subcategories', subcategoryRoutes_1.default);
//middle ware for catching error wrong route
app.all('*', (req, res, next) => {
    next(new ApiError_1.default(`can not find this route ${req.originalUrl}`, 400));
});
// Error middleware to catch error 
app.use(globalErrorMiddleware_1.default);
// listening port
const server = app.listen(port, () => { console.log(`Server is listening on port ${8000} ....`); });
// handle reection outside express
process.on("unhandledRejection", (err) => {
    console.error(`unhandle rejection Errors : ${err.name} | ${err.message}`);
    server.close(() => {
        console.log('shutting down..');
        process.exit(1);
    });
});
