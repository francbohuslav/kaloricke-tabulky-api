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
exports.CaloriesCommand = void 0;
const food_command_base_1 = require("./food-command-base");
class CaloriesCommand extends food_command_base_1.FoodCommandBase {
    parse(questionRest) {
        this.parseFoodAndGrams(questionRest);
    }
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeInternal(client);
            const cals = Math.round((parseInt(this.food.value) / 100) * this.grams);
            return `Potravina ${this.food.title} ${this.getServingString()} má ${cals} kilokalorií`;
        });
    }
}
exports.CaloriesCommand = CaloriesCommand;
CaloriesCommand.COMMAND = "kalorie";
//# sourceMappingURL=calories.js.map