import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import teamCollaboration from "@/assets/careers/team-collaboration.jpg";

const JoinTeamCTA = () => {
  return (
    <section className="bg-background py-8 md:py-12">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={teamCollaboration}
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dark gradient overlay on left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full min-h-[320px] md:min-h-[400px] px-8 md:px-12 py-12 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join a Global Team of Innovators
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              We want to bring together bold thinkers from around the world to drive the future of AI and high-performance computing. Our diverse, multicultural team thrives on collaboration, fresh perspectives, and a shared passion for pushing boundaries.
            </p>
            <div>
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamCTA;
