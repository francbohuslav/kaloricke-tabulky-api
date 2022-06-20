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
const axios_1 = __importDefault(require("axios"));
const kal_tab_error_1 = require("./kal-tab-error");
class Client {
    constructor() {
        this.baseURL = "https://www.kaloricketabulky.cz";
    }
    login(email, hashedPassword) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(this.baseURL + "/login/create?format=json", {
                email,
                password: hashedPassword,
            });
            this.processCodeResponse(response.data);
            const cookie = (_a = response.headers["set-cookie"]) === null || _a === void 0 ? void 0 : _a.find((cookie) => cookie.startsWith("JSESSIONID="));
            const match = cookie === null || cookie === void 0 ? void 0 : cookie.match(/JSESSIONID=(\S+);/);
            if (!match) {
                throw new kal_tab_error_1.KalTabError("Can not obtain session cookie from response", response.data);
            }
            const sessionId = match[1];
            this.sessionId = sessionId;
        });
    }
    searchFood(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.baseURL + "/autocomplete/foodstuff-activity-meal", {
                params: {
                    format: "json",
                    query,
                },
            });
            return response.data;
        });
    }
    getDiary(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateStr = this.twoLetters(date.getDate()) + "." + this.twoLetters(date.getMonth() + 1) + "." + date.getFullYear();
            const response = yield axios_1.default.get(this.baseURL + `/user/diary/${dateStr}/get`, {
                params: {
                    format: "json",
                },
                headers: {
                    Cookie: "JSESSIONID=" + this.sessionId,
                },
            });
            this.processCodeResponse(response.data);
            return response.data.data;
        });
    }
    processCodeResponse(data) {
        if (data.code === undefined) {
            throw new kal_tab_error_1.KalTabError("Wrong data", data);
        }
        if (data.code !== 0) {
            throw new kal_tab_error_1.KalTabError(data.message, data);
        }
    }
    twoLetters(number) {
        return (number + "").padStart(2, "0");
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map