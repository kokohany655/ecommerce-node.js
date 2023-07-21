"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = exports.updateSubcategory = exports.createSubcategory = exports.getSubcategory = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("./validate");
const CategoryModel_1 = __importDefault(require("../model/CategoryModel"));
exports.getSubcategory = [
    (0, express_validator_1.check)('id')
        .isMongoId()
        .withMessage('invalid'),
    validate_1.validate
];
exports.createSubcategory = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('name is required')
        .isLength({ min: 2 }).withMessage('too short')
        .isLength({ max: 20 }).withMessage('too long'),
    (0, express_validator_1.check)('category').isMongoId().withMessage('is invalid id')
        .custom(cateogryId => {
        return CategoryModel_1.default.findById(cateogryId).then(category => {
            if (!category) {
                return Promise.reject(new Error(`this subCategory is not exist ${category}`));
            }
        });
    }),
    validate_1.validate
];
exports.updateSubcategory = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid id'),
    validate_1.validate
];
exports.deleteSubcategory = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid id'),
    validate_1.validate
];
