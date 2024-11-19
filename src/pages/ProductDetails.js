import { Rating } from '@mui/material'
import React from 'react'

function ProductDetails() {
  return (
    <>
      <section className='py-[45px] px-0'>
        <div className='container'>
          <p className='capitalize font-semibold text-xl'>Field Roast Chao Cheese Creamy Original</p>
          <p className="text-gray-500 mb-7 flex items-center gap-4">
  <span>
    Brand: <span className="font-semibold">ABC</span>
  </span>
  <span>|</span>
  <span className="flex items-center">
    <Rating
      readOnly
      value={5}
      size="small"
      precision={0.5}
      className="pr-1"
    />
    <span className="font-semibold">Review</span>
  </span>
  <span>|</span>
  <span>
    SKU: <span className="font-semibold">ABC</span>
  </span>
</p>

        </div>
      </section>
    </>
  );
}

export default ProductDetails;
