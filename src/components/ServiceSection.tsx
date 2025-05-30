import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Syringe,
  Zap,
  Scissors,
  Stethoscope,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

interface ServiceSectionProps {
  onViewAllServices?: () => void;
}

const ServiceSection = ({ onViewAllServices }: ServiceSectionProps) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const services: Service[] = [
    {
      id: "aesthetic",
      title: "Aesthetic Dermatology",
      description:
        "Advanced treatments to enhance your natural beauty with minimal downtime.",
      icon: <Syringe className="h-10 w-10 text-blue-600" />,
      details: [
        "Botox & Dysport for wrinkle reduction",
        "Dermal fillers for volume restoration",
        "Chemical peels for skin rejuvenation",
        "Microneedling for collagen production",
        "Custom treatment plans for all skin types",
      ],
    },
    {
      id: "laser",
      title: "Laser Treatments",
      description:
        "State-of-the-art laser technology for various skin concerns and conditions.",
      icon: <Zap className="h-10 w-10 text-blue-600" />,
      details: [
        "Laser resurfacing for scars and texture",
        "IPL for pigmentation and redness",
        "Laser hair removal",
        "Vascular laser for spider veins",
        "Tattoo removal",
      ],
    },
    {
      id: "mohs",
      title: "Mohs Surgery",
      description:
        "Gold standard treatment for skin cancer with the highest cure rate.",
      icon: <Scissors className="h-10 w-10 text-blue-600" />,
      details: [
        "Precise removal of skin cancer",
        "Tissue-sparing technique",
        "Same-day results and closure",
        "Minimal scarring approach",
        "Complete pathological examination",
      ],
    },
    {
      id: "general",
      title: "General Dermatology",
      description:
        "Comprehensive care for all skin, hair, and nail conditions.",
      icon: <Stethoscope className="h-10 w-10 text-blue-600" />,
      details: [
        "Acne treatment and management",
        "Eczema and psoriasis care",
        "Mole checks and skin cancer screening",
        "Rash diagnosis and treatment",
        "Hair loss evaluation",
      ],
    },
  ];

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-white" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dr. Belkin offers a comprehensive range of dermatological services
            combining medical expertise with an artistic eye for natural-looking
            results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-white transform hover:scale-105 hover:-translate-y-2"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-center text-gray-900">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-center text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value={service.id}>
                    <AccordionTrigger className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Learn More
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="mt-3 space-y-2">
                        {service.details.map((detail, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 flex items-start"
                          >
                            <span className="text-blue-600 mr-2">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={onViewAllServices}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
