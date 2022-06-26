"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBase = void 0;
class CommandBase {
    getBillanceString(summary) {
        var _a;
        const totalCalories = summary.foodstuffEnergyTotal - summary.activityEnergyTotal;
        const percent = summary.items[0] ? (_a = summary.items[0]) === null || _a === void 0 ? void 0 : _a.percent : "neznámo";
        return `${percent}% neboli ${totalCalories} kilokalorií`;
    }
}
exports.CommandBase = CommandBase;
//# sourceMappingURL=command-base.js.map