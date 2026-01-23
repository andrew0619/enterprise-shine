import { useEffect, useState } from "react";

interface Office {
  city: string;
  country: string;
  timezone: string;
  offsetHours: number;
  thumbnailStyle: "silicon-valley" | "taipei" | "hongkong";
}

const offices: Office[] = [
  {
    city: "Mountain View",
    country: "CA, USA",
    timezone: "PT",
    offsetHours: -8,
    thumbnailStyle: "silicon-valley",
  },
  {
    city: "Taipei",
    country: "Taiwan",
    timezone: "CST",
    offsetHours: 8,
    thumbnailStyle: "taipei",
  },
  {
    city: "Hong Kong",
    country: "China",
    timezone: "HKT",
    offsetHours: 8,
    thumbnailStyle: "hongkong",
  },
];

const ThumbnailSiliconValley = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
    {/* Mountains */}
    <div className="absolute bottom-0 left-0 right-0 h-1/2">
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-emerald-600 to-emerald-500" 
           style={{ clipPath: "polygon(0 60%, 30% 30%, 50% 50%, 70% 25%, 100% 55%, 100% 100%, 0 100%)" }} />
    </div>
    {/* Tech campus buildings */}
    <div className="absolute bottom-8 left-1/4 w-16 h-12 bg-slate-100 rounded-t-lg shadow-lg" />
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-16 bg-white rounded-lg shadow-lg" />
    <div className="absolute bottom-8 right-1/4 w-12 h-10 bg-slate-200 rounded-t-lg shadow-lg" />
    {/* Sun */}
    <div className="absolute top-6 right-8 w-10 h-10 bg-yellow-300 rounded-full opacity-80" />
  </div>
);

const ThumbnailTaipei = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-indigo-400 via-purple-300 to-pink-200">
    {/* Taipei 101 */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      <div className="relative">
        {/* Main tower */}
        <div className="w-8 h-40 bg-gradient-to-b from-slate-600 to-slate-700 mx-auto">
          {/* Segments */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-10 h-4 bg-slate-500 -mx-1 mb-0.5 first:rounded-t" />
          ))}
        </div>
        {/* Spire */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-slate-400" />
      </div>
    </div>
    {/* Other buildings */}
    <div className="absolute bottom-4 left-8 w-6 h-16 bg-slate-500/80 rounded-t" />
    <div className="absolute bottom-4 left-16 w-8 h-12 bg-slate-600/80 rounded-t" />
    <div className="absolute bottom-4 right-8 w-10 h-20 bg-slate-500/80 rounded-t" />
    <div className="absolute bottom-4 right-20 w-6 h-14 bg-slate-600/80 rounded-t" />
  </div>
);

const ThumbnailHongKong = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-blue-400 to-blue-300">
    {/* Victoria Harbour water */}
    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-blue-600 to-blue-500" />
    {/* Skyline */}
    <div className="absolute bottom-1/4 left-4 w-6 h-24 bg-slate-300 rounded-t" />
    <div className="absolute bottom-1/4 left-12 w-8 h-32 bg-slate-400 rounded-t" />
    <div className="absolute bottom-1/4 left-1/3 w-5 h-28 bg-slate-300 rounded-t" />
    {/* IFC-like building */}
    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-6 h-36 bg-gradient-to-b from-slate-200 to-slate-400 rounded-t" />
    <div className="absolute bottom-1/4 right-1/3 w-7 h-30 bg-slate-300 rounded-t" />
    <div className="absolute bottom-1/4 right-12 w-8 h-26 bg-slate-400 rounded-t" />
    <div className="absolute bottom-1/4 right-4 w-5 h-20 bg-slate-300 rounded-t" />
    {/* Mountains behind */}
    <div className="absolute bottom-1/4 left-0 right-0 h-16 bg-gradient-to-t from-slate-500/30 to-transparent"
         style={{ clipPath: "polygon(0 100%, 20% 40%, 40% 70%, 60% 30%, 80% 60%, 100% 50%, 100% 100%)" }} />
  </div>
);

const thumbnailComponents = {
  "silicon-valley": ThumbnailSiliconValley,
  taipei: ThumbnailTaipei,
  hongkong: ThumbnailHongKong,
};

const GlobalOfficesSection = () => {
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const newTimes = offices.map((office) => {
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const localTime = new Date(utc + 3600000 * office.offsetHours);
        return localTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container">
        {/* Section Title */}
        <p className="text-muted-foreground text-sm mb-10">
          Our team is at the forefront of global AI development.
        </p>

        {/* Offices Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {offices.map((office, index) => {
            const ThumbnailComponent = thumbnailComponents[office.thumbnailStyle];
            return (
              <div key={index} className="group">
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <ThumbnailComponent />
                </div>

                {/* Location Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {office.city}, {office.country}
                    </h3>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {times[index] || "--:--"} {office.timezone}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GlobalOfficesSection;
