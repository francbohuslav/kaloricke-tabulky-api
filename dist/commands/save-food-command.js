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
exports.SaveFoodCommand = void 0;
const command_base_1 = require("./command-base");
class SaveFoodCommand extends command_base_1.CommandBase {
    parse(questionRest) {
        const { food, grams } = this.parseFoodAndGrams(questionRest);
        this.food = food;
        this.grams = grams;
    }
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const foods = yield client.searchFood(this.food);
            if (foods.length === 0) {
                return `Potravina ${this.food} nenanezena`;
            }
            const now = new Date();
            const message = yield client.saveFood(foods[0], now, this.grams, this.getFoodtime(now));
            console.log(message);
            return `Zapsáno ${foods[0].title} ${this.grams} gramů`;
        });
    }
    getFoodtime(date) {
        if (date.getHours() < 9)
            return "1";
        if (date.getHours() < 12)
            return "2";
        if (date.getHours() < 15)
            return "3";
        if (date.getHours() < 18)
            return "4";
        if (date.getHours() < 21)
            return "5";
        return "6";
    }
}
exports.SaveFoodCommand = SaveFoodCommand;
SaveFoodCommand.COMMAND = "zapiš jídlo";
//# sourceMappingURL=save-food-command.js.map