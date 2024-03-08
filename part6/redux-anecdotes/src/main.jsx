import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
// import reducer from './reducers/anecdoteReducer'
import store from './store'


store.subscribe(() => console.log(store.getState()))
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)