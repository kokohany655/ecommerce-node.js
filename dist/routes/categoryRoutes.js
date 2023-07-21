"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryService_1 = require("../service/categoryService");
const CategoryValidator_1 = require("../validator/CategoryValidator");
const router = express_1.default.Router();
router.route('/')
    .get(categoryService_1.getAllCategory)
    .post(CategoryValidator_1.createCategoryValidator, categoryService_1.createCategory);
router.route('/:id')
    .get(CategoryValidator_1.getCategoryValidator, categoryService_1.getCategoryById)
    .put(CategoryValidator_1.updateCategoryValidator, categoryService_1.updateCategory)
    .delete(CategoryValidator_1.deleteCategoryValidate, categoryService_1.deleteCategory);
exports.default = router;
