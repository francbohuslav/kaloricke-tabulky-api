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
exports.MyCaloriesCommand = void 0;
const command_base_1 = require("./command-base");
class MyCaloriesCommand extends command_base_1.CommandBase {
    parse(_questionRest) { }
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const summary = yield client.getSummary(new Date());
            return `Tvoje bilance je ${this.getBillanceString(summary)}`;
        });
    }
}
exports.MyCaloriesCommand = MyCaloriesCommand;
MyCaloriesCommand.COMMAND = "moje kalorie";
//# sourceMappingURL=my-calories.js.map