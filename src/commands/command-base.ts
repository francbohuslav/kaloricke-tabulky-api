import { Client } from "src/client";

export abstract class CommandBase {
    question: string;
    answer: string;

    abstract parse(questionRest: string): void;
    abstract execute(client: Client): Promise<string>;
}
