import { useEffect, useState } from "react";
import cityMountainView from "@/assets/careers/city-mountain-view.jpg";
import cityTaipei from "@/assets/careers/city-taipei.jpg";
import cityHongkong from "@/assets/careers/city-hongkong.jpg";

interface Office {
  city: string;
  country: string;
  timezone: string;
  offsetHours: number;
  image: string;
}

const offices: Office[] = [
  {
    city: "Mountain View",
    country: "CA, USA",
    timezone: "PT",
    offsetHours: -8,
    image: cityMountainView,
  },
  {
    city: "Taipei",
    country: "Taiwan",
    timezone: "CST",
    offsetHours: 8,
    image: cityTaipei,
  },
  {
    city: "Hong Kong",
    country: "China",
    timezone: "HKT",
    offsetHours: 8,
    image: cityHongkong,
  },
];

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
          {offices.map((office, index) => (
            <div key={index} className="group">
              {/* Image */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                <img
                  src={office.image}
                  alt={`${office.city} skyline`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalOfficesSection;
