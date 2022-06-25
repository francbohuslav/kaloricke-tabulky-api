import { IDiaryDay, IDiarySummary, IFoodDefinition, IFoodDetail } from "./interfaces";
export declare class Client {
    baseURL: string;
    sessionId: string;
    login(email: string, password: string): Promise<void>;
    searchFood(query: string): Promise<IFoodDefinition[]>;
    getDiary(date: Date): Promise<IDiaryDay>;
    getSummary(date: Date): Promise<IDiarySummary>;
    getFood(foodId: string): Promise<IFoodDetail>;
    saveFood(food: IFoodDefinition, date: Date, grams: number, diaryTimeGuid: string): Promise<string>;
    deleteFoodUsage(id: string): Promise<void>;
    private getDate;
    private processCodeResponse;
    private twoLetters;
}
