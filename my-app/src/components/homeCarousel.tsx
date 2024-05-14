"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function HomeCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
 
  const images: { imageUrl: string; }[] = [
    { imageUrl: "https://scontent-xsp1-1.cdninstagram.com/v/t39.30808-6/441192788_762739092673061_1110606064852615629_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-xsp1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=jOcJddYuFxAQ7kNvgH4ULzA&edm=ALQROFkAAAAA&ig_cache_key=MzM2NTQwMTU1NDQwMjU0MjA5NA%3D%3D.2-ccb7-5&oh=00_AYD-dHIhfipOSG5uKJzip97WnKiuMbhK8wCO-uPGBt7Fcw&oe=66458423" },
    { imageUrl: "https://scontent-xsp2-1.cdninstagram.com/v/t39.30808-6/442437784_762739179339719_717696799342668702_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-xsp2-1.cdninstagram.com&_nc_cat=111&_nc_ohc=TZxEFKeRidwQ7kNvgFHf_FA&edm=ALQROFkAAAAA&ig_cache_key=MzM2NTQwMTU1NDY2MjYxNjYxMQ%3D%3D.2-ccb7-5&oh=00_AYBhM4dFkQCX1L3yYXpkbCrJkLdBUVYqd6e4UbDGhfqTng&oe=66458AE4" },
    { imageUrl: "https://scontent-xsp2-1.cdninstagram.com/v/t39.30808-6/441938367_762739152673055_7853312894660307509_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-xsp2-1.cdninstagram.com&_nc_cat=111&_nc_ohc=nchAMgP8_TwQ7kNvgExyo46&edm=ALQROFkAAAAA&ig_cache_key=MzM2NTQwMTU1NDM2MDUwMzMzOA%3D%3D.2-ccb7-5&oh=00_AYDyp_X-5tIN8AI-MHTzMuKxtuxiX09IBogqfpUdGPlqIQ&oe=66457D8E" },
    { imageUrl: "https://scontent-xsp1-1.cdninstagram.com/v/t39.30808-6/441943993_762739076006396_9068233198404428861_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-xsp1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=cvVe6HWjX08Q7kNvgEEjMMb&edm=ALQROFkAAAAA&ig_cache_key=MzM2NTQwMTU1NDI1OTk1NzA5Mw%3D%3D.2-ccb7-5&oh=00_AYBk_9QzbaRibcB6TAE6dglAkqRT6jGtYSkKe6kgZE9O3Q&oe=6645A078" },
    { imageUrl: "https://scontent-xsp1-1.cdninstagram.com/v/t39.30808-6/441304615_762739102673060_6435204660380019324_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-xsp1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xXrItIIUem8Q7kNvgHOWgs4&edm=ALQROFkAAAAA&ig_cache_key=MzM2NTQwMTU1NDQxMDk2NzgxMA%3D%3D.2-ccb7-5&oh=00_AYCP68UZQORLtjduIKWNeFOzvxh9TtNld91WlIrsczrVlQ&oe=6645A1FD" },
  ];
  return (
    <div className="flex justify-center py-36">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full max-w-screen-xl"
      >
        <CarouselContent className="-ml-1">
          {images.map((item, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/1">
              <div className="p-1">
                <Card className="max-h-[300px] w-fit">
                  <div>
                    <img
                      src={item.imageUrl}
                      alt=""
                      className=" object-cover aspect-square cursor-pointer"
                      onClick={() => {
                        console.log(index, "aku ter klik");
                      }}
                    />
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
