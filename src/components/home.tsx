import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServiceSection from "./ServiceSection";
import GallerySection from "./GallerySection";
import AppointmentForm from "./AppointmentForm";
import AdminPanel from "./AdminPanel";
import AllServicesPage from "./AllServicesPage";
import { useState } from "react";
import { Button } from "./ui/button";
import { X, Settings } from "lucide-react";

function Home() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  const handleBookAppointment = () => {
    setShowAppointmentForm(true);
  };

  const handleCloseForm = () => {
    setShowAppointmentForm(false);
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Appointment form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Appointment request submitted successfully!");
    setShowAppointmentForm(false);
  };

  const handleViewAllServices = () => {
    setShowAllServices(true);
  };

  const handleBackFromServices = () => {
    setShowAllServices(false);
  };

  // Don't render main content if showing all services page
  if (showAllServices) {
    return (
      <AllServicesPage
        onBack={handleBackFromServices}
        onBookAppointment={handleBookAppointment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Dr. Dan Belkin</div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 cursor-pointer"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 cursor-pointer"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 cursor-pointer"
            >
              Services
            </a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 cursor-pointer"
            >
              Gallery
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 cursor-pointer"
            >
              Contact
            </a>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleBookAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Book Appointment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdminPanel(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <section id="home">
          <HeroSection onBookAppointment={handleBookAppointment} />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="services">
          <ServiceSection onViewAllServices={handleViewAllServices} />
        </section>

        <section id="gallery">
          <GallerySection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Contact Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-gray-600">(212) 555-1234</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-gray-600">info@drbelkin.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Medical Plaza
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Dr. Dan Belkin, MD. All rights reserved.</p>
        </div>
      </footer>

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
        />
      )}

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-lg w-full mx-4">
            <Button
              onClick={handleCloseForm}
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
            >
              <X className="h-6 w-6" />
            </Button>
            <AppointmentForm
              onSubmit={handleFormSubmit}
              isOpen={showAppointmentForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
