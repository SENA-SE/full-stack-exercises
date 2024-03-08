// import { createSlice } from "@reduxjs/toolkit";

// const filterSlice = createSlice({
//   name: "filter",
//   initialState: "",
//   reducers: {
//     changeKeyword(state, action) {
//       return action.payload
//     }
//   }
// })

// export const { changeKeyword } = filterSlice.actions
// export default filterSlice.reducer

const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
  }

export const changeFilter = (content) => {
    return {
        type: 'SET_FILTER',
        payload:content
    }
}

export default filterReducer