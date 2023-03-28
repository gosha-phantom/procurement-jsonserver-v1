import { EntityState } from '@reduxjs/toolkit';

export interface ProcOrderStatus {
    id: number;
    title: string;
}

export interface ProcOrderStatusSchema extends EntityState<ProcOrderStatus> {
    isLoading?: boolean;
    error?: string;
}
