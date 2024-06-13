import React from 'react'
import { fetchNerchaDonationsById } from '@/app/lib/data'
import DonationsTable from '@/app/ui/donations/table';
import { CreateDonation } from '@/app/ui/invoices/buttons';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';


export default async function NerchaDonationPage({params}:{params:{id:string}})  {
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Nercha Funds</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search invoices..." /> */}
        <CreateDonationButton id={params.id}/>
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

export function CreateDonationButton({id}:{id:string}) {
  console.log('Button Id');
  console.log(id);
  
  return (
    <Link
      href={`/nercha/${id}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

