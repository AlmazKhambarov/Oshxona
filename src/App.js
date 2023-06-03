
import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addPost, getAllUsers } from './redux/extraReducer/extraReducer';
function App() {
  const { usersData, onuserAdded , loading,} = useSelector(state => state.users)
  const dispatch = useDispatch()
  console.log(usersData)
  const [data, setData] = useState({
    name:"gavo",
    title:"theme"
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addPost(data))
  }

  useEffect(()=>{
    if(!loading){
      dispatch(getAllUsers())
    }
  },[onuserAdded])
  return (
    <div className="App">
      <br />
      <br />
      <br />
      <div className='form_main'>
        <form onSubmit={handleSubmit}>
          <input className='form-control' type="text" placeholder='Enter your name' onChange={(e) => setData({...data, title:e.target.value})} />
          <br/>
          <button type='submit' className='btn btn-primary'>Addd</button>
        </form>
        {usersData?.map((item)=>(
          <span key={item.id} style={{fontSize:"20px", display:"block"}}>{item.id} {item.title}</span>
        ))}
      </div>
    </div>
  );
}
export default App;
