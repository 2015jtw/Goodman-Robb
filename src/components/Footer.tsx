
export default async function Footer() {
  

  const currentYear = 2025;


  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          

          <h3 className="text-sm sm:text-base font-semibold text-center">
            © {currentYear} Martii LLC | All Rights Reserved
          </h3>
        </div>
      </div>
    </footer>
  );
}
