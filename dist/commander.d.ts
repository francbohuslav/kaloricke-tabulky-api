import { Client } from "./client";
import { CommandBase } from "./commands/command-base";
export declare class Commander {
    private client;
    commandRegistry: {
        [command: string]: typeof CommandBase;
    };
    constructor(client: Client);
    execute(question: string, readOnly?: boolean): Promise<string>;
    private parseCommand;
}
