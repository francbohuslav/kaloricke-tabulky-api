import { Client } from "src/client";
import { IDiarySummary } from "src/interfaces";

export abstract class CommandBase {
    question: string;
    answer: string;

    protected getBillanceString(summary: IDiarySummary): string {
        const totalCalories = summary.foodstuffEnergyTotal - summary.activityEnergyTotal;
        const percent = summary.items[0] ? summary.items[0]?.percent : "neznámo";
        return `${percent}% neboli ${totalCalories} kilokalorií`;
    }

    abstract parse(questionRest: string): void;
    abstract execute(client: Client, readOnly: boolean): Promise<string>;
}
