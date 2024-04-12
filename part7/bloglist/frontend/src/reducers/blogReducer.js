import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_BLOG':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      return state.map((item) => {
        if (item.id === action.data.id) {
          return action.data
        }
        return item
      }).sort((a, b) => (b.likes - a.likes))
    case 'DELETE_BLOG':
      return state.filter(item => item.id !== action.id)
    default:
      return state
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => (b.likes - a.likes))
    dispatch({
      type: 'INITIAL_BLOG',
      data: blogs,
    })
  }
}

export const addBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })
  }
}


export const updateBlog = (data) => {
  return async dispatch => {
    const editedBlog = await blogService.update(data)
    dispatch({
      type: 'UPDATE_BLOG',
      data: editedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        id: id,
      })
    } catch (e) {
      console.log(e);
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  }
}


export default reducer