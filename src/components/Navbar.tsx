"use client";

// React/Next
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// UI
import { SiMinutemailer } from "react-icons/si";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  ListItem,
} from "@/components/ui/navigation-menu";

// Sanity
import { NavbarServicesQueryResult } from "../../sanity.types";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about-us" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "#contact-form" },
];
const home = navigation.find((item) => item.name === "Home");
const contact = navigation.find((item) => item.name === "Contact Us");

export default function Navbar({
  services,
  logo,
}: {
  services: NavbarServicesQueryResult;
  logo: string;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleMobileClick = () => {
    setMobileMenuOpen(false);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* desktop menu */}
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt="Image of your company Logo"
              src={logo}
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavigationMenu className="bg-background p-2 rounded-md shadow-md">
            <NavigationMenuList className="space-x-8">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} !text-base text-foreground font-medium`}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base text-foreground font-medium">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-1/2 transform -translate-x-1/2">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] z-50 bg-white">
                    {services.map((service) => {
                      return (
                        <ListItem
                          key={service._id}
                          title={service.title ?? ""}
                          href={`/services/${service.slug?.current}`}
                          className="hover:bg-blue-100"
                        >
                          {service.intro}
                        </ListItem>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="#about-us" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} !text-base text-foreground font-medium`}
                  >
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#pricing" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} !text-base text-foreground font-medium`}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} !text-base text-foreground font-medium`}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="#contact-form" className="group">
            <Button>
              Contact Us
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                <SiMinutemailer />
              </span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={handleMobileClick}>
              <span className="sr-only">Your Company</span>
              <Image
                alt="Image of your company Logo"
                src={logo}
                width={40}
                height={40}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {home && (
                  <Link
                    key={home.name}
                    href={home.href}
                    className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={handleMobileClick}
                  >
                    {home.name}
                  </Link>
                )}{" "}
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex w-full justify-between items-center px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Services
                  <ChevronDownIcon
                    className={`h-5 w-5 transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Services Dropdown */}
                {servicesOpen && (
                  <div className="ml-4 space-y-1">
                    {services.map((service) =>
                      service.slug?.current ? (
                        <Link
                          key={service._id}
                          href={`#${service.slug.current}`}
                          className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                          onClick={handleMobileClick}
                        >
                          {service.title}
                        </Link>
                      ) : null
                    )}
                  </div>
                )}
                {navigation.slice(1, -1).map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={handleMobileClick}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="py-6">
                {contact && (
                  <Link
                    href={contact.href}
                    key={contact.name}
                    onClick={handleMobileClick}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {contact.name}
                  </Link>
                )}{" "}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
