export interface ProcOrderCreateID {
    ID: number;
}

export interface ProcOrderCreateBody {
    userID?: number;
    title: string;
    dateCreated: string;
    dateBuyTill: string;
    statusID: number;
    description: string;
    project: string;
    warehouseID: number;
}

export interface ProcOrderPosesCreateBody {
    ID: string;
    title: string;
    parameter?: string;
    measureID: number;
    quantity: number;
    article?: string;
    link?: string;
    costCentre?: string;
}

export interface ProcOrderCreateSchema {
    isLoading?: boolean;
    error?: string;
    procOrderID?: ProcOrderCreateID;
    procOrderBody?: ProcOrderCreateBody;
    procOrderPosesAll?: ProcOrderPosesCreateBody[];
    procOrderPosesEdited?: ProcOrderPosesCreateBody;
}
