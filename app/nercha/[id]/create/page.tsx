import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import NerchaDonationForm from '@/app/ui/donations/create-donation-form';
import { fetchNerchaById } from '@/app/lib/data';
import { log } from 'console';
 
export default async function CreateDonationPage({params}:{params:{id:string}}) { 
    const id =  params.id;
  const nerchaDetail = await fetchNerchaById(id);
  console.log('nerchaDetail');
  
  console.log(nerchaDetail);
  
  console.log(params);
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: `${nerchaDetail.nercha_name}`, href: '/nercha' },
          {
            label: 'Add Donation',
            href: `/nercha/${id}/create`,
            active: true,
          },
        ]}
      />
      <NerchaDonationForm/>
    </main>
  );
}
