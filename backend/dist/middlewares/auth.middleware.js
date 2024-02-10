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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuthenticated(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authenticatedReq = req; // Type assertion
            const token = (_a = authenticatedReq.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ error: "Unauthorized - No Token Provided" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWTSECRETKEY);
            if (!decoded) {
                return res.status(401).json({ error: "Unauthorized - Invalid Token" });
            }
            next();
        }
        catch (error) {
            console.log("ERROR WHILE AUTHENTICATING USER: ", error);
            return res.status(500).json({
                success: false,
                message: "INTERNAL SERVER ERROR!!",
                error,
            });
        }
    });
}
exports.isAuthenticated = isAuthenticated;
