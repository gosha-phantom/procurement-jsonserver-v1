import { EntityState } from '@reduxjs/toolkit';

export interface ProcOrderStatus {
    ID: number;
    title: string;
}

export interface ProcOrderStatusSchema extends EntityState<ProcOrderStatus> {
    isLoading?: boolean;
    error?: string;
}
