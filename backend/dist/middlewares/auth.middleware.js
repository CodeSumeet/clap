"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const prisma_1 = require("../db/prisma");
function isAuthenticated(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ error: "Unauthorized - No Token Provided" });
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWTSECRETKEY);
            const user = yield prisma_1.prisma.user.findUnique({
                where: { userUid: decodedToken.id },
                select: {
                    id: true,
                    userUid: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true,
                    accessToken: true,
                    refreshToken: true,
                    isOnline: true,
                    inboxParticipants: true,
                    group: true,
                    groupParticipants: true,
                    messagesSent: true,
                    messagesReceived: true,
                },
            });
            if (!user) {
                return res.status(401).json({ error: "Unauthorized - Invalid Token" });
            }
            req.user = user;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                return res.status(401).json({ error: "Unauthorized - Token expired" });
            }
            else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                return res.status(401).json({ error: "Unauthorized - Invalid Token" });
            }
            else {
                // Log the error but don't send it to the client
                console.error("ERROR WHILE AUTHENTICATING USER: ", error);
                return res.status(500).json({
                    success: false,
                    message: "INTERNAL SERVER ERROR!!",
                });
            }
        }
    });
}
exports.isAuthenticated = isAuthenticated;
