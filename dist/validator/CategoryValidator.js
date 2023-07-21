"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryValidate = exports.updateCategoryValidator = exports.createCategoryValidator = exports.getCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("./validate");
exports.getCategoryValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId()
        .withMessage("Invalid ID"),
    validate_1.validate
];
exports.createCategoryValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("too short")
        .isLength({ max: 20 }).withMessage("too long"),
    validate_1.validate
];
exports.updateCategoryValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId()
        .withMessage("Invalid ID"),
    validate_1.validate
];
exports.deleteCategoryValidate = [
    (0, express_validator_1.check)('id')
        .isMongoId()
        .withMessage("invalid id"),
    validate_1.validate
];
