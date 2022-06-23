import { Client } from "src/client";
import { CommandBase } from "./command-base";

export class SaveFoodCommand extends CommandBase {
    static COMMAND: string = "zapiš jídlo";
    food: string;
    grams: number;

    parse(questionRest: string): void {
        const { food, grams } = this.parseFoodAndGrams(questionRest);
        this.food = food;
        this.grams = grams;
    }

    async execute(client: Client): Promise<string> {
        const foods = await client.searchFood(this.food);
        if (foods.length === 0) {
            return `Potravina ${this.food} nenanezena`;
        }
        const now = new Date();
        const message = await client.saveFood(foods[0], now, this.grams, this.getFoodtime(now));
        console.log(message);
        return `Zapsáno ${foods[0].title} ${this.grams} gramů`;
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
