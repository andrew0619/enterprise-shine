import newProductArch from "@/assets/partners/new-product-arch.jpg";

const NewProductSection = () => {
  return (
    <section className="bg-black py-20 md:py-28 overflow-hidden">
      <div className="container">
        {/* Chrome Arch Visual */}
        <div className="relative h-48 md:h-72 mb-12">
          <img
            src={newProductArch}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            New product
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Develop access to the IT supply chain and connect with partners, OEMs, and ISVs in a single cohesive AI app workflow infrastructure.
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            We are connecting our partners and creating an ecosystem where the AI GPU is the core compute and ready for the latest technology to meet accelerated time-to-value and predictable workloads. Let us do the work for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewProductSection;
