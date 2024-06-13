import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import NerchaDonationForm from '@/app/ui/donations/create-donation-form';
import { fetchNerchaById } from '@/app/lib/data';
import { log } from 'console';
import { Nercha } from '@/app/lib/definitions';
 
export default async function CreateDonationPage({params}:{params:{id:string}}) { 
    const id =  params.id;
  const nerchaDetail = await fetchNerchaById(id);
  console.log(params);
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={
          nerchaDetail?
          [
          { label: `${nerchaDetail.nercha_name}`, href: '/nercha' },
          {
            label: 'Add Donation',
            href: `/nercha/${id}/create`,
            active: true,
          },
        ]:[]}
      />
      <NerchaDonationForm/>
    </main>
  );
}
