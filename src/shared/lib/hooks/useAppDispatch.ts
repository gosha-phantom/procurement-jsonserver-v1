import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/StoreProvider';
import { useStore } from 'react-redux';
import { StoreWithManager } from 'shared/config/stateConfig/StateSchema';

// export const useAppDispatch = () => useDispatch<AppDispatch>();

// const store = useStore() as StoreWithManager;

// type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
