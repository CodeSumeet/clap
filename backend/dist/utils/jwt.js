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
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWTSECRETKEY;
// FUNCTION TO GENERATE ACCESS TOKEN
function generateAccessToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = {
                id: user.userUid,
                email: user.email,
            };
            const accessToken = yield jsonwebtoken_1.default.sign(payload, secretKey, {
                expiresIn: "15m",
            });
            return accessToken;
        }
        catch (error) {
            console.error("ERROR GENERATING ACCESS TOKEN: ", error);
            return "";
        }
    });
}
exports.generateAccessToken = generateAccessToken;
// FUNCTION TO GENERATE REFRESH TOKEN
function generateRefreshToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = {
                id: user.userUid,
                email: user.email,
            };
            const refreshToken = yield jsonwebtoken_1.default.sign(payload, secretKey, {
                expiresIn: "7d",
            });
            return refreshToken;
        }
        catch (error) {
            console.error("ERROR GENERATING REFRESH TOKEN: ", error);
            return "";
        }
    });
}
exports.generateRefreshToken = generateRefreshToken;
