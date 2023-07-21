"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategoryRoutes_1 = require("../service/subCategoryRoutes");
const router = express_1.default.Router();
router.route('/')
    .get(subCategoryRoutes_1.getAllSubCategory)
    .post(subCategoryRoutes_1.createSubCategory);
router.route('/:id')
    .get(subCategoryRoutes_1.getSubCateogryById)
    .put(subCategoryRoutes_1.updateSubCategory)
    .delete(subCategoryRoutes_1.deletesubCategory);
exports.default = router;
