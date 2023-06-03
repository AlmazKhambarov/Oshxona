
import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from './redux/extraReducer/extraReducer';
function App() {
  const { usersData } = useSelector(state => state.users)
  const dispatch = useDispatch()
  console.log(usersData)
  const [data, setData] = useState({
    name:""
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addPost(data))
  }
  return (
    <div className="App">
      <br />
      <br />
      <br />
      <div className='form_main'>
        <form onSubmit={handleSubmit}>
          <input className='form-control' type="text" placeholder='Enter your name' onChange={(e) => setData({...data, name:e.target.value})} />
          <br/>
          {/* <button type='submit' className='btn btn-primary'>Addd</button> */}
        </form>
      </div>
    </div>
  );
}
export default App;
