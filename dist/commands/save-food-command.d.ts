import { Client } from "src/client";
import { FoodCommandBase } from "./food-command-base";
export declare class SaveFoodCommand extends FoodCommandBase {
    static COMMAND: string;
    parse(questionRest: string): void;
    execute(client: Client, readOnly: boolean): Promise<string>;
    private getFoodtime;
}
