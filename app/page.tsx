import Hero from "@/src/Components/home/Hero";
import FeaturedProperties from "@/src/Components/home/HomesWorth";
import HowItWorks from "@/src/Components/home/HowItWorks";
import MoreThanARoom from "@/src/Components/home/MoreThanARoom";
import OwnerCTA from "@/src/Components/home/OwnerCTA";
import Testimonials from "@/src/Components/home/Testimonials";
import Category from "@/src/features/property-category/components/Category";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Suspense fallback={null}>
        <Category></Category>
      </Suspense>
      <FeaturedProperties></FeaturedProperties>
      <MoreThanARoom></MoreThanARoom>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <OwnerCTA></OwnerCTA>
    </>
  );
}
