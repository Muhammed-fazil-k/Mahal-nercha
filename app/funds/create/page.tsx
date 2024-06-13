import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import NerchaDonationForm from '@/app/ui/donations/create-donation-form';
 
export default async function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Donations', href: '/funds' },
          {
            label: 'Add Donation',
            href: '/funds/create',
            active: true,
          },
        ]}
      />
      <NerchaDonationForm/>
    </main>
  );
}
