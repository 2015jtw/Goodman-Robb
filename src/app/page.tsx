import HeroSection from "@/components/HeroSection";
import ImageWithText from "@/components/ImageWithText";
import AboutUs from "@/components/AboutUs";
import HomepageForm from "@/components/HomepageForm";

const servicesData = [
  {
    title: "Crisis Leadership",
    description:
      "Our philosophy is to empower leaders to be well-prepared well in advance of crises that inevitably come their way. Just as an athlete is disciplined in their training in preparation for competition, so too must leaders realistically train for the disruptions that accompany crisis environments. Our process involves candid conversations around the vulnerabilities your organization faces and the development of strategies you can employ to pragmatically mitigate those vulnerabilities. For our listed clients, we support the refinement of mitigation strategies in the context of your 10K Section 1a, as well as vulnerabilities not typically encompassed in financial disclosures.",
    cta: "Learn More",
    link: "crisis-leadership",
    image: "/images/test-photo.jpg",
  },
  {
    title: "Crisis Communication",
    description:
      "Communicating effectively in a crisis is crucial and not without risk. You have many audiences, internal and external that demand information in a crisis. The time to frame these messages is not in the midst of disaster and these messages are often quite different in tone, yet must be consistent. Gone are the days of “no comment” with the false hope of limiting litigation liability. We offer a unique approach to developing a comprehensive crisis communications strategy and specific messaging tactics.",
    cta: "Learn More",
    link: "crisis-communication",
    image: "/images/test-photo.jpg",
  },
  {
    title: "Business Continuity",
    description:
      "Business continuity has dramatically grown in importance among innovative firms that recognize the critical need of maintaining key functionality in disruptive environments. The global pandemic amplified the need for robust continuity plans. Our team provides guidance, innovative solutions, and functional assessment services in order to reinforce your frameworks for survival. We can support a clean-slate approach from start-up to a comprehensive maturity framework to augment the continuous improvement culture of a mature organization.",
    cta: "Learn More",
    link: "test",
    image: "/images/test-photo.jpg",
  },
  {
    title: "Assessments",
    description:
      "Our team can provide senior leadership and boards with an assessment of both the operational capabilities and overall strategic plans associated with crisis management, business continuity, as well as vulnerability assessments. We work closely with your team to accurately assess your strengths, vulnerabilities, capabilities, and co-create a map for continuous improvement in these domains.",
    cta: "Learn More",
    link: "test2",
    image: "/images/test-photo.jpg",
  },
  {
    title: "Risk Management",
    description:
      "The storm has arrived…you are in the midst of a crisis that may be escalating rapidly with dire consequences. We stand ready to assist you in plotting both immediate actions and emergent strategies for recovery. Crisis response is comprised of operational tactics, coupled with strategic planning around recovery and innovative course corrections. This is difficult, often costly and highly disruptive. We can help you navigate the storm.",
    cta: "Learn More",
    link: "test3",
    image: "/images/test-photo.jpg",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto ">
      <HeroSection />
      <div className="flex flex-col gap-30 w-full container mx-auto px-4">
        {servicesData.map((service, idx) => {
          return (
            <ImageWithText
              key={idx}
              title={service.title}
              description={service.description}
              cta={service.cta}
              link={service.link}
              image={service.image}
              swap={idx % 2 === 0}
              id={service.link}
            />
          );
        })}
      </div>
      <AboutUs />
      <HomepageForm />
    </main>
  );
}
