import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userInfo:{}
}

const userInfo = createSlice({
    name:"user",
    initialState,
    reducers:{
        makeOnline:(state)=>
        {
            state.status=true;
        },
        makeOffline:(state)=>
        {
            state.status=false;
        },
        storeUserData:(state,action)=>
        {
            state.userInfo=action.payload;
        }
    }
}
)

export const {makeOnline,makeOffline,storeUserData} = userInfo.actions

export default userInfo.reducer