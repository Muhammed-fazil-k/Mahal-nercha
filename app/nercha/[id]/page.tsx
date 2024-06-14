import DonationsTable from '@/app/ui/donations/table';
import CreateDonationButton from '@/app/ui/donations/create-button';
import Search from '@/app/ui/search';

export default async function NerchaDonationPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Nercha Funds</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search Donations..." /> */}
        <CreateDonationButton nerchaId={params.id} />
      </div>
      <DonationsTable id={params.id} />
    </div>
  );
}
