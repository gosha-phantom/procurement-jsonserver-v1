import { CounterSchema } from 'entities/_Counter';
import { ProcOrderSchema } from 'entities/ProcOrders';
import { ProcAuthLoginSchema } from 'entities/ProcAuthLogin';
import { ProcOrderCreateSchema } from 'entities/ProcOrderCreate';

import { ProcOrderStatusSchema } from 'entities/ProcOrderStatus';
import { WarehouseSchema } from 'entities/Warehouse';
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

export interface StateSchema {
    procAuthLogin: ProcAuthLoginSchema;
    counter: CounterSchema;

    warehouses?: WarehouseSchema;
    procOrderStatus?: ProcOrderStatusSchema;

    procOrders?: ProcOrderSchema;
    procOrderCreate?: ProcOrderCreateSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    getMountedReducers: () => MountedReducers;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface StoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    state: StateSchema;
}
