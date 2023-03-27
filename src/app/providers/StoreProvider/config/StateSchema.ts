import { CounterSchema } from 'entities/_Counter';
import { UsersSchema } from 'entities/Users';
import { ProcOrderSchema } from 'entities/ProcOrders';

export interface StateSchema {
    counter: CounterSchema;
    users: UsersSchema;
    procOrders: ProcOrderSchema;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    state: StateSchema;
}
