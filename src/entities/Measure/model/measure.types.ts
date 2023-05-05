import { EntityState } from '@reduxjs/toolkit';

export interface Measure {
    ID: number;
    title: string;
    description: string;
}

export interface MeasureSchema extends EntityState<Measure> {
    isLoading?: boolean;
    error?: string;
}
