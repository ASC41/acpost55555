import { useEffect } from "react";

export default function Directing() {
  // Set page title for Google Analytics tracking
  useEffect(() => {
    document.title = "Directing | AC POST Portfolio";
  }, []);
  return (
    <>
      <section className="relative bg-gray-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Directing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bringing creative visions to life through thoughtful direction and collaborative storytelling. 
              Each project represents a unique narrative journey from concept to completion.
            </p>
          </div>

          {/* Coming Soon Content */}
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-white">
                Directing Portfolio Coming Soon
              </h2>
              
              <p className="text-lg text-gray-400 max-w-2xl">
                This section will showcase directorial work including narrative projects, 
                commercial direction, and creative leadership across various media formats.
              </p>
              
              <div className="pt-8">
                <a 
                  href="mailto:adrian@acpost.pro?subject=Directing Portfolio Inquiry"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-accent hover:bg-accent/80 text-black font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Inquire About Directing Work</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}