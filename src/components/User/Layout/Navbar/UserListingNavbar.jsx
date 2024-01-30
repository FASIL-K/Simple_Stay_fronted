import { Fragment, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../../../assets/logo.svg";
import TemporaryDrawer from "../SidebarHome/SideBar";
import { FiAlignJustify } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import avatar from "../../../../assets/profileavatar.png";
import { Button, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UserUrl } from "../../../../Constants/Constants";
import { Link } from "react-router-dom/dist";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderNavList = () => (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <button className="" onClick={toggleDrawer}>
          <div className="h-8 w-16 bg-white rounded-full flex justify-start mr-8">
            <FiAlignJustify className="text-black ml-2 mt-2" />
            <img className="h-6 mt-1 ml-1" src={avatar} alt="" />
          </div>
        </button>
      </li>
    </ul>
  );

  return (
    <Disclosure as="nav" className="bg-blue-900">
      {({ open }) => (
        <>
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={logo} alt="Your Company" />
                </div>
                </Link>
                <div className="hidden sm:ml-6 sm:block ml-2">
                  <Input
                    variant="standard"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex items-center gap-x-1">
                  <Link to="/user/userprofile/myactivity/">
                    <Button
                      variant="text"
                      size="sm"
                      className="hidden sm:inline-block"
                    >
                      <FaRegHeart className="h-6 w-9 mb-3 text-white" />
                    </Button>
                  </Link>
                  <div className="flex ml-auto mr-2 mt-3">
                    {renderNavList()}
                  </div>
                </div>
                <TemporaryDrawer isOpen={drawerOpen} onClose={toggleDrawer} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
