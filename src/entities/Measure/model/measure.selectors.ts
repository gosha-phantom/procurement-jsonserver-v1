import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { buildSelector } from 'shared/lib';
import { selectMeasures } from './measure.slice';

export const [useSelectMeasuresIsLoading, selectMeasuresIsLoading] = buildSelector((state: StateSchema) => state.measures?.isLoading || false);
export const [useSelectMeasuresError, selectMeasuresError] = buildSelector((state: StateSchema) => state.measures?.error || undefined);
export const [useSelectMeasuresAll, selectMeasuresAll] = buildSelector(selectMeasures.selectAll);
export const selectMeasureById = (id: number) => (state: StateSchema) => selectMeasures.selectById(state, id);
