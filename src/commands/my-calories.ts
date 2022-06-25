import { Client } from "src/client";
import { CommandBase } from "./command-base";

export class MyCaloriesCommand extends CommandBase {
    static COMMAND: string = "moje kalorie";

    parse(_questionRest: string): void {}

    async execute(client: Client): Promise<string> {
        const summary = await client.getSummary(new Date());
        const totalCalories = summary.foodstuffEnergyTotal - summary.activityEnergyTotal;
        const percent = summary.items[0] ? summary.items[0]?.percent : "neznámo";
        return `Tvoje bilance je ${percent}% neboli ${totalCalories} kilokalorií`;
    }
}
