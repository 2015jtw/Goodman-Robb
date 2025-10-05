"use client";

// React/Next
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// utils
import { cn } from "@/lib/utils";

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

type Props = {
  services: NavbarServicesQueryResult;
  logo: string;
  className?: string;
  secondClass?: string;
  thirdClass?: string;
};

const navigation = [
  { name: "About Us", href: "#about-us" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/#contact-form" },
] as const;

export default function Navbar({
  services,
  logo,
  className,
  secondClass,
  thirdClass,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sanitizedServices = (Array.isArray(services) ? services : []).filter(
    (service) => !!service && !!service.slug?.current
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileOpen);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-shadow bg-white/70 backdrop-blur",
        mounted &&
          scrolled &&
          "bg-white/85 border-b border-slate-200 shadow-sm backdrop-blur",
        className
      )}
    >
      {/* desktop menu */}
      <nav
        aria-label="Global"
        className={cn(
          "flex items-center justify-between px-12 lg:px-16 p-4",
          secondClass
        )}
      >
        <div className="flex lg:flex-1 lg:justify-center">
          <Link
            href="/"
            className="-m-1.5 p-1.5 flex items-center gap-2"
            aria-label="Martii"
          >
            <Image
              alt="Image of your company Logo"
              src={logo}
              width={40}
              height={40}
              className="h-10 w-10 rounded"
            />
            <span className="text-[1.4rem] font-semibold text-gray-900">Martii</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white/70 text-slate-700 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Open main menu"
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavigationMenu
            className={cn("bg-background p-2 rounded-md shadow-md", thirdClass)}
          >
            <NavigationMenuList className="space-x-8">
              
              <NavigationMenuItem>
            <NavigationMenuTrigger className="text-[1.25rem] text-foreground font-medium">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-1/2 transform -translate-x-1/2">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] z-50 bg-white">
                    {sanitizedServices.map((service) => {
                      const href = `/services/${service.slug!.current}`;
                      return (
                        <ListItem
                          key={service._id}
                          title={service.title ?? ""}
                          href={href}
                          className="hover:bg-blue-50"
                        >
                          {service.navbarSubtitle && (
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {service.navbarSubtitle}
                            </p>
                          )}
                        </ListItem>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="#about-us" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} !text-[1.25rem] text-foreground font-medium`}
                  >
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#pricing" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} !text-[1.25rem] text-foreground font-medium`}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} !text-[1.25rem] text-foreground font-medium`}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <Link href="/#contact-form" className="group">
            <Button className="text-[1.25rem]" size="nav">
              Get in Touch
              <span className="ml-2 inline-flex transform transition-transform duration-300 group-hover:translate-x-1">
                <SiMinutemailer />
              </span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileOpen}
        onClose={setMobileOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/20" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-xl sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5 flex items-center gap-2"
              onClick={closeMobile}
              aria-label="Martii"
            >
              <Image
                alt="Image of your company Logo"
                src={logo}
                width={40}
                height={40}
                className="h-10 w-10 rounded"
              />
              <span className="text-[1.4rem] font-semibold text-gray-900">Martii</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close menu"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                
                <button
                  onClick={() => setServicesOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-[1.25rem] font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services"
                >
                  Services
                  <ChevronDownIcon
                    className={cn(
                      "h-5 w-5 transition-transform",
                      servicesOpen ? "rotate-180" : ""
                    )}
                  />
                </button>
                {servicesOpen && (
                  <div id="mobile-services" className="ml-4 space-y-1">
                    {sanitizedServices.map((service) => (
                      <Link
                        key={service._id}
                        href={`/services/${service.slug!.current}`}
                        className="block rounded-md px-3 py-2 text-[1.25rem] font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={closeMobile}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
                {navigation.slice(1, -1).map((item) => (
                  <Link
                    href={item.href}
                    key={item.name}
                    className="block rounded-md px-3 py-2 text-[1.25rem] font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={closeMobile}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="py-6">
                <Link
                  href="/#contact-form"
                  onClick={closeMobile}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-[1.25rem] font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
