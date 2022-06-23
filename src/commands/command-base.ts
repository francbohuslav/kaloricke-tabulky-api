import { Client } from "src/client";

export abstract class CommandBase {
    question: string;
    answer: string;

    protected parseFoodAndGrams(questionRest: string): { food: string; grams: number } {
        const match = questionRest.match(/(.*) (\d+)\s?g(ramů)?$/);
        if (match) {
            return {
                food: match[1],
                grams: parseInt(match[2]),
            };
        } else {
            return {
                food: questionRest.trim(),
                grams: 100,
            };
        }
    }

    abstract parse(questionRest: string): void;
    abstract execute(client: Client): Promise<string>;
}
