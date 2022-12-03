import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface tasksrState {
    project: string,
    period: string,
    tasks: object[]
}

const initialState: tasksrState = {
    project: '',
    period: '',
    tasks: [],

};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<any>) => {
            state.tasks.push(action.payload.chart);
            state.period = action.payload.period;
            state.project = action.payload.project;
        }
    }
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;