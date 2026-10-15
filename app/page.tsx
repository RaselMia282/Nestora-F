import Hero from "@/src/Components/home/Hero";
import Category from "@/src/features/property-category/components/Category";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Suspense fallback={null}>
        <Category></Category>
      </Suspense>
    </>
  );
}
