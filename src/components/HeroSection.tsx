import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  doctorName?: string;
  doctorTitle?: string;
  doctorIntro?: string;
  doctorImage?: string;
  onBookAppointment?: () => void;
}

const HeroSection = ({
  doctorName = "Dr. Dan Belkin, MD",
  doctorTitle = "Double Board-Certified Dermatologic Surgeon",
  doctorIntro = "Fellowship-trained in aesthetics, lasers, and Mohs surgery. Dedicated to skin health and natural results.",
  doctorImage = "https://i.imgur.com/yrEIIBm.jpeg",
  onBookAppointment,
}: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-[700px] bg-white flex items-center overflow-hidden">
      {/* Enhanced Background gradient with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent animate-pulse"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Text content */}
        <motion.div
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            {doctorName}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-blue-700">
            {doctorTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            {doctorIntro}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              onClick={onBookAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-8 shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Doctor image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-[280px] h-[350px] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <img
              src={doctorImage}
              alt="Dr. Dan Belkin"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-blue-100/20"></div>
            <div className="absolute inset-0 ring-4 ring-blue-200/50 rounded-2xl"></div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Decorative elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/60 to-blue-100/30 z-0 animate-pulse"></div>
      <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-blue-100/50 to-blue-50/30 z-0 animate-bounce"></div>
      <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-blue-300/40 z-0 animate-ping"></div>
      <div className="absolute bottom-1/4 -left-4 w-8 h-8 rounded-full bg-blue-400/30 z-0 animate-pulse"></div>
    </section>
  );
};

export default HeroSection;
