import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import logo from "../assets/Logos/App_Logo.png";

const navigation = [
  { name: "القرآن الكريم", href: "/quran" },
  { name: "حديث اليوم", href: "/hadith" },
  { name: "مواقيت الصلاة", href: "/prayer-times" },
  { name: "القبلة", href: "/qibla" },
  { name: "الأذكار", href: "/azkar" },
];

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-emerald-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Mobile menu icon — LEFT */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white transition hover:bg-emerald-800">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo — RIGHT on mobile / LEFT on desktop */}
              <div className="flex flex-1 justify-end sm:justify-start items-center">
                <Link to="/" className="flex items-center gap-2">
                  <img src={logo} alt="App Logo" className="h-8 w-auto" />
                  <span className="text-xl font-bold text-white">آجرنا</span>
                </Link>
              </div>

              {/* Desktop menu */}
              <div className="hidden sm:block">
                <div className="flex space-x-4 space-x-reverse">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="rounded-md px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu with transition */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <DisclosurePanel className="sm:hidden bg-emerald-900">
              <div className="space-y-1 px-4 pb-4 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-white transition hover:bg-emerald-800"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
