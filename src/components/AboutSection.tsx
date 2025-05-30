import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Stethoscope } from "lucide-react";

const AboutSection = () => {
  const achievements = [
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      title: "Education Excellence",
      description:
        "Amherst College magna cum laude, Weill Cornell Medical College with honors",
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Dean's Research Award",
      description:
        "Recognized for outstanding research contributions at Weill Cornell",
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
      title: "Advanced Training",
      description:
        "USC Dermatology Residency & Fellowship at Laser & Skin Surgery Center of NY",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Published Author",
      description:
        "Peer-reviewed journals and textbook chapters on dermatologic surgery",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Dr. Dan Belkin, M.D.
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="prose prose-lg text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Dr. Dan Belkin is a{" "}
                <strong className="text-blue-700">
                  double board-certified dermatologic surgeon
                </strong>{" "}
                specializing in cosmetic dermatology, laser surgery, and Mohs
                micrographic surgery. A graduate of Amherst College magna cum
                laude, he earned his medical degree with honors from Weill
                Cornell Medical College, where he received the Dean's Research
                Award.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                He completed his dermatology residency at the University of
                Southern California, contributing to the development of their
                dermatologic surgery program. Dr. Belkin later pursued advanced
                fellowship training at the Laser & Skin Surgery Center of New
                York.
              </p>
              <p className="text-lg leading-relaxed">
                He is a published author in peer-reviewed journals and has
                written textbook chapters on dermatologic surgery, with a focus
                on{" "}
                <strong className="text-blue-700">
                  skin cancer, pigmentation disorders, and reconstructive
                  techniques
                </strong>
                .
              </p>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-blue-50 rounded-full">
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Specializations */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Areas of Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Cosmetic Dermatology",
              "Laser Surgery",
              "Mohs Micrographic Surgery",
              "Skin Cancer Treatment",
              "Pigmentation Disorders",
              "Reconstructive Techniques",
            ].map((specialty, index) => (
              <motion.span
                key={index}
                className="px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-medium text-sm hover:bg-blue-200 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                {specialty}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
