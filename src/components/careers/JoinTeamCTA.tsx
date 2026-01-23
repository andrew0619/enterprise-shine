import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JoinTeamCTA = () => {
  return (
    <section className="bg-background py-8 md:py-12">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px]">
          {/* Background - Team collaboration visual */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
            {/* Abstract team silhouettes */}
            <div className="absolute inset-0 opacity-30">
              {/* Group of people shapes */}
              <div className="absolute bottom-0 right-0 w-2/3 h-full">
                {/* Person 1 */}
                <div className="absolute bottom-0 right-8 w-24 h-48 bg-slate-600 rounded-t-full" />
                {/* Person 2 */}
                <div className="absolute bottom-0 right-28 w-20 h-44 bg-slate-500 rounded-t-full" />
                {/* Person 3 */}
                <div className="absolute bottom-0 right-48 w-22 h-52 bg-slate-600 rounded-t-full" />
                {/* Person 4 */}
                <div className="absolute bottom-0 right-[280px] w-18 h-40 bg-slate-500 rounded-t-full" />
              </div>
              
              {/* Desk/table element */}
              <div className="absolute bottom-8 right-12 left-1/3 h-4 bg-slate-500/50 rounded" />
            </div>
            
            {/* Light accents */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
          </div>

          {/* Dark gradient overlay on left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />

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
