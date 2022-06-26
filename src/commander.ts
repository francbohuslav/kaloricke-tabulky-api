import { Client } from "./client";
import { CaloriesCommand } from "./commands/calories";
import { CommandBase } from "./commands/command-base";
import { DeleteFoodCommand } from "./commands/delete-food-command";
import { MyCaloriesCommand } from "./commands/my-calories";
import { SaveFoodCommand } from "./commands/save-food-command";

export class Commander {
    commandRegistry: { [command: string]: typeof CommandBase } = {
        [CaloriesCommand.COMMAND]: CaloriesCommand,
        [MyCaloriesCommand.COMMAND]: MyCaloriesCommand,
        [SaveFoodCommand.COMMAND]: SaveFoodCommand,
        [DeleteFoodCommand.COMMAND]: DeleteFoodCommand,
    };

    constructor(private client: Client) {}

    public async execute(question: string, readOnly: boolean = false): Promise<string> {
        let command: CommandBase;
        let questionRest = "";
        try {
            [command, questionRest] = this.parseCommand(question);
        } catch (ex) {
            return "Neznámý příkaz";
        }
        try {
            command.parse(questionRest);
        } catch (ex) {
            return ex.message;
        }
        try {
            return await command.execute(this.client, readOnly);
        } catch (ex) {
            return ex.message;
        }
    }

    private parseCommand(question: string): [CommandBase, string] {
        const commands = Object.keys(this.commandRegistry);

        for (const command of commands) {
            if (question.startsWith(command)) {
                const rest = question.substring(command.length).trim();
                const clazz = this.commandRegistry[command] as any;
                const commandObj = new clazz();
                return [commandObj, rest];
            }
        }
        throw new Error("Unknown command");
    }
}
