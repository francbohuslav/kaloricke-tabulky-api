import { Client } from "src/client";

export abstract class CommandBase {
    question: string;
    answer: string;

    protected parseFoodAndGrams(questionRest: string): { food: string; grams: number; gramsAreSpecified: boolean } {
        const match = questionRest.match(/(.*) (\d+)\s?g(ramů)?$/);
        if (match) {
            return {
                food: match[1],
                grams: parseInt(match[2]),
                gramsAreSpecified: true,
            };
        } else {
            return {
                food: questionRest.trim(),
                grams: 100,
                gramsAreSpecified: false,
            };
        }
    }

    abstract parse(questionRest: string): void;
    abstract execute(client: Client, readOnly: boolean): Promise<string>;
}
