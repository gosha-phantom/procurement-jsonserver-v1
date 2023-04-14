import { ProcOrder } from 'entities/ProcOrders';
import {} from 'entities/ProcOrders/ui/procOrdersTable/ProcOrdersTable';

export interface TableHeaders {
    key: string;
    value: string | undefined;
    sort?: boolean;
    filter?: boolean;
    textAlign: TableDataAlign;
}

export enum TableDataAlign {
    LEFT = 'table-data-left',
    CENTER = 'table-data-center',
    RIGHT = 'table-data-right',
}

export enum TableDataTextSize {
    SMALL = 'table-data-text-size-small',
    MEDIUM = 'table-data-text-size-medium',
    LARGE = 'table-data-text-size-large',
    XL = 'table-data-text-size-xl',
}

export type TableDataTypes = ProcOrder[];
