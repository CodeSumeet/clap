"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const db_1 = require("./db");
dotenv_1.default.config({
    path: "./.env",
});
const PORT = process.env.PORT || 8001;
(0, db_1.connectDB)()
    .then(() => {
    app_1.app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });
})
    .catch((error) => {
    console.error("DATABASE CONNECTION ERROR", error);
});
