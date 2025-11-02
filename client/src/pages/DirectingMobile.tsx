import { useState, useEffect } from "react";
import StaticThumbnailMobile from "@/components/StaticThumbnailMobile";
import PortfolioItemMobile from "@/components/PortfolioItemMobile";
import { portfolioData } from "@/lib/portfolio-data";

export default function DirectingMobile() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Set page title for Google Analytics tracking
  useEffect(() => {
    document.title = "Directing | AC POST Portfolio";
  }, []);

  // Filter for directing work
  const directingItems = portfolioData.filter(item => 
    item.categories.includes("Directing")
  );

  const handleItemClick = (id: string) => {
    setSelectedItemId(id);
  };

  const handleCloseItem = () => {
    setSelectedItemId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Directing
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Creative direction and visual storytelling
          </p>
        </div>
      </section>
      
      {/* Portfolio Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {directingItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => handleItemClick(item.id)}
                data-testid={`card-portfolio-${item.id}`}
              >
                <StaticThumbnailMobile
                  videoUrl={item.loopVideoUrl || ""}
                  thumbnailUrl=""
                  aspectRatio="video"
                  onExpand={() => handleItemClick(item.id)}
                  title={item.title}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-white/70">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {directingItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No directing work available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Portfolio Item Modal */}
      {selectedItemId && (
        <PortfolioItemMobile
          id={selectedItemId}
          isOpen={!!selectedItemId}
          onClose={handleCloseItem}
        />
      )}
    </div>
  );
}