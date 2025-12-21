import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../assets/Logos/App_Logo.png";

const navigation = [
  { name: "القرآن الكريم", href: "/quran", current: false },
  { name: "الأحاديث", href: "/hadith", current: false },
  { name: "مواقيت الصلاة", href: "/prayer-times", current: false },
  { name: "القبلة", href: "/qibla", current: false },
  { name: "الأذكار", href: "/azkar", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-emerald-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile button */}
          <div className="flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-emerald-800">
              <Bars3Icon className="block h-6 w-6 group-data-open:hidden" />
              <XMarkIcon className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="App Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-white tracking-wide">
                آجرنا
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:block">
            <div className="flex space-x-reverse space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    "text-white rounded-md px-3 py-2 text-sm font-medium transition"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
                "text-white rounded-md px-3 py-2 text-sm font-medium transition"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
