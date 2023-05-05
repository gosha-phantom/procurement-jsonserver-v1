
export interface ProcOrderPosesUpsert {
    ID: string;
    title?: string;
    parameter?: string;
    measureID: number;
    quantity: number;
    article?: string;
    link?: string;
    costCenter?: string;
}

export type ProcOrderPosesUpsertWithoutID = Omit<ProcOrderPosesUpsert, 'ID'>;

export interface ProcOrderPosesUpsertSchema {
    isLoading?: boolean;
    error?: string;
    procOrderPoses: ProcOrderPosesUpsert[];
    procOrderPosesEdit?: string;
    canClearState?: boolean;
}
