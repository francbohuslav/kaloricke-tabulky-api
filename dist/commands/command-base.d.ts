import { Client } from "src/client";
import { IDiarySummary } from "src/interfaces";
export declare abstract class CommandBase {
    question: string;
    answer: string;
    protected getBillanceString(summary: IDiarySummary): string;
    abstract parse(questionRest: string): void;
    abstract execute(client: Client, readOnly: boolean): Promise<string>;
}
