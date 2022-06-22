import { Client } from "src/client";
import { CommandBase } from "./command-base";

export class CaloriesCommand extends CommandBase {
    static COMMAND: string = "kalorie";
    food: string;
    grams: number;

    parse(questionRest: string): void {
        const match = questionRest.match(/(.*) (\d+) gramů$/);
        console.log(match);
        if (match) {
            this.food = match[1];
            this.grams = parseInt(match[2]);
        } else {
            this.food = questionRest.trim();
            this.grams = 100;
        }
    }

    async execute(client: Client): Promise<string> {
        const foods = await client.searchFood(this.food);
        if (foods.length === 0) {
            return `Potravina ${this.food} nenanezena`;
        }
        const cals = Math.round((parseInt(foods[0].value) / 100) * this.grams);
        return `Potravina ${foods[0].title} má ${cals} kalorií`;
    }
}
