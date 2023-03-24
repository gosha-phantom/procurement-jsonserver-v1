import { CounterSchema } from 'entities/_Counter';
import { AxiosInstance } from 'axios';

export interface StateSchema {
    counter: CounterSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
