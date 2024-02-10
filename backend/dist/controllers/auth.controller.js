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
exports.resetPassword = exports.refreshToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../db/prisma");
const cloudinary_1 = require("../utils/cloudinary");
const jwt_1 = require("../utils/jwt");
// FUNCTION TO REGISTER USER
function registerUser(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstName, lastName, email, password } = req.body;
            // VALIDATE INPUT DATA
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
                return res.status(409).json({
                    success: false,
                    message: "USER ALREADY EXISTS!",
                });
            }
            const avatarLocalPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            if (!avatarLocalPath) {
                return res.status(400).json({
                    success: false,
                    message: "AVATAR FILE IS REQUIRED!",
                });
            }
            const avatar = yield (0, cloudinary_1.uploadOnCloudinary)(avatarLocalPath);
            // HASHING AND SALTING PASSWORD
            const encPassword = yield bcrypt_1.default.hash(password, 10);
            // CREATING NEW USER
            const user = yield prisma_1.prisma.user.create({
                data: {
                    avatar: avatar === null || avatar === void 0 ? void 0 : avatar.url,
                    firstName,
                    lastName,
                    email,
                    password: encPassword,
                },
            });
            // GENERATING ACCESS AND REFRFESH TOKENS
            const accessToken = yield (0, jwt_1.generateAccessToken)(user);
            const refreshToken = yield (0, jwt_1.generateRefreshToken)(user);
            return res.status(200).json({
                success: true,
                message: "USER REGISTERED SUCCESSFULLY!",
                user: user,
                accessToken,
                refreshToken,
            });
        }
        catch (error) {
            console.error("ERROR WHILE REGISTERING USER!", error);
            return res.status(400).json({
                success: false,
                message: "INTERNAL SERVER ERROR!!",
                error,
            });
        }
    });
}
exports.registerUser = registerUser;
// FUNCTION TO LOGIN USER
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // VALIDATE INPUT DATA
            if ([email, password].some((field) => (field === null || field === void 0 ? void 0 : field.trim()) === "")) {
                console.error("ALL FIELDS ARE REQUIRED!");
                return res.status(400).json({
                    success: false,
                    message: "ALL FIELDS ARE REQUIRED!",
                });
            }
            console.log("Email, Password", email, " ", password);
            // VALIDATING WHETHER USER EXISTS OR NOT
            const user = yield prisma_1.prisma.user.findUnique({
                where: { email: email || undefined },
            });
            if (!user) {
                console.error("USER NOT FOUND!");
                return res.status(404).json({
                    success: false,
                    message: "USER NOT FOUND!",
                });
            }
            //  VERIFYING THE PASSWORD
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                console.error("INVALID PASSWORD!");
                return res.status(401).json({
                    success: false,
                    message: "INVALID PASSWORD!",
                });
            }
            // GENERATING ACCESS AND REFRESH TOKENS
            const accessToken = yield (0, jwt_1.generateAccessToken)(user);
            const refreshToken = yield (0, jwt_1.generateRefreshToken)(user);
            if (!accessToken || !refreshToken) {
                return res.send(300).json({
                    success: false,
                    message: "SOMETHING WENT WRONG WITH TOKEN GENERATION!",
                });
            }
            return res.status(200).json({
                success: true,
                message: "USER LOGGED IN SUCCESSFULLY!",
                user,
                accessToken,
                refreshToken,
            });
        }
        catch (error) {
            console.error("ERROR WHILE LOGGING IN USER!", error);
            return res.status(400).json({
                success: false,
                message: "INTERNAL SERVER ERROR!!",
                error,
            });
        }
    });
}
exports.loginUser = loginUser;
// FUNCTION TO LOGOUT USER
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({
            success: true,
            message: "USER LOGGED OUT SUCCESSFULLY!",
        });
    });
}
exports.logoutUser = logoutUser;
// FUNCTION TO REFRESH THE ACCESS TOKEN
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.refreshToken = refreshToken;
// FUNCTION TO UPDATE USER PASSWORD
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.resetPassword = resetPassword;
