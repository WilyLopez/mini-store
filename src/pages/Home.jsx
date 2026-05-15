const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl"></div>

        <div className="relative container mx-auto px-6 py-28 text-center">
          <span className="inline-block px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 text-sm mb-6">
            Bienvenido a nuestra plataforma
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Tu tienda online,
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {" "}más rápida y moderna
            </span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Descubre una experiencia de compra intuitiva, moderna y segura.
            Navega fácilmente, encuentra lo que necesitas y disfruta de una
            plataforma diseñada para brindarte comodidad y eficiencia.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 font-semibold text-lg shadow-lg shadow-cyan-500/30">
              Explorar tienda
            </button>

            <button className="px-8 py-4 rounded-2xl border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300 font-semibold text-lg">
              Saber más
            </button>
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 hover:border-cyan-400/40 transition-all duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">
              Plataforma rápida
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Navegación optimizada para ofrecer una experiencia fluida y moderna
              desde cualquier dispositivo.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 hover:border-purple-400/40 transition-all duration-300">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-3">
              Seguridad garantizada
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Protegemos la información y la experiencia de nuestros usuarios
              utilizando estándares modernos de seguridad.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 hover:border-pink-400/40 transition-all duration-300">
            <div className="text-4xl mb-4">🌎</div>
            <h3 className="text-2xl font-bold mb-3">
              Acceso desde cualquier lugar
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Diseñado para funcionar correctamente tanto en computadoras como
              en dispositivos móviles.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
        © 2026 Mini Store — Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default Home