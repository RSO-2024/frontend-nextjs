"use client"; // Ensure this is the very first line with no preceding whitespace or comments

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { supabase, fetchUser, fetchToken } from "@/app/client";
// Import the getBestValueCarById function directly
import { getBestValueCarById } from "@/lib/getBestValueFilters";
import { set } from "date-fns";

// Define TypeScript interfaces for type safety
interface Photo {
  id: string;
  img: string;
}

interface Product {
  title: string;
  possiblePrice: number;
  deliveryPrice: number;
  deliveryWindowStart: string;
  deliveryWindowEnd: string;
  photos: Photo[];
  firstReg: string;
  mileage: number;
  fuel: string;
  transmission: string;
  kw: number;
  engineSize: number;
  vin: string;
  color: string;
  location: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BestValueClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const auctionFee = 1000;

  const handleInserts = (payload: any) => {
    console.log("Change received!", payload);
    setNewPrice(payload.new.possiblePrice);
    console.log(payload.new.possiblePrice);
  };
  supabase
    .channel("auction_listings")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "auction_listings" },
      handleInserts
    )
    .subscribe();

  useEffect(() => {
    if (!id || typeof id !== "string") {
      setError("Invalid product ID.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const user = await fetchUser();
        if (user) {
          setUserId(user.id);
        } else {
          setUserId(null);
        }
        if (user && user.id) {
          const { data: existingEntry } = await supabase
            .from("auction_favorites")
            .select("*")
            .eq("listing_id", id)
            .eq("user_id", user?.id)
            .single();
          if (existingEntry) {
            setFavorite(true);
          }
        }

        const token = await fetchToken();
        // Directly call getBestValueCarById
        const data: Product | null = await getBestValueCarById(
          id as string,
          token
        );
        setNewPrice(data!.possiblePrice);
        if (!data) {
          throw new Error("Product not found.");
        }
        setProduct(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No product found.</p>
      </div>
    );
  }

  const handleBidSubmit = () => {
    const finalCost = bidAmount + auctionFee + product!.deliveryPrice;
    // alert(`Your final cost will be €${finalCost.toLocaleString()}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {product.photos.map((image) => (
                  <Tab
                    key={image.id}
                    className={({ selected }) =>
                      classNames(
                        "group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-none",
                        selected ? "ring-indigo-500" : "ring-transparent"
                      )
                    }
                  >
                    <span className="sr-only">Image</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        alt={`Photo of ${product.title}`}
                        src={image.img}
                        className="w-full h-full object-cover"
                      />
                    </span>
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels>
              {product.photos.map((image) => (
                <TabPanel key={image.id}>
                  <img
                    alt={`Photo of ${product.title}`}
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
              {product.possiblePrice ? (
                <p className="text-3xl tracking-tight text-gray-900">
                  Possible price: €{newPrice!.toLocaleString()}
                </p>
              ) : (
                <p className="text-3xl tracking-tight text-gray-900">
                  Please{" "}
                  <a
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    log in
                  </a>{" "}
                  to see the price.
                </p>
              )}
            </div>

            {/* Additional Data */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div>
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold text-gray-900">
                    Additional Data
                  </h3>
                </div>
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      {/* Repeat for each data field */}
                      <DataField
                        label="First Registration"
                        value={product.firstReg}
                      />
                      <DataField
                        label="Mileage"
                        value={`${product.mileage.toLocaleString()} km`}
                      />
                      <DataField label="Fuel" value={product.fuel} />
                      <DataField
                        label="Transmission"
                        value={product.transmission}
                      />
                      <DataField
                        label="Power (kW)"
                        value={`${product.kw} kW`}
                      />
                      <DataField
                        label="Engine Size"
                        value={`${product.engineSize} cc`}
                      />
                      <DataField label="VIN" value={product.vin} />
                      <DataField label="Color" value={product.color} />
                      <DataField label="Location" value={product.location} />
                      {product.possiblePrice && (
                        <DataField
                          label="Possible Price"
                          value={`€${newPrice!.toLocaleString()}`}
                        />
                      )}
                      {product.deliveryPrice && (
                        <DataField
                          label="Delivery Price"
                          value={`€${product.deliveryPrice.toLocaleString()}`}
                        />
                      )}
                      <DataField
                        label="Delivery Window"
                        value={`${product.deliveryWindowStart} - ${product.deliveryWindowEnd}`}
                      />
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            {userId && (
              <form className="mt-6">
                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:w-full"
                  >
                    Contact us!
                  </button>
                  {product.possiblePrice && (
                    <button
                      type="button"
                      className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      onClick={async () => {
                        if (favorite) {
                          const { data, error } = await supabase
                            .from("auction_favorites")
                            .delete()
                            .eq("id", id);
                          console.log(data, error);
                          if (!error) {
                            setFavorite(false);
                          }
                        } else {
                          const { data, error } = await supabase
                            .from("auction_favorites")
                            .insert([{ listing_id: id, user_id: userId }]);
                          console.log(data, error);
                          if (!error) {
                            setFavorite(true);
                          }
                        }
                      }}
                    >
                      {favorite ? (
                        <SolidHeartIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-red-500"
                        />
                      ) : (
                        <OutlineHeartIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-gray-400"
                        />
                      )}

                      <span className="sr-only">Toggle favorite</span>
                    </button>
                  )}
                </div>
              </form>
            )}

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
              {/* You can add more details here if needed */}
            </section>

            {/* Bid Submission */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                New bid
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-900 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                    €
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                  <div
                    id="price-currency"
                    className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
                  >
                    EUR
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {`Final value: ${(bidAmount+1000+product.deliveryPrice).toFixed(2)} EUR`}
                </p>
              </div>
              <button
                type="button"
                onClick={handleBidSubmit}
                className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for data fields
interface DataFieldProps {
  label: string;
  value: string;
}

function DataField({ label, value }: DataFieldProps) {
  return (
    <>
      <dt className="text-sm font-medium text-gray-900">{label}</dt>
      <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </>
  );
}
