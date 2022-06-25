import { Client } from "src/client";
import { CommandBase } from "./command-base";
export declare class SaveFoodCommand extends CommandBase {
    static COMMAND: string;
    food: string;
    grams: number;
    gramsAreSpecified: boolean;
    parse(questionRest: string): void;
    execute(client: Client, readOnly: boolean): Promise<string>;
    private getFoodtime;
}
