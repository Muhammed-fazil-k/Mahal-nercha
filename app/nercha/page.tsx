import Link from "next/link";
import { fetchNercha } from "../lib/data";
import { Nercha, Timestamp } from "../lib/definitions";
import { formatTimeStampDate, formatTimeStampTillDate } from "../lib/utils";
import NerchaCard from "../ui/nercha/NerchaCard";

export default async function NerchasPage() {
  const nerchas = await fetchNercha();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Nercha</h1>
      </div>
      <div className="mt-4 flex items-center justify-items-start gap-2 md:mt-8">

      {nerchas?.map(nercha =>
        <NerchaCard key={nercha.id} id={nercha.id} title={nercha.nercha_name}
        nerchaDate={nercha.nercha_date}
        active={nercha.active}
        />
        )}
      </div>
    </div>
  )
}

