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
exports.changePassword = exports.updateUser = exports.getUserProfile = exports.getUser = void 0;
const prisma_1 = require("../db/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
// FUNCTION TO GET USER DETAILS
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            return res.status(200).json({ success: true, user });
        }
        catch (error) {
            console.error("Error while fetching user:", error);
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    });
}
exports.getUser = getUser;
// FUNCTION TO GET OTHER USERS PROFILE
function getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userUid } = req.params;
            // Validate userUid
            if (!userUid || typeof userUid !== "string") {
                return res.status(400).json({ error: "Bad Request" });
            }
            // FIND THE USER BY userUid
            const user = yield prisma_1.prisma.user.findUnique({
                where: { userUid },
                select: {
                    id: true,
                    userUid: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true,
                    isOnline: true,
                },
            });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json({ success: true, user });
        }
        catch (error) {
            console.error("Error while fetching user profile:", error);
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    });
}
exports.getUserProfile = getUserProfile;
// FUNCTION TO UPDATE USER PROFILE
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        const updates = req.body;
        try {
            const updatedUser = yield prisma_1.prisma.user.update({
                where: { id: userId },
                data: updates,
            });
            if (!updatedUser) {
                return res
                    .status(404)
                    .json({ success: false, message: "User not found" });
            }
            console.log(`User ${userId} details updated:`, updates);
            return res.status(200).json({ success: true, user: updatedUser });
        }
        catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error. Please try again later.",
            });
        }
    });
}
exports.updateUser = updateUser;
// FUNCTION TO CHANGE USER PASSWORD
function changePassword(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { currentPassword, newPassword } = req.body;
        const userUid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userUid;
        const user = yield prisma_1.prisma.user.findUnique({
            where: { userUid },
        });
        const validPassword = yield bcrypt_1.default.compare(currentPassword, user === null || user === void 0 ? void 0 : user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }
        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
        try {
            yield prisma_1.prisma.user.update({
                where: { userUid },
                data: { password: hashedNewPassword },
            });
            return res.status(200).json({ success: true, message: "Password Changed" });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({ success: false, errors: e });
        }
    });
}
exports.changePassword = changePassword;
