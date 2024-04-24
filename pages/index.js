import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type){
    case 'login':
      return {...state, isLoggedIn: true}
    case 'logout':
      return {...state, isLoggedIn: false, username: '', password:'', isError: false}
    case 'updateUsername':
      return {...state, username: action.payload, isError: false}
    case 'updatePassword':
      return {...state, password: action.payload, isError: false}
    case 'error':
      return {...state, isError: true}
    default: return state
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
    isLoggedIn: false,
    isError: false,
  })
  function login(e){
    e.preventDefault();
    if(!state.username || !state.password){
      dispatch({type: 'error'})
      return;
    }
    dispatch({type: 'login'})
  }
  return (
    <div id="main">
      {state.isLoggedIn ?
        <section className="logout-section">
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}! </p> {/* put the username */}
          <button className="logout-btn" onClick={()=> dispatch({type: 'logout'})}>Logout</button>
        </section>
        :
        <form className="login-form">
          {state.isError && 
            <p className='invalid-error'>Invalid username or password!</p>
          }
          <section className="username-input">
            <label>Username: </label>
            <input 
              type="text" 
              placeholder="Username" 
              className="username" 
              onChange={(e)=> dispatch({type: 'updateUsername', payload: e.target.value})}
            />
          </section>
          <section className="password-input">
            <label>Password: </label>
            <input 
              type="password" 
              placeholder="Password" 
              className="password" 
              onChange={(e)=> dispatch({type: 'updatePassword', payload: e.target.value})}
            />
          </section>
          <button className="login-btn" onClick={login}>Login</button>
        </form>
      }
    </div>
  );
}
