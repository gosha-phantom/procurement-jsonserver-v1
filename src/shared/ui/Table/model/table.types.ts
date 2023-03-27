export interface TableHeaders {
    key: string;
    value: string | undefined;
    sort?: boolean;
    filter?: boolean;
    textAlign: TableDataAlign;
}

export enum TableDataAlign {
    LEFT = 'text-left',
    CENTER = 'text-center',
    RIGHT = 'text-right',
}
