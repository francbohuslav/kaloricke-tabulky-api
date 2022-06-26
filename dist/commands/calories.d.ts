import { Client } from "src/client";
import { FoodCommandBase } from "./food-command-base";
export declare class CaloriesCommand extends FoodCommandBase {
    static COMMAND: string;
    parse(questionRest: string): void;
    execute(client: Client): Promise<string>;
}
