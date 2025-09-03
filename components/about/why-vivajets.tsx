import Image from "next/image";

const features = [
  {
    illustration: "/assets/images/a_1.png",
    title: "Clear Communication and Honest Pricing",
  },
  {
    illustration: "/assets/images/a_2.png",
    title: "Safety And Comfort On Every Flight",
  },
  {
    illustration: "/assets/images/a_3.png",
    title: "Personal Service With A Human Touch",
  },
  {
    illustration: "/assets/images/a_4.png",
    title: "Making Sure You Feel Seen, Heard, And Taken Care Of",
  },
];

const WhyVivaJets = () => {
  return (
    <section className="bg-[#F7F7F7] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold special-header">
            Why VivaJets
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-600">
            We’re not just a jet provider—we’re a partner. At VivaJets, we
            believe private aviation should feel effortless, not intimidating.
            That’s why we focus on:
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="relative h-72 mb-4">
                <Image
                  src={feature.illustration}
                  alt={feature.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVivaJets;
