import { Client } from "src/client";
import { IFoodDefinition, IFoodDetail, IUnitOption } from "src/interfaces";
import { CommandBase } from "./command-base";

export abstract class FoodCommandBase extends CommandBase {
    protected foodToSearch: string;
    protected grams: number;
    protected gramsAreSpecified: boolean;
    protected food: IFoodDefinition;
    protected foodDetail: IFoodDetail;
    protected serving: IUnitOption;

    protected parseFoodAndGrams(questionRest: string) {
        const match = questionRest.match(/(.*) (\d+)\s?g(ramů)?$/);
        if (match) {
            this.foodToSearch = match[1];
            this.grams = parseInt(match[2]);
            this.gramsAreSpecified = true;
        } else {
            this.foodToSearch = questionRest.trim();
            this.grams = 100;
            this.gramsAreSpecified = false;
        }
    }

    protected async executeInternal(client: Client): Promise<void> {
        const foods = await client.searchFood(this.foodToSearch);
        if (foods.length === 0) {
            throw new Error(`Potravina ${this.foodToSearch} nenanezena`);
        }
        this.food = foods[0];
        console.log(this.food);

        this.foodDetail = await client.getFood(this.food.id);
        if (!this.gramsAreSpecified) {
            const specifiedServings = this.foodDetail.unitOptions.filter((uo) => uo.multiplier != 1 && !(uo.multiplier == 100 && uo.title == "100 g"));
            if (specifiedServings.length == 0) {
                throw new Error("Nedokážu určit vhodnou gramáž. Zkus to znova s gramy.");
            }
            this.serving = specifiedServings[0];
            this.grams = this.serving.multiplier;
        }
    }

    protected getServingString() {
        if (this.gramsAreSpecified) {
            return `${this.grams} gramů`;
        } else if (this.serving.title.match(/\bg\b/) || this.serving.title.match(/\bml\b/)) {
            return this.serving.title;
        } else {
            return `${this.serving.title} ${this.grams} gramů`;
        }
    }
}
