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
// src/index.ts
const express_1 = __importDefault(require("express"));
const firebaseAdmin_1 = __importDefault(require("./firebaseAdmin"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use(express_1.default.json());
// Define the /verify-token endpoint
app.post("/verify-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        const decodedToken = yield firebaseAdmin_1.default.auth().verifyIdToken(token !== null && token !== void 0 ? token : "");
        res.json({ token: decodedToken });
    }
    catch (error) {
        console.error("Error verifying token:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
