"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBase = void 0;
class CommandBase {
    parseFoodAndGrams(questionRest) {
        const match = questionRest.match(/(.*) (\d+)\s?g(ramů)?$/);
        if (match) {
            return {
                food: match[1],
                grams: parseInt(match[2]),
                gramsAreSpecified: true,
            };
        }
        else {
            return {
                food: questionRest.trim(),
                grams: 100,
                gramsAreSpecified: false,
            };
        }
    }
}
exports.CommandBase = CommandBase;
//# sourceMappingURL=command-base.js.map