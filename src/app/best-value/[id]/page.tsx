import BestValueClient from "@/app/components/ui/BestValueClient";
import { getBestValueCarById } from "@/lib/getBestValueFilters";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";

interface Params {
  id: string;
}
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
export default async function Page({ params }: { params: Params }) {
  const id = (await params).id;
  console.log(id);


  return (
    <BestValueClient id={id} />
  );
}
