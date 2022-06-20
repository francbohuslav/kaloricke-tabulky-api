export class KalTabError extends Error {
    constructor(message: string, public data: any) {
        super(message);
    }
}
