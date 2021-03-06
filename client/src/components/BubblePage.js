import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import ColorForm from './ColorForm'
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
   const [colorList, setColorList] = useState([]);
   // fetch your colors data from the server when the component mounts
   // set that data to the colorList state property
   useEffect(() => {
      axiosWithAuth()
         .get(`/colors`)
         .then(res => {
            console.log(res)
            setColorList(res.data)
         })
         .catch(err => {
            console.log('ERROR', err)
         })
   }, [])

   return (
      <>
         <ColorList colors={colorList} updateColors={setColorList} />
         <Bubbles colors={colorList} />
         <ColorForm updateColors={setColorList} />
      </>
   );
};

export default BubblePage;
