import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import NerchaDonationForm from '@/app/ui/donations/create-donation-form';
import { fetchDonationById, fetchNerchaById } from '@/app/lib/data';
import NerchaDonationEditForm from '@/app/ui/donations/edit-donation-form';

export default async function EditDonationPage({
  params,
}: {
  params: { id: string; donationId: string };
}) {
  console.log(params.id);

  //const id = params.id;
  const donation = await fetchDonationById(params.donationId);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: `Nercha`, href: `/nercha/${params.id}` },
          {
            label: 'Edit Donation',
            href: `/nercha/${params.id}/${params.donationId}/edit`,
            active: true,
          },
        ]}
      />
      <NerchaDonationEditForm donation={donation} nerchaId={params.id} />
    </main>
  );
}
