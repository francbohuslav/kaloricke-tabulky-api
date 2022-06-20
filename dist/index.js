"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./client"), exports);
// export Client;
/*
const client = new Client();
(async () => {
    try {
        // await client.login("franc.bohuslav@gmail.com", "***");
        const food = await client.searchFood("jablko");
        const diary = await client.getDiary(new Date(2022, 5, 21));
        console.log(diary.times[1].foodstuff.length);
    } catch (ex) {
        console.error(ex.message);
        console.error(ex.data);
    }
})();
*/
//# sourceMappingURL=index.js.map