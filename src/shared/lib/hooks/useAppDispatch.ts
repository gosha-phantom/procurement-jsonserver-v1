import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/StoreProvider';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;
