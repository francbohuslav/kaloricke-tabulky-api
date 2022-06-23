import { Client } from "src/client";
import { CommandBase } from "./command-base";

export class CaloriesCommand extends CommandBase {
    static COMMAND: string = "kalorie";
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
        const cals = Math.round((parseInt(foods[0].value) / 100) * this.grams);
        return `Potravina ${foods[0].title} má ${cals} kilokalorií`;
    }
}
