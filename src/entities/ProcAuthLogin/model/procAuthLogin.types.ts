import { EntityState } from '@reduxjs/toolkit';

export interface ProcAuthLogin {
    ID: number;
    login: string;
    lastName: string;
    firstName: string;
    thirdName: string;
    roleID: number;
    role: string;
    disabled: boolean;
    password?: string;
    rememberMe: boolean;
}

export interface ProcAuthLoginData {
    data?: ProcAuthLogin;
    token?: string;
}

export interface ProcAuthLoginSchema extends EntityState<ProcAuthLoginData> {
    isLoading?: boolean;
    error?: string;
}
