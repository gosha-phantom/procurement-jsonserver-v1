import { EntityState } from '@reduxjs/toolkit';

export interface UserType {
    id: number;
    firstName: string;
    lastName: string;
}

export interface UsersSchema extends EntityState<UserType> {
    isLoading?: boolean;
    error?: string;
}

