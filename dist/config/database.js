"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database = () => {
    mongoose_1.default.connect(`${process.env.DB_URI}`).then(con => {
        console.log(`Datebase Connecting...${con.connection.host}`);
    }).catch(err => {
        console.log(`Database Error:${err}`);
        process.exit(1);
    });
};
exports.default = database;
