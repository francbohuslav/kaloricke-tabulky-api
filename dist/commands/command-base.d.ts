import { Client } from "src/client";
export declare abstract class CommandBase {
    question: string;
    answer: string;
    protected parseFoodAndGrams(questionRest: string): {
        food: string;
        grams: number;
        gramsAreSpecified: boolean;
    };
    abstract parse(questionRest: string): void;
    abstract execute(client: Client, readOnly: boolean): Promise<string>;
}
