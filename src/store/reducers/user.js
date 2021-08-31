import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    identifyNumber: '',
    birthDate: new Date(),
    address: '',
    image: {
        front: null,
        back: null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addInfo: (state, action) => {
            state = {
                ...state,
                [action.payload.key]: action.payload.value
            };
        },
        addImage: (state, action) => {
            const image = { ...state.image, [action.payload.key]: action.payload.dataImage };
            state = { ...state, image };
        }
    },
})

export const { addInfo, addImage } = userSlice.actions

export default userSlice.reducer