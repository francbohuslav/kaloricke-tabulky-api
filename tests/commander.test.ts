import dotenv from "dotenv";
import { Client, Commander } from "../src/index";

dotenv.config();

const client = new Client();
const commander = new Commander(client);

jest.setTimeout(10000);

beforeAll(async () => {
    await client.login(process.env.KALTAB_EMAIL!, process.env.KALTAB_PASSWORD!);
});

describe("Commander", () => {
    test("unknown command", async () => {
        const answer = await commander.execute("unknown");
        expect(answer).toBe("Neznámý příkaz");
    });

    describe("kalorie", () => {
        test("jablko", async () => {
            const answer = await commander.execute("kalorie jablko");
            expect(answer).toBe("Potravina jablko má 63 kilokalorií");
        });

        test("jablko 200 gramů", async () => {
            let answer = await commander.execute("kalorie jablko 150 gramů");
            expect(answer).toBe("Potravina jablko má 95 kilokalorií");

            answer = await commander.execute("kalorie jablko 150 g");
            expect(answer).toBe("Potravina jablko má 95 kilokalorií");

            answer = await commander.execute("kalorie jablko 150g");
            expect(answer).toBe("Potravina jablko má 95 kilokalorií");
        });

        test("mléko", async () => {
            const answer = await commander.execute("kalorie mléko");
            expect(answer).toBe("Potravina mléko polotučné 1,5% tuku má 47 kilokalorií");
        });
    });

    test("moje kalorie", async () => {
        const answer = await commander.execute("moje kalorie");
        expect(answer).toMatch(/Tvoje bilance je \d+% neboli \d+ kilokalorií/);
    });

    //TODO: BF: smazani posledniho
    describe("zapiš jídlo", () => {
        test("meloun vodní 123 gramů", async () => {
            let answer = await commander.execute("zapiš jídlo meloun vodní 123 gramů", true);
            expect(answer).toBe("Zapsáno meloun vodní 123 gramů");
            answer = await commander.execute("zapiš jídlo meloun vodní", true);
            expect(answer).toBe("Zapsáno meloun vodní porce (200 g)");
            answer = await commander.execute("zapiš jídlo skyr jahoda bohušovická", true);
            expect(answer).toBe("Zapsáno Skyr jahoda islandská tradice Bohušovická mlékárna velké balení (140 g)");
            //answer = await commander.execute("smaž poslední jídlo");
            //expect(answer).toBe("Smazáno meloun vodní");
        });
    });
});
