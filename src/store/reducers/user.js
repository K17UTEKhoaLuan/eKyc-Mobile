import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    identifyNumber: '',
    birthDate: '',
    address: '',
    sex: '',
    imageCard: {
        front: null,
        back: null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addInfo: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = value;
            }
        },
        addImage: (state, action) => {
            const imageCard = { ...state.imageCard, [action.payload.key]: action.payload.dataImage };
            state.imageCard = imageCard;
        },
        clearState: (state, action) => {
            for (const key in state) {
                state[key] = initialState[key];
            }
        },
    },
})

export const { addInfo, addImage, clearState } = userSlice.actions

export default userSlice.reducer