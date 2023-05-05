import { ProcOrderPosesUpsert } from 'entities/ProcOrderPosesUpsert';

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
    procOrderPoses?: ProcOrderPosesUpsert[]
}

export interface ProcOrderCreateSchema {
    isLoading?: boolean;
    error?: string;
    procOrderID?: ProcOrderCreateID;
    procOrderBody?: ProcOrderCreateBody;
}
