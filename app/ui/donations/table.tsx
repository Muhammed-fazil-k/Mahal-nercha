'use client';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import {
  formatDateToLocal,
  formatCurrency,
  formatTimeStampDate,
  formatTimeStampTillDate,
} from '@/app/lib/utils';
import {
  fetchFirstNerchaDonations,
  fetchMoreNerchaDonations,
} from '@/app/lib/data';
import { useEffect, useState } from 'react';
import { Donation, Timestamp } from '@/app/lib/definitions';

export default function DonationsTable({ id }: { id: string }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [lastKey, setLastKey] = useState<Timestamp>({
    seconds: 0,
    nanoseconds: 0,
  });
  const [nextDons_loading, setNextDonsLoading] = useState(false);

  console.log(lastKey);

  useEffect(() => {
    fetchFirstNerchaDonations(id)
      .then((res) => {
        setDonations(res.donations);
        setLastKey(res.lastDonationDate);
      })
      .catch((err) => {
        console.log('Couldnt fetch first data');
      });
  }, []);
  const fetchMoreDonations = (key: Timestamp) => {
    if (key.seconds != 0) {
      setNextDonsLoading(true);
      fetchMoreNerchaDonations(id, key)
        .then((res) => {
          setLastKey(res.lastDonationDate);
          // add new posts to old posts
          setDonations(donations.concat(res.donations));
          setNextDonsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setNextDonsLoading(false);
        });
    }
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          <div className="md:hidden">
            {donations?.map((donation) => (
              <div
                key={donation.id}
                className="mb-5 w-full rounded-md border-t-2 bg-white p-4 drop-shadow-md"
              >
                <div className="flex items-center justify-between ">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="text-lg font-medium">{donation.name}</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      C/O - {donation.care_of}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatTimeStampTillDate(donation.donated_at)}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-row gap-4 pb-3">
                      <p className="px-2 text-lg font-medium">
                        {formatCurrency(donation.amount)}
                      </p>
                      <InvoiceStatus status={donation.status} />
                    </div>

                    <div className="flex justify-end gap-2">
                      <UpdateInvoice id={donation.id} />
                      <DeleteInvoice id={donation.id} />
                    </div>
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
      <div style={{ textAlign: 'center' }}>
        {nextDons_loading ? (
          <p>Loading..</p>
        ) : lastKey.seconds != 0 ? (
          <button onClick={() => fetchMoreDonations(lastKey)}>
            More Donations
          </button>
        ) : (
          <span>You are up to date!</span>
        )}
      </div>
    </div>
  );
}
