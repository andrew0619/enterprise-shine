import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface GPUFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  visual: ReactNode;
}

const GPUFeatureCard = ({ icon: Icon, title, description, visual }: GPUFeatureCardProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden border border-card-border hover:shadow-md transition-shadow duration-300">
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-heading">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>
      </div>
      <div className="px-6 pb-6 lg:px-8 lg:pb-8">
        {visual}
      </div>
    </div>
  );
};

export default GPUFeatureCard;
