import { CounterSchema } from 'entities/_Counter';
import { ProcOrderStatusSchema } from 'entities/ProcOrderStatus';
import { UsersSchema } from 'entities/Users';
import { ProcOrderSchema } from 'entities/ProcOrders';
import { WarehouseSchema } from 'entities/Warehouse';

export interface StateSchema {
    counter: CounterSchema;
    // users: UsersSchema;
    procOrders: ProcOrderSchema;
    // warehouses: WarehouseSchema;
    // procOrderStatus: ProcOrderStatusSchema;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    state: StateSchema;
}
