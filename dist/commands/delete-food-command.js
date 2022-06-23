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
exports.DeleteFoodCommand = void 0;
const command_base_1 = require("./command-base");
class DeleteFoodCommand extends command_base_1.CommandBase {
    parse(_questionRest) { }
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const summary = yield client.getDiary(new Date());
            const times = [...summary.times];
            times.reverse();
            let lastFood;
            for (const time of times) {
                if (time.foodstuff.length) {
                    lastFood = time.foodstuff[time.foodstuff.length - 1];
                    break;
                }
            }
            if (!lastFood) {
                return "Není co mazat, dnes jsi zatím bez jídla";
            }
            yield client.deleteFoodUsage(lastFood.id);
            return `Smazáno ${lastFood.title}`;
        });
    }
}
exports.DeleteFoodCommand = DeleteFoodCommand;
DeleteFoodCommand.COMMAND = "smaž poslední jídlo";
//# sourceMappingURL=delete-food-command.js.map