import { Linkedin } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

const TeamMemberCard = ({ name, role, image, linkedin }: TeamMemberCardProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      {/* Circular Avatar */}
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Name */}
      <h3 className="font-bold text-heading text-lg">{name}</h3>
      
      {/* Role */}
      <p className="text-primary text-sm font-medium">{role}</p>
      
      {/* LinkedIn */}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label={`${name}'s LinkedIn profile`}
        >
          <Linkedin className="w-5 h-5" />
        </a>
      )}
    </div>
  );
};

export default TeamMemberCard;
