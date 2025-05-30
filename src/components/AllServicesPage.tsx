import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Syringe,
  Zap,
  Scissors,
  Stethoscope,
  Clock,
  DollarSign,
  Users,
  ArrowLeft,
} from "lucide-react";

interface AllServicesPageProps {
  onBack?: () => void;
  onBookAppointment?: () => void;
}

interface DetailedService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  duration: string;
  priceRange: string;
  suitableFor: string[];
  beforeAfterCount: number;
  category: string;
}

const AllServicesPage = ({
  onBack,
  onBookAppointment,
}: AllServicesPageProps) => {
  const detailedServices: DetailedService[] = [
    {
      id: "aesthetic",
      title: "Aesthetic Dermatology",
      description:
        "Advanced treatments to enhance your natural beauty with minimal downtime and maximum results.",
      icon: <Syringe className="h-12 w-12 text-blue-600" />,
      details: [
        "Botox & Dysport for wrinkle reduction and prevention",
        "Dermal fillers for volume restoration and contouring",
        "Chemical peels for skin rejuvenation and texture improvement",
        "Microneedling with PRP for collagen production",
        "Custom treatment plans tailored to your skin type",
        "Non-surgical facial rejuvenation techniques",
        "Lip enhancement and facial contouring",
        "Anti-aging maintenance programs",
      ],
      duration: "30-90 minutes",
      priceRange: "$300 - $2,000",
      suitableFor: [
        "Fine lines",
        "Volume loss",
        "Facial asymmetry",
        "Preventive care",
      ],
      beforeAfterCount: 150,
      category: "Cosmetic",
    },
    {
      id: "laser",
      title: "Laser Treatments",
      description:
        "State-of-the-art laser technology for various skin concerns with precision and safety.",
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      details: [
        "Fractional CO2 laser resurfacing for scars and texture",
        "IPL (Intense Pulsed Light) for pigmentation and redness",
        "Laser hair removal for all skin types",
        "Vascular laser treatment for spider veins and rosacea",
        "Q-switched laser for tattoo removal",
        "Picosecond laser for pigmented lesions",
        "Laser skin tightening and rejuvenation",
        "Combination laser therapies for optimal results",
      ],
      duration: "15-60 minutes",
      priceRange: "$200 - $1,500",
      suitableFor: [
        "Acne scars",
        "Sun damage",
        "Unwanted hair",
        "Vascular lesions",
      ],
      beforeAfterCount: 200,
      category: "Technology",
    },
    {
      id: "mohs",
      title: "Mohs Micrographic Surgery",
      description:
        "Gold standard treatment for skin cancer with the highest cure rate and tissue preservation.",
      icon: <Scissors className="h-12 w-12 text-blue-600" />,
      details: [
        "Precise layer-by-layer removal of skin cancer",
        "Real-time microscopic examination of tissue",
        "Highest cure rates (up to 99% for primary tumors)",
        "Maximum preservation of healthy tissue",
        "Same-day surgery and reconstruction",
        "Minimal scarring with advanced closure techniques",
        "Treatment of complex and recurrent skin cancers",
        "Comprehensive post-operative care and monitoring",
      ],
      duration: "2-6 hours",
      priceRange: "$1,500 - $5,000",
      suitableFor: [
        "Basal cell carcinoma",
        "Squamous cell carcinoma",
        "Melanoma in situ",
      ],
      beforeAfterCount: 300,
      category: "Surgical",
    },
    {
      id: "general",
      title: "General Dermatology",
      description:
        "Comprehensive medical care for all skin, hair, and nail conditions with expert diagnosis.",
      icon: <Stethoscope className="h-12 w-12 text-blue-600" />,
      details: [
        "Complete skin cancer screening and mole mapping",
        "Acne treatment for all ages and severities",
        "Eczema and psoriasis management programs",
        "Rash diagnosis and targeted treatment plans",
        "Hair loss evaluation and treatment options",
        "Nail disorder diagnosis and care",
        "Pediatric dermatology services",
        "Preventive skin health education and monitoring",
      ],
      duration: "15-45 minutes",
      priceRange: "$150 - $800",
      suitableFor: [
        "All ages",
        "Chronic conditions",
        "Preventive care",
        "Acute concerns",
      ],
      beforeAfterCount: 100,
      category: "Medical",
    },
    {
      id: "advanced",
      title: "Advanced Procedures",
      description:
        "Specialized treatments combining medical expertise with cutting-edge technology.",
      icon: <Users className="h-12 w-12 text-blue-600" />,
      details: [
        "Platelet-Rich Plasma (PRP) therapy",
        "Radiofrequency skin tightening",
        "Cryotherapy for benign lesions",
        "Photodynamic therapy (PDT)",
        "Intralesional steroid injections",
        "Sclerotherapy for spider veins",
        "Advanced wound care and healing",
        "Combination therapy protocols",
      ],
      duration: "30-120 minutes",
      priceRange: "$400 - $2,500",
      suitableFor: ["Complex cases", "Multiple concerns", "Advanced aging"],
      beforeAfterCount: 75,
      category: "Specialized",
    },
    {
      id: "consultation",
      title: "Consultation Services",
      description:
        "Comprehensive evaluations and personalized treatment planning for optimal outcomes.",
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      details: [
        "Initial comprehensive skin assessment",
        "Personalized treatment plan development",
        "Second opinion consultations",
        "Pre and post-procedure consultations",
        "Skin health maintenance planning",
        "Product recommendation and education",
        "Follow-up care coordination",
        "Telemedicine consultations available",
      ],
      duration: "30-60 minutes",
      priceRange: "$200 - $500",
      suitableFor: ["New patients", "Complex cases", "Treatment planning"],
      beforeAfterCount: 0,
      category: "Consultation",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cosmetic":
        return "bg-pink-100 text-pink-800";
      case "Technology":
        return "bg-purple-100 text-purple-800";
      case "Surgical":
        return "bg-red-100 text-red-800";
      case "Medical":
        return "bg-green-100 text-green-800";
      case "Specialized":
        return "bg-blue-100 text-blue-800";
      case "Consultation":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  All Services
                </h1>
                <p className="text-gray-600 mt-1">
                  Comprehensive dermatological care by Dr. Dan Belkin
                </p>
              </div>
            </div>
            <Button
              onClick={onBookAppointment}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {detailedServices.map((service) => (
            <Card
              key={service.id}
              className="h-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">
                        {service.title}
                      </CardTitle>
                      <Badge className={getCategoryColor(service.category)}>
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 mt-3">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium">{service.duration}</p>
                  </div>
                  <div className="text-center">
                    <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Price Range</p>
                    <p className="text-sm font-medium">{service.priceRange}</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Cases</p>
                    <p className="text-sm font-medium">
                      {service.beforeAfterCount}+
                    </p>
                  </div>
                </div>

                {/* Treatment Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.details.slice(0, 4).map((detail, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700 flex items-start"
                      >
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                    {service.details.length > 4 && (
                      <li className="text-sm text-blue-600 font-medium">
                        + {service.details.length - 4} more treatments...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Suitable For */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Best For:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.suitableFor.map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={onBookAppointment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Book {service.title} Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Not Sure Which Treatment is Right for You?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Schedule a comprehensive consultation with Dr. Belkin to discuss
            your concerns and develop a personalized treatment plan tailored to
            your unique needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBookAppointment}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" onClick={onBack}>
              View Before & After Gallery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;
