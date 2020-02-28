import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'

const ColorForm = ({ updateColors }) => {
   const [color, setColor] = useState({
      color: "",
      code: { hex: "" },
      id: Date.now()
   });

   const handleChange = e => {
      if (e.target.name !== 'code') {
         setColor({
            ...color,
            [e.target.name]: e.target.value
         })
      } else {
         setColor({
            ...color,
            [e.target.name]: { hex: e.target.value }
         })
      }
      // console.log(color)
   }

   const handleSubmit = e => {
      e.preventDefault()
      axiosWithAuth()
         .post(`/colors`, color)
         .then(res => {
            updateColors(res.data)
         })
         .catch(err => {
            console.log(err)
         })
   }
   return (
      <form onSubmit={handleSubmit}>
         <h5>Add New Color!</h5>
         <input onChange={handleChange} type='text' name='color' value={color.color} placeholder='color name!' />
         <input onChange={handleChange} name={'code'} type='color' value={color.code.hex} />
         <button type='submit'>Add</button>
      </form>
   );
}

export default ColorForm;