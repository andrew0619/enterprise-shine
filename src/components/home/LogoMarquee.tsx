import hpeLogo from "@/assets/logos/hpe.png";
import fetLogo from "@/assets/logos/fet.png";
import vastLogo from "@/assets/logos/vast.png";
import nvidiaLogo from "@/assets/logos/nvidia.png";
import wekaLogo from "@/assets/logos/weka.png";
import chunghwaLogo from "@/assets/logos/chunghwa.png";
import ddnLogo from "@/assets/logos/ddn.png";
import taiwanMobileLogo from "@/assets/logos/taiwan-mobile.png";

const logos = [
  { name: "Hewlett Packard Enterprise", src: hpeLogo },
  { name: "遠傳 FET", src: fetLogo },
  { name: "VAST", src: vastLogo },
  { name: "NVIDIA", src: nvidiaLogo },
  { name: "WEKA", src: wekaLogo },
  { name: "中華電信", src: chunghwaLogo },
  { name: "ddn", src: ddnLogo },
  { name: "Taiwan Mobile", src: taiwanMobileLogo },
];

const LogoMarquee = () => {
  return (
    <section className="bg-muted/30 py-8 overflow-hidden">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-4 sm:mx-8 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-4 sm:mx-8 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
