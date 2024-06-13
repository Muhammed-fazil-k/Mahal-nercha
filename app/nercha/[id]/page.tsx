import React from 'react'
import { fetchNerchaDonationsById } from '@/app/lib/data'
import DonationsTable from '@/app/ui/donations/table';
import { CreateDonation } from '@/app/ui/invoices/buttons';


export default async function NerchaDonationPage({params}:{params:{id:string}})  {
  
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
        <DonationsTable id={params.id}/>
      {/* </Suspense> */}
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div> */}
    </div>
  )
}

