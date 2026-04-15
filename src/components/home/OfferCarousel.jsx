import Link from "next/link";
import { ArrowRight, Percent, Zap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Progress } from "../ui/progress.jsx";
import { SectionHeading } from "./SectionHeading.jsx";
import { formatCurrency, getDiscountPercent } from "../../lib/formatters.js";
import { ProgressiveImage } from "../ui/progressive-image.jsx";

function getClaimPercent(productId) {
  return 48 + (productId % 42);
}

export function OfferCarousel({ products = [] }) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="py-10 md:py-12">
      <div className="container-shell">
        <SectionHeading
          title="Hot Offer Carousel"
          description="Horizontal premium offers with coupon-ready deal cards and live claim status."
        />

        <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
          <CarouselContent className="-ml-3">
            {products.map((product) => {
              const discount = getDiscountPercent(product.price, product.discountPrice);
              const claimed = getClaimPercent(product.id);
              const couponCode = `SAVE${10 + (product.id % 5) * 5}`;

              return (
                <CarouselItem
                  key={product.id}
                  className="basis-[86%] pl-3 sm:basis-[56%] lg:basis-[41%] xl:basis-[33%]"
                >
                  <article className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <Link href={`/product/${product.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <ProgressiveImage
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                          imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                          <Badge className="bg-destructive text-destructive-foreground">
                            <Percent className="h-3 w-3" />
                            {discount}% off
                          </Badge>
                          <Badge className="bg-amber-500/95 text-black">
                            <Zap className="h-3 w-3" />
                            Coupon {couponCode}
                          </Badge>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                          <p className="line-clamp-1 text-base font-semibold">{product.name}</p>
                          <p className="text-xs text-white/85">Offer valid until midnight</p>
                        </div>
                      </div>
                    </Link>

                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-lg font-semibold text-primary">
                          {formatCurrency(product.discountPrice)}
                        </p>
                        <p className="text-xs text-muted-foreground line-through">
                          {formatCurrency(product.price)}
                        </p>
                      </div>

                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Sale level</span>
                          <span>{claimed}% claimed</span>
                        </div>
                        <Progress value={claimed} className="h-2" />
                      </div>

                      <Button asChild className="mt-4 w-full rounded-lg">
                        <Link href={`/product/${product.slug}`}>
                          Grab this offer
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="-left-2 top-1/2 hidden -translate-y-1/2 md:flex" />
          <CarouselNext className="-right-2 top-1/2 hidden -translate-y-1/2 md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
