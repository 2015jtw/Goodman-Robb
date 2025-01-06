import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Pricing() {
  return (
    <section className="w-full pb-32" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our pricing is tailored to meet the unique needs of each client.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[900px] mt-12">
          <Card className="relative overflow-hidden shadow-md">
            <CardHeader className="space-y-1 md:space-y-2">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Flexible Solutions for Every Organization
              </CardTitle>
              <CardDescription className="text-base md:text-lg">
                We understand that every organization is different, and we are
                committed to providing flexible solutions that align with your
                specific requirements and budget.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:gap-6">
              <div className="grid gap-4 md:gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold leading-none">Who We Serve</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Whether you are a startup, a growing company, or an
                    established enterprise, we can work with you to develop a
                    pricing plan that fits your stage of growth and funding
                    goals.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold leading-none">
                    Customized Pricing
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    To learn more about our pricing and how we can support your
                    clean energy and technology grant writing needs, please
                    contact us. Our team is ready to discuss your project and
                    provide a customized quote that ensures you receive the best
                    value for our services.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-h-[60px] items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <p className="text-md font-medium">
                  We look forward to partnering with you to achieve your funding
                  and ESG objectives!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
