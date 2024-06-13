import Link from "next/link";
import { fetchNercha } from "../lib/data";
import { Timestamp } from "../lib/definitions";
import { formatTimeStampDate, formatTimeStampTillDate } from "../lib/utils";

export default async function NerchasPage() {
  const nerchas = await fetchNercha();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Nercha</h1>
      </div>
      <div className="mt-4 flex items-center justify-items-start gap-2 md:mt-8">

      {nerchas?.map(nercha =>
        <NerchaCard id={nercha.id} title={nercha.nercha_name}
        nerchaDate={nercha.nercha_date}
        active={nercha.active}
        />
        )}
      </div>
    </div>
  )
}


export function NerchaCard({
  id,
  title,
  nerchaDate,
  active,
}: {
  id: string;
  title: string;
  nerchaDate: Timestamp;
  active: boolean;
}) {
  return (
    <>


    {active ? (
      <Link href={`/nercha/${id}`}>
       <div className="rounded-xl bg-grey-500 p-2 shadow-sm m-2 border-solid border-2 border-blue-600">
       <div className="flex px-2">
         <p className="text-sm">{formatTimeStampTillDate(nerchaDate)}</p>
       </div>
       <h3 className="truncate rounded-xl bg-white py-2 ml-2 text-lg font-medium">{title}</h3>
     </div>
      </Link>
    ):(
      <div className="rounded-xl bg-grey-500 p-2 shadow-sm m-2 border-solid border-2 border-blue-600">
      <div className="flex px-2">
        <p className="text-sm">{formatTimeStampTillDate(nerchaDate)}</p>
      </div>
      <h3 className="truncate rounded-xl bg-white py-2 ml-2 text-lg font-medium">{title}</h3>
    </div>
    )
    }
    
    </>
  );
}
