import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  description: string;
  category: string;
}

const GallerySection = ({ images }: { images?: BeforeAfterImage[] }) => {
  const [galleryImages, setGalleryImages] =
    useState<BeforeAfterImage[]>(defaultImages);

  // Load images from localStorage or use provided images
  useState(() => {
    if (images) {
      setGalleryImages(images);
    } else {
      const storedImages = localStorage.getItem("galleryImages");
      if (storedImages) {
        setGalleryImages(JSON.parse(storedImages));
      }
    }
  });
  const categories = [
    "all",
    ...Array.from(new Set(galleryImages.map((img) => img.category))),
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Before & After Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            View real patient transformations achieved through Dr. Belkin's
            expert treatments. All images are shared with patient consent, with
            privacy maintained where appropriate.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(category === "all"
                  ? galleryImages
                  : galleryImages.filter((image) => image.category === category)
                ).map((image) => (
                  <BeforeAfterCard key={image.id} image={image} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All results may vary. Images shown with patient consent.
          </p>
        </div>
      </div>
    </section>
  );
};

const BeforeAfterCard = ({ image }: { image: BeforeAfterImage }) => {
  return (
    <Card className="overflow-hidden border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative">
                <div className="w-full h-auto">
                  <img
                    src={image.before}
                    alt={`Before ${image.description}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Before
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative">
                <div className="w-full h-auto">
                  <img
                    src={image.after}
                    alt={`After ${image.description}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
                  After
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        <div className="p-4">
          <h3 className="font-medium text-gray-900">{image.description}</h3>
          <p className="text-sm text-gray-500 mt-1 capitalize">
            {image.category}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const defaultImages: BeforeAfterImage[] = [
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
  {
    id: "3",
    before:
      "https://images.unsplash.com/photo-1600428853876-fb5a850b444f?w=800&q=80",
    after:
      "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=800&q=80",
    description: "Skin Cancer Removal",
    category: "mohs",
  },
  {
    id: "4",
    before:
      "https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?w=800&q=80",
    after:
      "https://images.unsplash.com/photo-1610631066894-62452fa97f8f?w=800&q=80",
    description: "Botox Treatment",
    category: "aesthetic",
  },
  {
    id: "5",
    before:
      "https://images.unsplash.com/photo-1596935884413-260a972dab44?w=800&q=80",
    after:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    description: "Laser Hair Removal",
    category: "laser",
  },
  {
    id: "6",
    before:
      "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=800&q=80",
    after:
      "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=800&q=80",
    description: "Dermal Fillers",
    category: "aesthetic",
  },
];

export default GallerySection;
