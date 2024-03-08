import { useDispatch } from "react-redux"
// import { changeKeyword } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch({type:'SET_FILTER', payload: e.target.value})
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter