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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = require("../db/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
// FUNCTION TO REGISTER USER
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request: ", req);
    try {
        const { firstName, lastName, email, password } = req.body;
        // VALIDATING WHETHER ALL FIELDS ARE FILLED
        if ([firstName, lastName, email, password].some((field) => (field === null || field === void 0 ? void 0 : field.trim()) === "")) {
            console.error("ALL FIELDS ARE REQUIRED!");
            return res.status(400).json({
                success: false,
                message: "ALL FIELDS ARE REQUIRED!",
            });
        }
        // VALIDATING WEATHER USER ALREADY EXISTS OR NOT
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { email: email || undefined },
        });
        if (existingUser) {
            console.error("USER ALREADY EXISTS!");
            console.log(existingUser);
            return res.status(400).json({
                success: false,
                message: "USER ALREADY EXISTS!",
            });
        }
        // const avatarLocalPath = await req.files?.avatar[0]?.path;
        // HASHING AND SALTING PASSWORD
        const encPassword = yield bcrypt_1.default.hash(password, 10);
        // CREATING NEW USER
        const user = yield prisma_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: encPassword,
            },
        });
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("ERROR WHILE REGISTERING USER!", error);
        return res.status(400).json({
            success: false,
            message: "ERROR WHILE REGISTERING USER!",
            error,
        });
    }
});
exports.registerUser = registerUser;
// FUNCTION TO LOGIN USER
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.loginUser = loginUser;
// FUNCTION TO LOGOUT USER
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.logoutUser = logoutUser;
