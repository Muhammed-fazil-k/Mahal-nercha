import React from 'react'
import { fetchNerchaDonations } from '../lib/data'

const page = async () => {
  const nerchaDonations = await fetchNerchaDonations();
  console.log('Page log');
  console.log(nerchaDonations);
  
  
  return (
    <div>
      Funds
    </div>
  )
}

export default page
