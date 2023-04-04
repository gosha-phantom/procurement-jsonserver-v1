import { EntityState } from '@reduxjs/toolkit';

export interface ProcOrder {
    id: number;
    userID: number;
    title: string;
    dateCreated: string;
    dateNeed: string;
    project?: string;
    description?: string;
    stateID: number;
    warehouseID?: number;
    purchaserID?: number;
}

export interface ProcOrderSchema extends EntityState<ProcOrder> {
    isLoading?: boolean;
    error?: string;
}

export interface ProcessedProcOrdersData {
    id?: number;
    user?: string;
    title?: string;
    project?: string;
    dateCreated?: string;
    dateNeed?: string;
    status?: string;
    warehouse?: string;
    description?: string;
    purchaser?: string;
}
