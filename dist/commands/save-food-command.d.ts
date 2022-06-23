import { Client } from "src/client";
import { CommandBase } from "./command-base";
export declare class SaveFoodCommand extends CommandBase {
    static COMMAND: string;
    food: string;
    grams: number;
    parse(questionRest: string): void;
    execute(client: Client): Promise<string>;
    private getFoodtime;
}
