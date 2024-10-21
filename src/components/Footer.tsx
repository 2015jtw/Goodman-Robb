import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">Montreal Consultancy Group</h3>
            <Button
              variant="link"
              className="p-0 h-auto text-primary-foreground hover:text-primary-foreground/80"
              asChild
            >
              <Link
                href="mailto:john.doe@gmail.com"
                className="flex items-center"
              >
                <Mail className="mr-2 h-4 w-4" />
                john.doe@gmail.com
              </Link>
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/80 text-center">
            &copy; {new Date().getFullYear()} Montreal Consultancy Group. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
