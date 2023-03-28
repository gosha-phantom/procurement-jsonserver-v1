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
