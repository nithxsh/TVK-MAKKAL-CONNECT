import { SimpleHeader } from "@/components/ui/simple-header";

export default function DemoOne() {
  return (
		<div className="relative min-h-screen w-full">
			<SimpleHeader 
        onOpenManifesto={() => {}} 
        view="welfare" 
        setView={() => {}} 
      />
		</div>
	);
}
