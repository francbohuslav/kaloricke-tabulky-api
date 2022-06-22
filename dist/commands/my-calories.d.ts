import { Client } from "src/client";
import { CommandBase } from "./command-base";
export declare class MyCaloriesCommand extends CommandBase {
    static COMMAND: string;
    parse(_questionRest: string): void;
    execute(client: Client): Promise<string>;
}
