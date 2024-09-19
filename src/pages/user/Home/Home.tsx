import React from 'react'
import ItemProduct from '../../../layout/users/component/ItemProduct/ItemProduct';
import SliderTop from '../../../layout/users/component/SliderTop/SliderTop';
const Home = () => {
  return (
    <div>
      <SliderTop />
      <div className="container grid grid-cols-4 px-20 gap-3 mx-auto">
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />

      </div>
    </div>
  )
}

export default Home