export default function FeatureFilms() {
  return (
    <>
      <section className="relative bg-gray-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Feature Films
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Long-form narrative experiences that explore complex characters and storylines. 
              Contributing to feature-length productions through post-production expertise and creative collaboration.
            </p>
          </div>

          {/* Coming Soon Content */}
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-white">
                Feature Film Portfolio Coming Soon
              </h2>
              
              <p className="text-lg text-gray-400 max-w-2xl">
                This section will showcase feature film contributions including post-production work, 
                visual effects, and collaborative efforts on independent and commercial productions.
              </p>
              
              <div className="pt-8">
                <a 
                  href="mailto:adrian@acpost.pro?subject=Feature Film Portfolio Inquiry"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-accent hover:bg-accent/80 text-black font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Inquire About Feature Film Work</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}