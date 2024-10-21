const people = [
  {
    name: "Ryan Robb",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "William Goodman",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];

export default function AboutUs() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Text Section */}
        <div className="max-w-2xl mx-auto text-center xl:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae
            elementum enim vitae ullamcorper suspendisse.
          </p>
        </div>

        {/* List Section */}
        <ul
          role="list"
          className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex flex-col items-center justify-center gap-x-6">
                <img
                  alt=""
                  src={person.imageUrl}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 text-center">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600 text-center">
                    {person.role}
                  </p>
                  <p className="text-base leading-7 text-gray-600 mt-4">
                    Ryan studied Environment and Law at McGill University, where
                    he developed a deep understanding of environmental policies
                    and legal frameworks. After his studies, he joined a
                    pioneering green hydrogen company, leveraging his expertise
                    to secure numerous government grants through his exceptional
                    grant writing skills. Ryan's work helped the company advance
                    its sustainable energy initiatives. Later, he transitioned
                    to the renewable energy sector, where he played a key role
                    in driving projects focused on clean energy transitions and
                    sustainable solutions.
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
