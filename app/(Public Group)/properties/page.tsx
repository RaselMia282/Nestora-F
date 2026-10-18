import PropertiesPage from "@/src/features/property/components/Property";
import { Suspense } from "react";

const findPropertyPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <PropertiesPage></PropertiesPage>
        
      </Suspense>
    </div>
  );
};

export default findPropertyPage;
