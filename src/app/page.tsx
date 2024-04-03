import Image from "next/image";
import Header from '@/components/dashboard/header';
import Filter from "@/components/dashboard/filter";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Header/>
      <Filter/>
    </div>
  );
}
