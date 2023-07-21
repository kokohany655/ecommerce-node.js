"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const CategoryModel_1 = __importDefault(require("../model/CategoryModel"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const slugify_1 = __importDefault(require("slugify"));
exports.getAllCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const startIndex = (page - 1) * limit;
    const category = yield CategoryModel_1.default.find().skip(startIndex).limit(limit);
    res.status(200).send({ result: category.length, data: category });
}));
exports.getCategoryById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield CategoryModel_1.default.findById(req.params.id);
    if (!category) {
        return next(new ApiError_1.default('category not found', 404));
    }
    res.status(200).send({ date: category });
}));
exports.createCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const category = new CategoryModel_1.default({ name, slug: (0, slugify_1.default)(name) });
    yield category.save();
    res.status(201).send({ data: category });
}));
exports.updateCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const category = yield CategoryModel_1.default.findByIdAndUpdate({ _id: req.params.id }, { name, slug: (0, slugify_1.default)(name) }, { new: true });
    if (!category) {
        return next(new ApiError_1.default('category not found', 404));
    }
    res.status(200).send({ date: category });
}));
exports.deleteCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield CategoryModel_1.default.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(new ApiError_1.default('category not found', 404));
    }
    res.status(204).send('success');
}));
