export interface ICodeResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface ILoginResponse extends ICodeResponse<string> {}

export interface IFoodDefinition {
    /** "foodstuff" */
    clazz: string;
    /** "2c62865228bf748d" */
    id: string;
    /** "jablko" */
    url: string;
    /** "jablko" */
    title: string;
    /** null */
    type: any;
    /** "g" */
    unit: string;
    /** "63" */
    value: string;
    /** true */
    favorite: boolean;
    /** null */
    energy: any;
    /** "kcal" */
    energyUnit: string;
    /** 1 */
    status: number;
    /** "public" */
    visibility: string;
    /** false */
    isLiquid: boolean;
    /** true */
    hasImage: boolean;
    /** null */
    multiplier: any;
    /** true */
    locked: boolean;
}

export interface IDiaryDay {
    date: number; // 1655762400000;
    energyUnit: string; // "kcal";
    times: IDiaryTime[];
    activities: any[];
    foodstuffCount: number;
}

interface IDiaryTime {
    /** "1" */
    id: string;
    /** "Snídaně" */
    title: string;
    foodstuff: IFoodUsage[];
    notes: any[];
    templateNotes: any;
    actions: boolean;
    rating: any;
    /** "335" */
    energyTotal: string;
    energyTotalUnit: any;
}

export interface IFoodUsage {
    /** "912f1438c2954e1e847e6d318206c7f6" */
    id: string;
    /** null */
    favId: any;
    /** false */
    open: boolean;
    /** false */
    showInfo: boolean;
    /** null */
    info: any;
    /** null */
    inUse: any;
    /** null */
    inMerge: any;
    /** "foodstuff" */
    type: string;
    /** "5fbaf8a981330620" */
    guidType: string;
    /** false */
    selected: boolean;
    /** "kuřecí prsa syrová (bez kůže, bez kosti)" */
    title: string;
    /** false */
    favorite: boolean;
    /** null */
    emulgator: any;
    /** false */
    emulgatorAd: boolean;
    /** "166 x 1 g" */
    unit: string;
    /** "175" */
    energy: string;
    /** "kcal" */
    energyUnit: string;
    /** 38.346 */
    protein: any;
    /** 0.0 */
    carbohydrate: any;
    /** 2.49 */
    fat: any;
    /** null */
    fiber: any;
    /** 0.0 */
    sugar: any;
    /** 0.498 */
    saturatedFattyAcid: any;
    /** 0.0 */
    calcium: any;
    /** null */
    transFattyAcid: any;
    /** null */
    cholesterol: any;
    /** null */
    sodium: any;
    /** 0.166 */
    salt: any;
    /** 1.9173 */
    phe: any;
    /** null */
    alcohol: any;
    /** "kureci-prsa-syrova" */
    url: string;
    /** null */
    time: any;
    /** true */
    editableUnit: boolean;
    /** false */
    editUnitOpen: boolean;
    /** false */
    editTimeOpen: boolean;
    /** false */
    editableMeal: boolean;
    /** false */
    editableMealCustom: boolean;
    /** false */
    actions: boolean;
    /** null */
    mealContents: boolean;
    /** false */
    showEsInfo: boolean;
    /** null */
    esInfo: any;
    /** null */
    sharedFrom: any;
    /** null */
    status: any;
    /** null */
    guidUserMeal: any;
    /** null */
    guidRecipe: any;
    /** false */
    isRecipe: boolean;
}

export interface IDiarySummary {
    items: any;
    itemsDynamic: any;
    /*  144 */
    activityEnergyTotal: number;
    /* : 1437 */
    foodstuffEnergyTotal: number;
    /* : "144" */
    digestion: number;
    /* : "kcal" */
    energyUnit: string;
    /* : "79" */
    weight: string;
    /* : null */
    alcohol: any;
    /* : 1 */
    mode: number;
    /* : false */
    nutrientsFromActivities: boolean;
}
