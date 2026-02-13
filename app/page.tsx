export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Aris Anastasatos
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Technical Architect & Product Manager
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="#about" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              About Me
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              I'm a Technical Architect and Product Manager with a strong background in backend development, 
              particularly in Java. I bridge the gap between technical implementation and product strategy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Currently exploring modern web technologies and building personal projects to expand my skill set.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-700 mb-4">
              Feel free to reach out for collaborations or just to say hello!
            </p>
            <p className="text-blue-600 font-semibold">
              hello@arisan.gr
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}