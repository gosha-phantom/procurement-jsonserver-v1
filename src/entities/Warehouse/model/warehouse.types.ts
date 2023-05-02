import { EntityState } from '@reduxjs/toolkit';

export interface Warehouse {
    id: number;
    title: string;
}

export interface WarehouseSchema extends EntityState<Warehouse> {
    isLoading?: boolean;
    error?: string;
}
