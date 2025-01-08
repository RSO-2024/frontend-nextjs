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
  const product = await getBestValueCarById(id);
  console.log(product);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {product.photos.map((image: any) => (
                  <Tab
                    key={image.id}
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden"
                  >
                    <span className="sr-only">Image</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        alt=""
                        src={image.img}
                        className="size-full object-cover"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500"
                    />
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels>
              {product.photos.map((image: any) => (
                <TabPanel key={image.id}>
                  <img
                    alt={"Photo"}
                    src={image.img}
                    className="aspect-square w-full object-cover sm:rounded-lg"
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                Possible price: {product.possiblePrice}
              </p>
            </div>

            {/* Reviews */}

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div>
                <div className="px-4 sm:px-0">
                  <h3 className="text-base/7 font-semibold text-gray-900">
                    Additional data
                  </h3>
                </div>
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        First Registration
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.firstReg}
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Mileage
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.mileage} km
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Fuel
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.fuel}
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Transmission
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.transmission}
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Power (kW)
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.kw} kW
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Engine Size
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.engineSize} cc
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        VIN
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.vin}
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Color
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.color}
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Location
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.location}
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Possible Price
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        €{product.possiblePrice}
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Delivery Price
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        €{product.deliveryPrice}
                      </dd>

                      <dt className="text-sm/6 font-medium text-gray-900">
                        Delivery Window
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {product.deliveryWindowStart} -{" "}
                        {product.deliveryWindowEnd}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <form className="mt-6">
              <div className="mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden sm:w-full"
                >
                  Contact us!
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
