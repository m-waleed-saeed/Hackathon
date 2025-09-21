import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout;
const Copyright = () => {
  const year = new Date().getFullYear();
    return (
    <Footer className='text-center'>
        <p>&copy; {year} All rights reserved.Developed by <b>Muhammad Waleed</b></p>
    </Footer>
  )
}

export default Copyright