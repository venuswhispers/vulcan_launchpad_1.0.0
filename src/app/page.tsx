import Image from "next/image";
import Header from '@/components/dashboard/header';
import Filter from "@/components/dashboard/filter";
import dynamic from "next/dynamic";


const Card = dynamic(() => import("@/components/dashboard/card"), {ssr: false});

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Header/>
      <Filter/>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 c1200:grid-cols-3 c1450:grid-cols-4">
        { [1,2,3,4,5,6].map(item => <Card key={item}/>) }
      </div>
    </div>
  );
}
