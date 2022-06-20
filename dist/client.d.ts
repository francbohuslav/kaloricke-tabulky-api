import { IDiaryDay, IFoodDefinition } from "./interfaces";
export default class Client {
    baseURL: string;
    sessionId: string;
    login(email: string, hashedPassword: string): Promise<void>;
    searchFood(query: string): Promise<IFoodDefinition[]>;
    getDiary(date: Date): Promise<IDiaryDay>;
    private processCodeResponse;
    private twoLetters;
}
