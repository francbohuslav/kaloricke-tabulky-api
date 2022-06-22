import dotenv from "dotenv";
import { Client, Commander } from "../src/index";

dotenv.config();

const client = new Client();
const commander = new Commander(client);

beforeAll(async () => {
    await client.login(process.env.KALTAB_EMAIL!, process.env.KALTAB_PASSWORD!);
    console.log(client.sessionId);
});

describe("Commander", () => {
    test("unknown command", async () => {
        const answer = await commander.execute("unknown");
        expect(answer).toBe("Neznámý příkaz");
    });

    describe("kalorie", () => {
        test("jablko", async () => {
            const answer = await commander.execute("kalorie jablko");
            expect(answer).toBe("Potravina jablko má 63 kalorií");
        });

        test("jablko 200 gramů", async () => {
            const answer = await commander.execute("kalorie jablko 150 gramů");
            expect(answer).toBe("Potravina jablko má 95 kalorií");
        });

        test("mléko", async () => {
            const answer = await commander.execute("kalorie mléko");
            expect(answer).toBe("Potravina mléko polotučné 1,5% tuku má 47 kalorií");
        });
    });

    test("moje kalorie", async () => {
        const answer = await commander.execute("moje kalorie");
        expect(answer).toMatch(/Tvoje bilance je \d+ kalorií/);
    });
});