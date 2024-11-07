import MultipleBarChart from "@/components/BarGraph";
import React from "react";

export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export const servicesData = [
  {
    title: "Crisis Leadership",
    description:
      "Our philosophy is to empower leaders to be well-prepared well in advance of crises that inevitably come their way. Just as an athlete is disciplined in their training in preparation for competition, so too must leaders realistically train for the disruptions that accompany crisis environments. Our process involves candid conversations around the vulnerabilities your organization faces and the development of strategies you can employ to pragmatically mitigate those vulnerabilities. For our listed clients, we support the refinement of mitigation strategies in the context of your 10K Section 1a, as well as vulnerabilities not typically encompassed in financial disclosures.",
    routingroutingLink: "crisis-leadership",
    contactCTA: "Get in Touch",
    image: "/images/test-photo.jpg",
    imageAlt: "Crisis Leadership Image",
  },
  {
    title: "Crisis Communication",
    description:
      "Communicating effectively in a crisis is crucial and not without risk. You have many audiences, internal and external that demand information in a crisis. The time to frame these messages is not in the midst of disaster and these messages are often quite different in tone, yet must be consistent. Gone are the days of “no comment” with the false hope of limiting litigation liability. We offer a unique approach to developing a comprehensive crisis communications strategy and specific messaging tactics.",
    routingLink: "crisis-communication",
    contactCTA: "Get in Touch",
    image: "/images/test-photo.jpg",
    imageAlt: "Crisis Communication Image",
  },
  {
    title: "Business Continuity",
    description:
      "Business continuity has dramatically grown in importance among innovative firms that recognize the critical need of maintaining key functionality in disruptive environments. The global pandemic amplified the need for robust continuity plans. Our team provides guidance, innovative solutions, and functional assessment services in order to reinforce your frameworks for survival. We can support a clean-slate approach from start-up to a comprehensive maturity framework to augment the continuous improvement culture of a mature organization.",
    routingLink: "test",
    contactCTA: "Get in Touch",
    image: "/images/test-photo.jpg",
    imageAlt: "Business Continuity Image",
  },
  {
    title: "Assessments",
    description:
      "Our team can provide senior leadership and boards with an assessment of both the operational capabilities and overall strategic plans associated with crisis management, business continuity, as well as vulnerability assessments. We work closely with your team to accurately assess your strengths, vulnerabilities, capabilities, and co-create a map for continuous improvement in these domains.",
    routingLink: "test2",
    contactCTA: "Get in Touch",
    image: "/images/test-photo.jpg",
    imageAlt: "Assessments Image",
    chartComponent: React.createElement(MultipleBarChart, {
      data: chartData,
      title: "Crisis Leadership Chart",
      description: "Monthly data for Crisis Leadership",
    }),
  },
  {
    title: "Risk Management",
    description:
      "The storm has arrived…you are in the midst of a crisis that may be escalating rapidly with dire consequences. We stand ready to assist you in plotting both immediate actions and emergent strategies for recovery. Crisis response is comprised of operational tactics, coupled with strategic planning around recovery and innovative course corrections. This is difficult, often costly and highly disruptive. We can help you navigate the storm.",
    routingLink: "test3",
    contactCTA: "Get in Touch",
    image: "/images/test-photo.jpg",
    imageAlt: "Risk Management Image",
  },
];
