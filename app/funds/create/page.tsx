import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import DonationForm from '@/app/ui/donations/create-donation-form';
 
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
      <DonationForm/>
    </main>
  );
}
