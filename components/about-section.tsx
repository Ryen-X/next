import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">About</h2>
            <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              N.E.X.T (Narayana Empowering Xcellence Tomorrow) is a dedicated portal where students can vote for their upcoming school leaders and deputies. It is designed to empower students by giving them a voice in the selection of their leaders, fostering a sense of responsibility and engagement in the school community. Through N.E.X.T, students can actively participate in shaping the future of their educational environment, promoting leadership skills and civic awareness among the youth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
