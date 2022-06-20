"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KalTabError = void 0;
class KalTabError extends Error {
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}
exports.KalTabError = KalTabError;
//# sourceMappingURL=kal-tab-error.js.map