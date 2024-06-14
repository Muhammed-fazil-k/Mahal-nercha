'use client'
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import {State, createDonation} from '@/app/lib/actions'

export default function NerchaDonationForm({nerchaId}:{nerchaId:string}) {  
  const initialState:State = {message:null,errors:{},nerchaId:nerchaId || ''};
  const [state,dispatch] = useFormState(createDonation,initialState);
  const clusters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Donor Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Donor Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                step="0.01"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
        </div>

        {/* Care of */}
        <div className="mb-4">
          <label htmlFor="care_of" className="mb-2 block text-sm font-medium">
            C/O
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="care_of"
                name="care_of"
                type="string"
                step="0.01"
                placeholder="Enter c/o"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.care_of &&
          state.errors.care_of.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
        </div>
        {/* Cluster */}
    <div className="mb-4">
      <label htmlFor="cluster" className="mb-2 block text-sm font-medium">
        Choose cluster
      </label>
      <div className="relative">
        <select
          id="cluster"
          name="clusterId"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          aria-describedby="customer-error"
        >
          <option value="" disabled>
            Select a Cluster
          </option>
          {clusters.map((cluster) => (
            <option key={cluster} value={cluster}>
              {cluster}
            </option>
          ))}
        </select>
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.clusterId &&
          state.errors.clusterId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      </div>

        {/* Donation Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.amount &&
          state.errors.amount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.status &&
          state.errors.status.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton/>
      </div>
    </form>
  );
}

function SubmitButton (){
  const {pending} = useFormStatus(); 
  return (

    <Button className='' type="submit" disabled={pending}>{pending ? 'Submitting':'Submit'}</Button>
  )

}