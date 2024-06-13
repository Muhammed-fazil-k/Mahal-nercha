import { Timestamp } from "@/app/lib/definitions";
import { formatTimeStampTillDate } from "@/app/lib/utils";
import Link from "next/link";

export default function NerchaCard({
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
  