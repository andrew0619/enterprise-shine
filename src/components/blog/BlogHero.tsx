const BlogHero = () => {
  return (
    <section className="relative bg-[#020617] py-20 md:py-28 overflow-hidden">
      {/* Rainbow/Iridescent Visual - Top Right */}
      <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-violet-500 to-fuchsia-400 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 opacity-60" />
      </div>

      {/* Subtle secondary glow - bottom left */}
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          NexusAI Blog
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
          Discover the latest news, updates, and insights from our team.
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
