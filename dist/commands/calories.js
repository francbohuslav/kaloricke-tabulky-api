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
const command_base_1 = require("./command-base");
class CaloriesCommand extends command_base_1.CommandBase {
    parse(questionRest) {
        const match = questionRest.match(/(.*) (\d+) gramů$/);
        console.log(match);
        if (match) {
            this.food = match[1];
            this.grams = parseInt(match[2]);
        }
        else {
            this.food = questionRest.trim();
            this.grams = 100;
        }
    }
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const foods = yield client.searchFood(this.food);
            if (foods.length === 0) {
                return `Potravina ${this.food} nenanezena`;
            }
            const cals = Math.round((parseInt(foods[0].value) / 100) * this.grams);
            return `Potravina ${foods[0].title} má ${cals} kalorií`;
        });
    }
}
exports.CaloriesCommand = CaloriesCommand;
CaloriesCommand.COMMAND = "kalorie";
//# sourceMappingURL=calories.js.map