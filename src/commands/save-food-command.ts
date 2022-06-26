import { Client } from "src/client";
import { FoodCommandBase } from "./food-command-base";

export class SaveFoodCommand extends FoodCommandBase {
    static COMMAND: string = "zapiš jídlo";

    parse(questionRest: string): void {
        this.parseFoodAndGrams(questionRest);
    }

    async execute(client: Client, readOnly: boolean): Promise<string> {
        await this.executeInternal(client);

        const now = new Date();

        if (!readOnly) {
            const message = await client.saveFood(this.food, now, this.grams, this.getFoodtime(now));
            console.log(message);
        }

        const summary = await client.getSummary(now);

        return `Zapsáno ${this.food.title} ${this.getServingString()}, celková bilance je ${this.getBillanceString(summary)}.`;
    }

    private getFoodtime(date: Date): string {
        if (date.getHours() < 9) return "1";
        if (date.getHours() < 12) return "2";
        if (date.getHours() < 15) return "3";
        if (date.getHours() < 18) return "4";
        if (date.getHours() < 21) return "5";
        return "6";
    }
}
