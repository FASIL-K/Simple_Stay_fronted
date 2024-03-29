/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { HorizontalCard } from "./PropertyCard";
import axios from "axios";
import { UserUrl } from "../../../constants/constants";
import { useLocation } from "react-router-dom";
import { Input } from "@material-tailwind/react";

const sortOptions = [
  { name: "Oldest", value: "created_at" },
  { name: "Newest", value: "-created_at" },
  { name: "Price: Low to High", value: "monthly_rent" },
  { name: "Price: High to Low", value: "-monthly_rent" },
];

const filters = [
  {
    id: "BHK",
    name: "BHK",
    options: [
      { value: "1 BHK", label: "1 BHK", checked: false },
      { value: "2 BHK", label: "2 BHK", checked: false },
      { value: "3 BHK", label: "3 BHK", checked: false },
    ],
  },
  {
    id: "PropertyType",
    name: "PropertyType",
    options: [
      { value: "Apartment", label: "Apartment", checked: false },
      {
        value: "Independent Floor",
        label: "Independent Floor",
        checked: false,
      },
    ],
  },
  {
    id: "FurnishType",
    name: "FurnishType",
    options: [
      { value: "Fully Furnished", label: "Fully Furnished", checked: false },
      { value: "Semi Furnished", label: "Semi Furnished", checked: false },
      { value: "Unfurnished", label: "Un Furnished", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterBar({ postData, setPostData }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const type = queryParams.get("type");
  console.log(city, type, "ssssssssssssssssssssssss");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    BHK: [], // Default to an empty array
    PropertyType: [], // Default to an empty array
    FurnishType: [], // Default to an empty array
  });

  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const handleSortChange = (option) => {
    setSelectedSortOption(option);
  };

  console.log(selectedSortOption, "edeededd");

  const searchPost = async (keyword) => {
    if (keyword !== "") {
      try {
      const cityParam = city ? `city=${city}` : '';
      const typeParam = type ? `type=${type}` : '';
      const request = await axios.get(
        `${UserUrl}user/filterpost/?search=${keyword}&${cityParam}&${typeParam}`
      );
      const postData = request.data;
      setPostData(postData);
      } catch (error) {
        console.error("Error searching for users:", error);
        toast.error("An error occurred while searching for users.");
      }
    } else {
      // Handle case when keyword is empty
    }
  };

  const fetchDatas = async () => {
    try {
      // Construct the URL with the selected sort option and filters
      const sortParam = selectedSortOption
        ? `ordering=${selectedSortOption}`
        : "";
      const bhkFilter =
        selectedFilters.BHK.length > 0
          ? `bhk_type=${selectedFilters.BHK.join(",")}`
          : "";
      const propertyTypeFilter =
        selectedFilters.PropertyType.length > 0
          ? `property_type=${selectedFilters.PropertyType.join(",")}`
          : "";
      const furnishTypeFilter =
        selectedFilters.FurnishType.length > 0
          ? `furnished_type=${selectedFilters.FurnishType.join(",")}`
          : "";
      // Construct the city and type query parameters
      const cityParam = city ? `city=${city}` : "";
      const typeParam = type ? `type=${type}` : "";
      const filtersQueryString = [
        bhkFilter,
        propertyTypeFilter,
        furnishTypeFilter,
        cityParam,
        typeParam,
      ]
        .filter(Boolean)
        .join("&");

      const response = await axios.get(
        `${UserUrl}user/filterpost/?${filtersQueryString}&${sortParam}`
      );
      setPostData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [selectedSortOption, selectedFilters, setPostData]);

  console.log(selectedFilters, "fdsafdad");

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      checked={selectedFilters[
                                        section.id
                                      ].includes(option.value)}
                                      onChange={() =>
                                        handleFilterChange(
                                          section.id,
                                          selectedFilters[section.id].includes(
                                            option.value
                                          )
                                            ? selectedFilters[
                                                section.id
                                              ].filter(
                                                (value) =>
                                                  value !== option.value
                                              )
                                            : [
                                                ...selectedFilters[section.id],
                                                option.value,
                                              ]
                                        )
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 position-relative overflow-hidden sticky">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight  text-gray-900">
              Filter
            </h1>

            <div className="flex bg-blue-gray-50 rounded">
              <Input
                variant="standard"
                placeholder="Search"
                onChange={(e) => searchPost(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? "bg-gray-100 cursor-pointer" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => handleSortChange(option.value)}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={(
                                    selectedFilters[section.id] || []
                                  ).includes(option.value)}
                                  onChange={() =>
                                    handleFilterChange(
                                      section.id,
                                      (
                                        selectedFilters[section.id] || []
                                      ).includes(option.value)
                                        ? (
                                            selectedFilters[section.id] || []
                                          ).filter(
                                            (value) => value !== option.value
                                          )
                                        : [
                                            ...(selectedFilters[section.id] ||
                                              []),
                                            option.value,
                                          ]
                                    )
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Check if postData is empty */}
                {postData?.length === 0 ? (
                  <div className="text-center text-gray-600 py-8">
                    No posts found matching the selected filters.
                  </div>
                ) : (
                  <div className="max-h-[500px] overflow-y-auto">
                    {/* Render HorizontalCard component with postData */}
                    <HorizontalCard
                      postData={postData}
                      setPostData={setPostData}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
