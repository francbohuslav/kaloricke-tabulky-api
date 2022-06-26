"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodCommandBase = void 0;
const command_base_1 = require("./command-base");
class FoodCommandBase extends command_base_1.CommandBase {
    parseFoodAndGrams(questionRest) {
        const match = questionRest.match(/(.*) (\d+)\s?g(ramů)?$/);
        if (match) {
            this.foodToSearch = match[1];
            this.grams = parseInt(match[2]);
            this.gramsAreSpecified = true;
        }
        else {
            this.foodToSearch = questionRest.trim();
            this.grams = 100;
            this.gramsAreSpecified = false;
        }
    }
    executeInternal(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const foods = yield client.searchFood(this.foodToSearch);
            if (foods.length === 0) {
                throw new Error(`Potravina ${this.foodToSearch} nenanezena`);
            }
            this.food = foods[0];
            console.log(this.food);
            this.foodDetail = yield client.getFood(this.food.id);
            if (!this.gramsAreSpecified) {
                const specifiedServings = this.foodDetail.unitOptions.filter((uo) => uo.multiplier != 1 && !(uo.multiplier == 100 && uo.title == "100 g"));
                if (specifiedServings.length == 0) {
                    throw new Error("Nedokážu určit vhodnou gramáž. Zkus to znova s gramy.");
                }
                this.serving = specifiedServings[0];
                this.grams = this.serving.multiplier;
            }
        });
    }
    getServingString() {
        if (this.gramsAreSpecified) {
            return `${this.grams} gramů`;
        }
        else if (this.serving.title.match(/\bg\b/) || this.serving.title.match(/\bml\b/)) {
            return this.serving.title;
        }
        else {
            return `${this.serving.title} ${this.grams} gramů`;
        }
    }
}
exports.FoodCommandBase = FoodCommandBase;
//# sourceMappingURL=food-command-base.js.map