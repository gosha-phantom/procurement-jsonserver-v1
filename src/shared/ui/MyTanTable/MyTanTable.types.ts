import { RankingInfo } from '@tanstack/match-sorter-utils';
import { Column, FilterFn, Table } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

export interface FilterProps {
    column: Column<any, unknown>
    table: Table<any>
}
