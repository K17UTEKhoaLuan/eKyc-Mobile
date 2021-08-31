import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    identifyNumber: '',
    birthDate: '',
    address: '',
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
        }
    },
})

export const { addInfo, addImage } = userSlice.actions

export default userSlice.reducer