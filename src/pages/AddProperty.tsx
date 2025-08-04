import { PropertyUploadWizard } from "@/components/PropertyUploadWizard";

const AddProperty = () => {
  return (
    <div className="min-h-screen text-foreground" style={{
      background: 'linear-gradient(180deg, #001731 0%, #002B5E 100%)'
    }}>
      <PropertyUploadWizard />
    </div>
  );
};

export default AddProperty;