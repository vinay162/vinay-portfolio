
function Hero() {
  
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl">
          Hello, I'm <span className="text-red-500">Vinay</span>
        </h1>
        <p className="mt-4 text-xl md:text-3xl text-gray-300 font-medium max-w-xl">
          I'm a Software Developer
        </p>
      </div>
    </section>
  );
}

export default Hero;
