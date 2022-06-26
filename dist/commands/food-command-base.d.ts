import { Client } from "src/client";
import { IFoodDefinition, IFoodDetail, IUnitOption } from "src/interfaces";
import { CommandBase } from "./command-base";
export declare abstract class FoodCommandBase extends CommandBase {
    protected foodToSearch: string;
    protected grams: number;
    protected gramsAreSpecified: boolean;
    protected food: IFoodDefinition;
    protected foodDetail: IFoodDetail;
    protected serving: IUnitOption;
    protected parseFoodAndGrams(questionRest: string): void;
    protected executeInternal(client: Client): Promise<void>;
    protected getServingString(): string;
}
