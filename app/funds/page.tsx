import React from 'react'
import { fetchNerchaDonations } from '../lib/data'
import DonationsTable from '../ui/donations/table';
import { CreateDonation, CreateInvoice } from '../ui/invoices/buttons';

const page = async ({
  searchParams
}:{
  searchParams?:{
    query?:string;
    page?:string;
  }
}) => {
  //console.log(searchParams);
  
  const nerchaDonations = await fetchNerchaDonations();
  console.log(nerchaDonations);
  
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Nercha Funds</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search invoices..." /> */}
        <CreateDonation />
      </div>
       {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
        <DonationsTable/>
      {/* </Suspense> */}
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div> */}
    </div>
  )
}

export default page
