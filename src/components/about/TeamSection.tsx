import { useTranslation } from "react-i18next";
import TeamMemberCard from "./TeamMemberCard";

const leadershipTeam = [
  {
    name: "David Chen",
    role: "Founder / CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Michael Lin",
    role: "VP Engineering",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Jason Wu",
    role: "VP Business",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Kevin Huang",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
];

const secondRowTeam = [
  {
    name: "Brian Wang",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Amy Tsai",
    role: "Product Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Eric Chang",
    role: "Operations",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
];

const advisors = [
  {
    name: "Richard Liu",
    role: "Business Advisor / Angel Investor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sarah Chen",
    role: "Chief Accounting Advisor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    linkedin: "https://linkedin.com",
  },
];

const TeamSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            {t("about.teamKicker", { defaultValue: "經營團隊" })}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            {t("about.teamTitle", { defaultValue: "頂尖團隊，引領創新" })}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("about.teamSubtitle", { defaultValue: "Top Team, Leading Innovation - 由來自 Google、NVIDIA、Meta 等頂尖科技公司的專家組成" })}
          </p>
        </div>
        
        {/* Leadership Row 1 - 4 members */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {leadershipTeam.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
        
        {/* Leadership Row 2 - 3 members centered */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto mb-20">
          {secondRowTeam.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
        
        {/* Advisors Section */}
        <div className="border-t pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-heading">
              {t("about.advisorsTitle", { defaultValue: "顧問與投資" })}
            </h3>
            <p className="text-muted-foreground mt-2">
              {t("about.advisorsSubtitle", { defaultValue: "Advisors & Investors" })}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-md mx-auto">
            {advisors.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
