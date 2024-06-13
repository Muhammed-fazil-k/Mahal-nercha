import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency, formatTimeStampDate } from '@/app/lib/utils';
import { fetchNerchaDonationsById } from '@/app/lib/data';

export default async function DonationsTable({id}:{id:string}) {
  //const invoices = await fetchFilteredInvoices(query, currentPage);  
  const donations = await fetchNerchaDonationsById(id);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {donations?.map((donation) => (
              <div
                key={donation.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className='text-lg'>{donation.name}</p>
                    </div>
                      <p className='text-sm text-gray-500'>C/O - {donation.care_of}</p>
                  </div>
                  <InvoiceStatus status={donation.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-lg font-medium">
                      {formatCurrency(donation.amount)}
                    </p>
                    <p className='text-sm text-gray-500'>{formatTimeStampDate(donation.donated_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={donation.id} />
                    <DeleteInvoice id={donation.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  C/O
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {donations?.map((donation) => (
                <tr
                  key={donation.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      
                      <p>{donation.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {donation.care_of}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(donation.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTimeStampDate(donation.donated_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={donation.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={donation.id} />
                      <DeleteInvoice id={donation.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
