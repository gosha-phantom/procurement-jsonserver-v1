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
