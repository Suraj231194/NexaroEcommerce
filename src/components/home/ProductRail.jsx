import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel.jsx";
import { ProductCard, ProductCardSkeleton } from "../products/ProductCard.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

export function ProductRail({ title, description, products = [], query, isLoading }) {
  if (!isLoading && !products.length) {
    return null;
  }

  return (
    <section className="py-10 md:py-12">
      <div className="container-shell">
        <SectionHeading
          title={title}
          description={description}
          action={
            <Link
              href={`/search?q=${encodeURIComponent(query || title)}`}
              className="focus-ring hidden items-center gap-1 rounded-md text-sm font-medium text-primary transition hover:opacity-80 md:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
          <CarouselContent className="-ml-3">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={`skeleton-${index}`}
                    className="basis-[76%] pl-3 sm:basis-[48%] lg:basis-[32%] xl:basis-[25%]"
                  >
                    <ProductCardSkeleton />
                  </CarouselItem>
                ))
              : products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-[76%] pl-3 sm:basis-[48%] lg:basis-[32%] xl:basis-[25%]"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 top-1/2 hidden -translate-y-1/2 md:flex" />
          <CarouselNext className="-right-2 top-1/2 hidden -translate-y-1/2 md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
