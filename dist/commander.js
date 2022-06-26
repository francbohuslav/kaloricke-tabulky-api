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
exports.Commander = void 0;
const calories_1 = require("./commands/calories");
const delete_food_command_1 = require("./commands/delete-food-command");
const my_calories_1 = require("./commands/my-calories");
const save_food_command_1 = require("./commands/save-food-command");
class Commander {
    constructor(client) {
        this.client = client;
        this.commandRegistry = {
            [calories_1.CaloriesCommand.COMMAND]: calories_1.CaloriesCommand,
            [my_calories_1.MyCaloriesCommand.COMMAND]: my_calories_1.MyCaloriesCommand,
            [save_food_command_1.SaveFoodCommand.COMMAND]: save_food_command_1.SaveFoodCommand,
            [delete_food_command_1.DeleteFoodCommand.COMMAND]: delete_food_command_1.DeleteFoodCommand,
        };
    }
    execute(question, readOnly = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let command;
            let questionRest = "";
            try {
                [command, questionRest] = this.parseCommand(question);
            }
            catch (ex) {
                return "Neznámý příkaz";
            }
            try {
                command.parse(questionRest);
            }
            catch (ex) {
                return ex.message;
            }
            try {
                return yield command.execute(this.client, readOnly);
            }
            catch (ex) {
                return ex.message;
            }
        });
    }
    parseCommand(question) {
        const commands = Object.keys(this.commandRegistry);
        for (const command of commands) {
            if (question.startsWith(command)) {
                const rest = question.substring(command.length).trim();
                const clazz = this.commandRegistry[command];
                const commandObj = new clazz();
                return [commandObj, rest];
            }
        }
        throw new Error("Unknown command");
    }
}
exports.Commander = Commander;
//# sourceMappingURL=commander.js.map