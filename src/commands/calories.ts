import { Client } from "src/client";
import { FoodCommandBase } from "./food-command-base";

export class CaloriesCommand extends FoodCommandBase {
    static COMMAND: string = "kalorie";

    parse(questionRest: string): void {
        this.parseFoodAndGrams(questionRest);
    }

    async execute(client: Client): Promise<string> {
        await this.executeInternal(client);
        const cals = Math.round((parseInt(this.food.value) / 100) * this.grams);
        return `Potravina ${this.food.title} ${this.getServingString()} má ${cals} kilokalorií`;
    }
}
