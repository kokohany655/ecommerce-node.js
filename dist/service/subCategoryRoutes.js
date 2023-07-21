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
exports.deletesubCategory = exports.updateSubCategory = exports.createSubCategory = exports.getSubCateogryById = exports.getAllSubCategory = void 0;
const SubCategoryModel_1 = __importDefault(require("../model/SubCategoryModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const slugify_1 = __importDefault(require("slugify"));
exports.getAllSubCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const startIndex = (page - 1) * limit;
    const subcategory = yield SubCategoryModel_1.default.find().skip(startIndex).limit(limit);
    res.status(200).json({ result: subcategory.length, data: subcategory });
}));
exports.getSubCateogryById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategory = yield SubCategoryModel_1.default.findById(req.params.id);
    if (!subCategory) {
        return next(new ApiError_1.default('No subCategory found with that id', 404));
    }
    res.status(200).json({ data: subCategory });
}));
exports.createSubCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, name } = req.body;
    const subCategory = new SubCategoryModel_1.default({ name, category, slug: (0, slugify_1.default)(name) });
    yield subCategory.save();
    res.status(201).json({ data: subCategory });
}));
exports.updateSubCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, name } = req.body;
    const subCategory = yield SubCategoryModel_1.default.findByIdAndUpdate({ _id: req.params.id }, { name, category, slug: (0, slugify_1.default)(name) }, { new: true });
    if (!subCategory) {
        return next(new ApiError_1.default('No subCategory found with that id', 404));
    }
    res.status(200).json({ data: subCategory });
}));
exports.deletesubCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield SubCategoryModel_1.default.findByIdAndDelete(req.body.params);
    if (!subcategory) {
        return next(new ApiError_1.default('no subCateogry found with this id', 404));
    }
    res.status(204).send('success');
}));
