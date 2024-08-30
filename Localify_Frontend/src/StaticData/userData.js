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
            // state.userInfo=action.payload;
        },
        makeOffline:(state)=>
        {
            state.status=false;
        }
    }
}
)

export const {makeOnline,makeOffline} = userInfo.actions

export default userInfo.reducer