import { useState, useEffect } from "react";
import HeroSectionMobile from "@/components/HeroSectionMobile";
import StaticThumbnailMobile from "@/components/StaticThumbnailMobile";
import PortfolioItemMobile from "@/components/PortfolioItemMobile";
import { portfolioData, type PortfolioItem } from "@/lib/portfolio-data";

export default function SelectedWorksMobile() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioData);

  // Set page title for Google Analytics tracking
  useEffect(() => {
    document.title = "Featured Works | AC POST Portfolio";
  }, []);

  useEffect(() => {
    const filterItems = () => {
      // First filter for Featured Works category only
      const featuredWorksData = portfolioData.filter(item => 
        item.categories.includes("Featured Works")
      );

      if (!activeFilter) {
        setFilteredItems(featuredWorksData);
        return;
      }

      // Apply additional filtering based on active filter
      const filtered = featuredWorksData.filter(item => 
        item.tags?.includes(activeFilter) || 
        item.role.toLowerCase().includes(activeFilter.toLowerCase()) ||
        item.categories.some(cat => cat.toLowerCase().includes(activeFilter.toLowerCase()))
      );

      setFilteredItems(filtered);
    };

    filterItems();
  }, [activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === activeFilter ? null : filter);
  };

  const handleItemClick = (id: string) => {
    setSelectedItemId(id);
  };

  const handleCloseItem = () => {
    setSelectedItemId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSectionMobile 
        onFilterClick={handleFilterClick}
        activeFilter={activeFilter}
      />
      
      <section id="portfolio" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filter indicator */}
          {activeFilter && (
            <div className="mb-8 text-center">
              <span className="inline-block px-4 py-2 bg-accent/20 border border-accent text-accent rounded-full text-sm">
                Filtered by: {activeFilter}
              </span>
            </div>
          )}

          {/* Portfolio Grid - Mobile optimized */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
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

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No items found for the selected filter.</p>
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