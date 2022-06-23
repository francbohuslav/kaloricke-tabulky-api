import { Client } from "src/client";
export declare abstract class CommandBase {
    question: string;
    answer: string;
    protected parseFoodAndGrams(questionRest: string): {
        food: string;
        grams: number;
    };
    abstract parse(questionRest: string): void;
    abstract execute(client: Client): Promise<string>;
}
