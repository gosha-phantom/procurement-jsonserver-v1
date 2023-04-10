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
    // processedProcOrders?: ProcessedProcOrdersData[]
}

// export interface ProcessedProcOrdersData {
//     id?: number;
//     user?: string;
//     title?: string;
//     project?: string;
//     dateCreated?: Date;
//     dateNeed?: Date;
//     status?: string;
//     warehouse?: string;
//     description?: string;
//     purchaser?: string;
// }
