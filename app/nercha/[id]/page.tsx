import DonationsTable from '@/app/ui/donations/table';
import CreateDonationButton from '@/app/ui/donations/create-button';


export default async function NerchaDonationPage({params}:{params:{id:string}})  {
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Nercha Funds</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateDonationButton nerchaId={params.id}/>
      </div>
        <DonationsTable id={params.id}/>
    </div>
  )
}



