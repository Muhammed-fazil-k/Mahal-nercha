import DonationsTable from '@/app/ui/donations/table';
import CreateDonationButton from '@/app/ui/donations/create-button';
import Search from '@/app/ui/search';
import { fetchNerchaById } from '@/app/lib/data';
import CardWrapper from '@/app/ui/dashboard/cards';

export default async function NerchaDonationPage({
  params,
}: {
  params: { id: string };
}) {
  const nercha = await fetchNerchaById(params.id);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>{nercha?.nercha_name}</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search Donations..." /> */}
        <CreateDonationButton nerchaId={params.id} />
      </div>
      <div className="mt:8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardWrapper id={params.id} />
      </div>
      <DonationsTable id={params.id} />
    </div>
  );
}
