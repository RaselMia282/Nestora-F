import PropertyMapLoader from "@/src/Components/maps/PropertyMapLoader";

const demoProperties = [
  {
    id: "property-1",
    title: "Demo Apartment",
    latitude: 23.8759,
    longitude: 90.3795,
    rentAmount: 18000,
  },
  {
    id: "property-2",
    title: "Demo House",
    latitude: 23.8103,
    longitude: 90.4125,
    rentAmount: 24000,
  },
];

export default function FindPropertyPage() {
  return (
    <main className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      <section>
        {/* Search, filters and property cards */}
        <h1 className="text-2xl font-bold">
          Find Property
        </h1>
      </section>

      <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
        <PropertyMapLoader properties={demoProperties} />
      </aside>
    </main>
  );
}