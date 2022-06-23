import { Client } from "src/client";
import { IFoodUsage } from "src/interfaces";
import { CommandBase } from "./command-base";

export class DeleteFoodCommand extends CommandBase {
    static COMMAND: string = "smaž poslední jídlo";

    parse(_questionRest: string): void {}

    async execute(client: Client): Promise<string> {
        const summary = await client.getDiary(new Date());
        const times = [...summary.times];
        times.reverse();
        let lastFood: IFoodUsage | undefined;
        for (const time of times) {
            if (time.foodstuff.length) {
                lastFood = time.foodstuff[time.foodstuff.length - 1];
                break;
            }
        }
        if (!lastFood) {
            return "Není co mazat, dnes jsi zatím bez jídla";
        }
        await client.deleteFoodUsage(lastFood.id);
        return `Smazáno ${lastFood.title}`;
    }
}
