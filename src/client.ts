import axios from "axios";
import { ICodeResponse, IDiaryDay, IDiarySummary, IFoodDefinition, ILoginResponse } from "./interfaces";
import { KalTabError } from "./kal-tab-error";
var md5 = require("md5");

export class Client {
    baseURL: string = "https://www.kaloricketabulky.cz";
    sessionId: string;

    public async login(email: string, password: string): Promise<void> {
        const response = await axios.post<ILoginResponse>(this.baseURL + "/login/create?format=json", {
            email,
            password: md5(password),
        });
        this.processCodeResponse(response.data);
        const cookie = response.headers["set-cookie"]?.find((cookie) => cookie.startsWith("JSESSIONID="));
        const match = cookie?.match(/JSESSIONID=(\S+);/);
        if (!match) {
            throw new KalTabError("Can not obtain session cookie from response", response.data);
        }
        const sessionId = match[1];
        this.sessionId = sessionId;
    }

    public async searchFood(query: string): Promise<IFoodDefinition[]> {
        const response = await axios.get<IFoodDefinition[]>(this.baseURL + "/autocomplete/foodstuff-activity-meal", {
            params: {
                format: "json",
                query,
            },
        });
        return response.data;
    }

    public async getDiary(date: Date): Promise<IDiaryDay> {
        const dateStr = this.twoLetters(date.getDate()) + "." + this.twoLetters(date.getMonth() + 1) + "." + date.getFullYear();
        const response = await axios.get<ICodeResponse<IDiaryDay>>(this.baseURL + `/user/diary/${dateStr}/get`, {
            params: {
                format: "json",
            },
            headers: {
                Cookie: "JSESSIONID=" + this.sessionId,
            },
        });
        this.processCodeResponse(response.data);
        return response.data.data;
    }

    public async getSummary(date: Date): Promise<IDiarySummary> {
        const dateStr = this.twoLetters(date.getDate()) + "." + this.twoLetters(date.getMonth() + 1) + "." + date.getFullYear();
        const response = await axios.get<ICodeResponse<IDiarySummary>>(this.baseURL + `/user/diary/summary/${dateStr}/get`, {
            params: {
                format: "json",
            },
            headers: {
                Cookie: "JSESSIONID=" + this.sessionId,
            },
        });
        this.processCodeResponse(response.data);
        return response.data.data;
    }

    private processCodeResponse<T>(data: ICodeResponse<T>) {
        if (data.code === undefined) {
            throw new KalTabError("Wrong data", data);
        }
        if (data.code !== 0) {
            throw new KalTabError(data.message, data);
        }
    }

    private twoLetters(number: number) {
        return (number + "").padStart(2, "0");
    }
}
