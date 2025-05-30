import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentFormProps {
  onSubmit?: (formData: FormData) => void;
  isOpen?: boolean;
  onAppointmentSubmit?: (appointmentData: any) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: Date | undefined;
  service: string;
  message: string;
}

const AppointmentForm = ({
  onSubmit,
  isOpen = true,
  onAppointmentSubmit,
}: AppointmentFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: undefined,
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    field: keyof FormData,
    value: string | Date | undefined,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.service
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }

    // Send appointment data to admin panel
    const appointmentData = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date?.toISOString().split("T")[0] || "",
      service: formData.service,
      message: formData.message,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    if (onAppointmentSubmit) {
      onAppointmentSubmit(appointmentData);
    }

    // Store in localStorage as backup
    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]",
    );
    existingAppointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(existingAppointments));

    setIsSubmitted(true);
  };

  const services = [
    "Aesthetic Dermatology",
    "Laser Treatments",
    "Mohs Surgery",
    "General Dermatology",
    "Skin Consultation",
  ];

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
          <CardTitle className="text-center text-2xl font-semibold text-green-800">
            Appointment Request Received
          </CardTitle>
          <CardDescription className="text-center text-green-600">
            Thank you for your request
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-center mb-2">
            We've received your appointment request and will contact you shortly
            to confirm your booking.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Please check your email for further details.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Book Another Appointment
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <CardTitle className="text-center text-2xl font-semibold text-blue-800">
          Book an Appointment
        </CardTitle>
        <CardDescription className="text-center text-blue-600">
          Fill out the form below to request an appointment with Dr. Dan Belkin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(formData.date, "PPP")
                  ) : (
                    <span>Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => handleChange("date", date)}
                  initialFocus
                  disabled={(date) => {
                    // Disable weekends and past dates
                    const day = date.getDay();
                    const isPastDate =
                      date < new Date(new Date().setHours(0, 0, 0, 0));
                    return day === 0 || day === 6 || isPastDate;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Select
              onValueChange={(value) => handleChange("service", value)}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              placeholder="Please share any specific concerns or questions you have..."
              className="min-h-[100px]"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Request Appointment
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
        <p>You can also call us directly at (212) 555-1234</p>
        <p className="mt-1">Our office hours are Monday-Friday, 9am-5pm</p>
      </CardFooter>
    </Card>
  );
};

export default AppointmentForm;
