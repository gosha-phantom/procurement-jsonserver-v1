import { EntityState } from '@reduxjs/toolkit';

export interface ProcOrder {
    user: string;
    userID?: number;
    ID: number;
    title: string;
    project: string;
    dateCreated: Date;
    dateNeed: Date;
    statusID?: number;
    status: string;
    warehouseID?: number;
    warehouse: string;
    description: string;
    purchaserID?: number;
    purchaser: string;
}

export interface ProcOrderSchema extends EntityState<ProcOrder> {
    isLoading?: boolean;
    error?: string;
}

