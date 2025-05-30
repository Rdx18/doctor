import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  description: string;
  category: string;
}

interface AppointmentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  message: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

const AdminPanel = ({ isOpen = true, onClose }: AdminPanelProps) => {
  const [doctorImage, setDoctorImage] = useState(
    "https://i.imgur.com/yrEIIBm.jpeg",
  );
  const [aboutSection, setAboutSection] = useState({
    title: "About Dr. Dan Belkin",
    description:
      "Dr. Dan Belkin is a double board-certified dermatologic surgeon with extensive training in aesthetic dermatology, laser treatments, and Mohs surgery. He combines medical precision with aesthetic artistry to deliver exceptional results for his patients.",
    education: "Cornell Medical School, USC Dermatology Residency",
    specialties: "Aesthetic Dermatology, Laser Treatments, Mohs Surgery",
  });
  const [galleryImages, setGalleryImages] = useState<BeforeAfterImage[]>([]);

  const [appointments, setAppointments] = useState<AppointmentData[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      date: "2024-02-15",
      service: "Aesthetic Dermatology",
      message: "Interested in botox consultation",
      status: "pending",
      createdAt: "2024-01-20T10:30:00Z",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 987-6543",
      date: "2024-02-18",
      service: "Laser Treatments",
      message: "Acne scar treatment inquiry",
      status: "confirmed",
      createdAt: "2024-01-22T14:15:00Z",
    },
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load appointments
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments);
      setAppointments((prev) => {
        // Merge with existing appointments, avoiding duplicates
        const existingIds = prev.map((apt) => apt.id);
        const newAppointments = parsedAppointments.filter(
          (apt: AppointmentData) => !existingIds.includes(apt.id),
        );
        return [...prev, ...newAppointments];
      });
    }

    // Load gallery images
    const storedGalleryImages = localStorage.getItem("galleryImages");
    if (storedGalleryImages) {
      const parsedGalleryImages = JSON.parse(storedGalleryImages);
      setGalleryImages(parsedGalleryImages);
    } else {
      // Set default images if none stored
      const defaultImages = [
        {
          id: "1",
          before:
            "https://images.unsplash.com/photo-1588871378803-3ef9a7a2b3b3?w=800&q=80",
          after:
            "https://images.unsplash.com/photo-1601412436465-922fadda062e?w=800&q=80",
          description: "Acne Scar Treatment",
          category: "laser",
        },
        {
          id: "2",
          before:
            "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
          after:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=80",
          description: "Facial Rejuvenation",
          category: "aesthetic",
        },
      ];
      setGalleryImages(defaultImages);
      localStorage.setItem("galleryImages", JSON.stringify(defaultImages));
    }

    // Load admin password
    const storedPassword = localStorage.getItem("adminPassword");
    if (storedPassword) {
      setCurrentAdminPassword(storedPassword);
    }

    // Load about section
    const storedAboutSection = localStorage.getItem("aboutSection");
    if (storedAboutSection) {
      setAboutSection(JSON.parse(storedAboutSection));
    }
  }, []);

  const [newImage, setNewImage] = useState<Partial<BeforeAfterImage>>({
    before: "",
    after: "",
    description: "",
    category: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentAdminPassword, setCurrentAdminPassword] = useState("admin123");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleLogin = () => {
    if (password === currentAdminPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    setCurrentAdminPassword(newPassword);
    localStorage.setItem("adminPassword", newPassword);
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordChange(false);
    alert("Password changed successfully!");
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after" | "doctor",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === "doctor") {
          setDoctorImage(result);
        } else if (type === "before") {
          setNewImage({ ...newImage, before: result });
        } else if (type === "after") {
          setNewImage({ ...newImage, after: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDoctorImageUpdate = () => {
    // In a real app, this would update the backend
    alert("Doctor image updated successfully!");
  };

  const handleAboutSectionUpdate = () => {
    localStorage.setItem("aboutSection", JSON.stringify(aboutSection));
    alert("About section updated successfully!");
  };

  const handleAddImage = () => {
    if (
      newImage.before &&
      newImage.after &&
      newImage.description &&
      newImage.category
    ) {
      const imageToAdd: BeforeAfterImage = {
        id: Date.now().toString(),
        before: newImage.before!,
        after: newImage.after!,
        description: newImage.description!,
        category: newImage.category!,
      };
      const updatedImages = [...galleryImages, imageToAdd];
      setGalleryImages(updatedImages);
      localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
      setNewImage({ before: "", after: "", description: "", category: "" });
      alert("Image added successfully!");
    } else {
      alert("Please fill all fields");
    }
  };

  const handleDeleteImage = (id: string) => {
    const updatedImages = galleryImages.filter((img) => img.id !== id);
    setGalleryImages(updatedImages);
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
    alert("Image deleted successfully!");
  };

  const handleUpdateAppointmentStatus = (
    id: string,
    status: AppointmentData["status"],
  ) => {
    const updatedAppointments = appointments.map((apt) =>
      apt.id === id ? { ...apt, status } : apt,
    );
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const handleDeleteAppointment = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = appointments.filter((apt) => apt.id !== id);
      setAppointments(updatedAppointments);
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      alert("Appointment deleted successfully!");
    }
  };

  const handleDeleteAllAppointments = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all appointment data? This action cannot be undone.",
      )
    ) {
      setAppointments([]);
      localStorage.removeItem("appointments");
      alert("All appointment data deleted successfully!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4 bg-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-800">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleLogin} className="flex-1">
                Login
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <Tabs defaultValue="doctor" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="doctor">Doctor Profile</TabsTrigger>
            <TabsTrigger value="about">About Section</TabsTrigger>
            <TabsTrigger value="gallery">Gallery Management</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="doctor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Image Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="doctorImage">Doctor Image URL</Label>
                      <Input
                        id="doctorImage"
                        value={doctorImage}
                        onChange={(e) => setDoctorImage(e.target.value)}
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorImageFile">
                        Or Upload Image File
                      </Label>
                      <Input
                        id="doctorImageFile"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "doctor")}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={handleDoctorImageUpdate}
                      className="w-full"
                    >
                      Update Image
                    </Button>
                  </div>
                  <div className="flex-1">
                    <Label>Preview</Label>
                    <div className="w-48 h-60 rounded-lg overflow-hidden border">
                      <img
                        src={doctorImage}
                        alt="Doctor preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Section Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="aboutTitle">Section Title</Label>
                  <Input
                    id="aboutTitle"
                    value={aboutSection.title}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        title: e.target.value,
                      })
                    }
                    placeholder="About section title"
                  />
                </div>
                <div>
                  <Label htmlFor="aboutDescription">Description</Label>
                  <Textarea
                    id="aboutDescription"
                    value={aboutSection.description}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        description: e.target.value,
                      })
                    }
                    placeholder="About description"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="aboutEducation">Education</Label>
                  <Input
                    id="aboutEducation"
                    value={aboutSection.education}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        education: e.target.value,
                      })
                    }
                    placeholder="Education details"
                  />
                </div>
                <div>
                  <Label htmlFor="aboutSpecialties">Specialties</Label>
                  <Input
                    id="aboutSpecialties"
                    value={aboutSection.specialties}
                    onChange={(e) =>
                      setAboutSection({
                        ...aboutSection,
                        specialties: e.target.value,
                      })
                    }
                    placeholder="Specialties"
                  />
                </div>
                <Button onClick={handleAboutSectionUpdate} className="w-full">
                  Update About Section
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Before/After Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beforeImage">Before Image URL</Label>
                    <Input
                      id="beforeImage"
                      value={newImage.before || ""}
                      onChange={(e) =>
                        setNewImage({ ...newImage, before: e.target.value })
                      }
                      placeholder="Before image URL"
                    />
                    <Label htmlFor="beforeImageFile">
                      Or Upload Before Image
                    </Label>
                    <Input
                      id="beforeImageFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "before")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="afterImage">After Image URL</Label>
                    <Input
                      id="afterImage"
                      value={newImage.after || ""}
                      onChange={(e) =>
                        setNewImage({ ...newImage, after: e.target.value })
                      }
                      placeholder="After image URL"
                    />
                    <Label htmlFor="afterImageFile">
                      Or Upload After Image
                    </Label>
                    <Input
                      id="afterImageFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "after")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newImage.description || ""}
                      onChange={(e) =>
                        setNewImage({
                          ...newImage,
                          description: e.target.value,
                        })
                      }
                      placeholder="Treatment description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewImage({ ...newImage, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laser">Laser</SelectItem>
                        <SelectItem value="aesthetic">Aesthetic</SelectItem>
                        <SelectItem value="mohs">Mohs</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddImage} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Gallery Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages.map((image) => (
                    <div
                      key={image.id}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Before</p>
                          <img
                            src={image.before}
                            alt="Before"
                            className="w-full h-20 object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">After</p>
                          <img
                            src={image.after}
                            alt="After"
                            className="w-full h-20 object-cover rounded"
                          />
                        </div>
                      </div>
                      <p className="font-medium text-sm">{image.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {image.category}
                      </Badge>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Appointment Management</CardTitle>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAllAppointments}
                    disabled={appointments.length === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Appointments
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No appointments found.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">
                              {appointment.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {appointment.email}
                            </p>
                            <p className="text-sm text-gray-600">
                              {appointment.phone}
                            </p>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>
                              <strong>Date:</strong>{" "}
                              {new Date(appointment.date).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Service:</strong> {appointment.service}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Created:</strong>{" "}
                              {new Date(
                                appointment.createdAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {appointment.message && (
                          <div>
                            <p className="text-sm font-medium">Message:</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {appointment.message}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant={
                              appointment.status === "pending"
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleUpdateAppointmentStatus(
                                appointment.id,
                                "pending",
                              )
                            }
                          >
                            Pending
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleUpdateAppointmentStatus(
                                appointment.id,
                                "confirmed",
                              )
                            }
                          >
                            Confirmed
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              appointment.status === "completed"
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleUpdateAppointmentStatus(
                                appointment.id,
                                "completed",
                              )
                            }
                          >
                            Completed
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              appointment.status === "cancelled"
                                ? "destructive"
                                : "outline"
                            }
                            onClick={() =>
                              handleUpdateAppointmentStatus(
                                appointment.id,
                                "cancelled",
                              )
                            }
                          >
                            Cancelled
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Change Admin Password</h3>
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                  >
                    {showPasswordChange ? "Cancel" : "Change Password"}
                  </Button>
                </div>

                {showPasswordChange && (
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password (min 6 characters)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button onClick={handlePasswordChange} className="w-full">
                      Update Password
                    </Button>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Current password is set and secure. Change it regularly for
                    better security.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
