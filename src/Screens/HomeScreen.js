import React from 'react'
import { Button } from 'antd'
const HomeScreen = () => {
    const addCustomer=()=>{
        window.location.href='CustomerAddScreen'
    }

  return (
    <div>
    <div style={{
        margin:'80px'
      }}
    ><h1 style={{
        margin:'30px',
        fontWeight:'bold',
        fontSize:'40px'
      }}>HomeScreen</h1></div>

    <div>
        <Button type="primary" shape="round" onClick={()=> addCustomer()}>Add Customer</Button>
    </div>
    </div>
  )
}

export default HomeScreen