import { createSlice } from "@reduxjs/toolkit";

const initial={
    results:[],
    dis:false,
    text:"",
    reduxData:false,
    dataIndex:0
};

const searchSlice=createSlice({
    name:'searchResult',
    initialState:initial,
    reducers:{
        storeDate(state,action){
           state.results=(action.payload)
        },
        disContent(state,action){
            state.dis=(action.payload)
        },
        textDate(state,action){
            state.text=(action.payload)
        },
        setReduxStatus(state,action){
            state.reduxData=(action.payload)
        },
        setDataIndex(state,action){
            state.dataIndex=(action.payload)
        }
    }

})

export const {storeDate,disContent,textDate,setReduxStatus,setDataIndex} =searchSlice.actions;
export default searchSlice.reducer;