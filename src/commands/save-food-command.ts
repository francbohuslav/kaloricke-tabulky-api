import { Client } from "src/client";
import { IUnitOption } from "src/interfaces";
import { CommandBase } from "./command-base";

export class SaveFoodCommand extends CommandBase {
    static COMMAND: string = "zapiš jídlo";

    food: string;
    grams: number;
    gramsAreSpecified: boolean;

    parse(questionRest: string): void {
        const { food, grams, gramsAreSpecified } = this.parseFoodAndGrams(questionRest);
        this.food = food;
        this.grams = grams;
        this.gramsAreSpecified = gramsAreSpecified;
    }

    async execute(client: Client, readOnly: boolean): Promise<string> {
        const foods = await client.searchFood(this.food);
        if (foods.length === 0) {
            return `Potravina ${this.food} nenanezena`;
        }
        const food = foods[0];
        const foodDetail = await client.getFood(food.id);
        let serving: IUnitOption | undefined;
        if (!this.gramsAreSpecified) {
            const specifiedServings = foodDetail.unitOptions.filter((uo) => uo.multiplier != 1 && !(uo.multiplier == 100 && uo.title == "100 g"));
            if (specifiedServings.length == 0) {
                return "Nedokážu určit vhodnou gramáž. Zkus to znova s gramy.";
            }
            serving = specifiedServings[0];
            this.grams = serving.multiplier;
        }

        const now = new Date();

        if (!readOnly) {
            const message = await client.saveFood(food, now, this.grams, this.getFoodtime(now));
            console.log(message);
        }

        let servingString: string = "";
        if (this.gramsAreSpecified) {
            servingString = `${this.grams} gramů`;
        } else if (serving) {
            if (serving!.title.match(/\bg\b/)) {
                servingString = serving.title;
            } else {
                servingString = serving.title;
            }
        }
        return `Zapsáno ${food.title} ${servingString}`;
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
