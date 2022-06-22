import { IDiaryDay, IDiarySummary, IFoodDefinition } from "./interfaces";
export declare class Client {
    baseURL: string;
    sessionId: string;
    login(email: string, password: string): Promise<void>;
    searchFood(query: string): Promise<IFoodDefinition[]>;
    getDiary(date: Date): Promise<IDiaryDay>;
    getSummary(date: Date): Promise<IDiarySummary>;
    private processCodeResponse;
    private twoLetters;
}
