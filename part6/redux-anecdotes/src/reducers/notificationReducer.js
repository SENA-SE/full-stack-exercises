import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
})

export const { addNotification, clearNotification } = notificationSlice.actions;
export const popNotification = (content, clearTime) => {
    return async(dispatch) => {
        clearTimeout(window.clearTimeout)
        dispatch(addNotification(content))
        setTimeout(() => {
            dispatch(clearNotification())
          }, clearTime * 1000)
    }
}


export default notificationSlice.reducer;