import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">
            MTL Consultancy
          </CardTitle>
          <CardDescription className="text-accent">
            Card Description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Lorem Ipsum</p>
        </CardContent>
      </Card>
    </main>
  );
}
