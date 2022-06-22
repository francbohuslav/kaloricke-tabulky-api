import { Client } from "./client";
import { CaloriesCommand } from "./commands/calories";
import { CommandBase } from "./commands/command-base";
import { MyCaloriesCommand } from "./commands/my-calories";

export class Commander {
    commandRegistry: { [command: string]: typeof CommandBase } = {
        [CaloriesCommand.COMMAND]: CaloriesCommand,
        [MyCaloriesCommand.COMMAND]: MyCaloriesCommand,
    };

    constructor(private client: Client) {}

    public async execute(question: string): Promise<string> {
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
        const answer = await command.execute(this.client);
        return answer;
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