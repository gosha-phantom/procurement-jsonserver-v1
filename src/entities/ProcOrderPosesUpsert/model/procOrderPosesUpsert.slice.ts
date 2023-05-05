import { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { buildSlice } from 'shared/lib';
import {
	ProcOrderPosesUpsert,
	ProcOrderPosesUpsertSchema,
} from './procOrderPosesUpsert.types';
import { postProcOrderPosesCreate } from './procOrderPosesUpsert.services';

// const mockProcOrderPosesData: ProcOrderPosesUpsert[] = [
// 	{
// 		ID: nanoid(),
// 		title: 'Test product 1',
// 		parameter: 'Test parameter 1',
// 		article: '1111011123',
// 		quantity: 10,
// 		measureID: 1,
// 		link: '',
// 		costCenter: ''
// 	},
// 	{
// 		ID: nanoid(),
// 		title: 'Test product 2',
// 		parameter: 'Test parameter 2',
// 		article: '',
// 		quantity: 5,
// 		measureID: 3,
// 		link: 'http://mail.ru',
// 		costCenter: 'Products'
// 	},
// 	{
// 		ID: nanoid(),
// 		title: 'Test product 3',
// 		parameter: 'Test parameter 3',
// 		article: '11110BC2202',
// 		quantity: 3,
// 		measureID: 2,
// 		link: '',
// 		costCenter: ''
// 	}
// ];

const initialState: ProcOrderPosesUpsertSchema = {
	error: undefined,
	isLoading: undefined,
	procOrderPoses: [],
	procOrderPosesEdit: undefined,
	canClearState: false,
};

const procOrderPosesUpsertSlice = buildSlice({
	name: 'procOrderPosesUpsertSlice',
	initialState,
	reducers: {
		editProcOrderPos: (state, action: PayloadAction<string>) => {
			state.procOrderPosesEdit = action.payload;
		},
		clearEditProcOrderPos: (state) => {
			state.procOrderPosesEdit = undefined;
		},
		deleteProcOrderPos: (state, action: PayloadAction<string>) => {
			state.procOrderPoses = state.procOrderPoses?.filter(item => item.ID !== action.payload);
		},
		addProcOrderPos: (state) => {
			const ID = nanoid();
			const newElement = {
				ID, title: '', parameter: '', article: '', quantity: 1, measureID: 1, link: '', costCentre: ''
			};
			state.procOrderPoses.unshift(newElement);
			state.procOrderPosesEdit = ID;
		},
		saveProcOrderPos: (state, { payload }: PayloadAction<ProcOrderPosesUpsert>) => {
			if (state.procOrderPoses && state.procOrderPosesEdit) {
				const editedProcOrderPos = state.procOrderPoses.find(item => item.ID === state.procOrderPosesEdit);
				if (editedProcOrderPos) {
					editedProcOrderPos.title = payload.title;
					editedProcOrderPos.link = payload.link;
					editedProcOrderPos.article = payload.article;
					editedProcOrderPos.costCenter = payload.costCenter;
					editedProcOrderPos.parameter = payload.parameter;
					editedProcOrderPos.quantity = payload.quantity;
					editedProcOrderPos.measureID = payload.measureID;
				}
				state.procOrderPosesEdit = undefined;
			}
		},
		clearProcOrderPoses: (state) => {
			state.procOrderPoses = [];
			state.procOrderPosesEdit = undefined;
			state.canClearState = false;
		}
	},
	extraReducers: (builder) => {
		builder
			// .addCase(postProcOrderCreate.pending, (state) => {
			// 	state.isLoading = true;
			// 	state.error = undefined;
			// })
			// .addCase(postProcOrderCreate.rejected, (state, action) => {
			// 	state.isLoading = false;
			// 	state.error = action.payload;
			// })
			.addCase(postProcOrderPosesCreate.fulfilled, (state) => {
				console.log('Success request!');
				state.canClearState = true;
			});
	},
});

export const {
	actions: procOrderPosesUpsertActions,
	reducer: procOrderPosesUpsertReducer,
	useActions: useProcOrderPosesUpsertActions,
} = procOrderPosesUpsertSlice;
