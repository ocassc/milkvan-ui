import React from 'react'
import {Button} from 'antd';

const WelcomeScreen = () => {

    const Signin=(e)=>{
      

        window.location.href='LoginScreen'

    }

    const Signup=(e)=>{
        window.location.href='SignupScreen'

    }
  return (
    <div className="container-fluid">
        <div style={{
        margin:'80px'
      }}><h1 style={{
        margin:'30px',
        fontWeight:'bold',
        fontSize:'40px'
      }}>Say hello to your new app</h1></div>
      <div style={{
        margin:'20px',
      }}>
        <Button type="primary" shape="round" onClick={(e) => Signin(e)}>Sign in</Button>
      </div>

      <div>
        <Button type="primary" shape="round" onClick={(e) => Signup(e)}>Sign up</Button>
      </div>
    </div>
  )
}

export default WelcomeScreen
