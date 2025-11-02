import { useState, useRef, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PortfolioItem from "@/components/PortfolioItem";
import InlineFilterModal from "@/components/InlineFilterModal";
import { portfolioData } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";

export default function SelectedWorks() {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const portfolioRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 8;

  // Set page title for Google Analytics tracking
  useEffect(() => {
    document.title = "Featured Works | AC POST Portfolio";
  }, []);

  // Filter portfolio data - only show Featured Works category
  const featuredWorksData = portfolioData.filter(item => 
    item.categories.includes("Featured Works")
  );

  // Apply additional filtering based on active filter
  const filteredPortfolioData = activeFilter 
    ? featuredWorksData.filter(item => 
        item.tags?.includes(activeFilter) || 
        item.role.toLowerCase().includes(activeFilter.toLowerCase()) ||
        item.categories.some(cat => cat.toLowerCase().includes(activeFilter.toLowerCase()))
      )
    : featuredWorksData;

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilter]);

  // Apply pagination - but only when no filter is active
  const displayedPortfolioData = activeFilter 
    ? filteredPortfolioData // Show all when filtering
    : filteredPortfolioData.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE); // Show current page when not filtering

  const totalPages = !activeFilter ? Math.ceil(filteredPortfolioData.length / ITEMS_PER_PAGE) : 0;
  const showPagination = !activeFilter && totalPages > 1;

  // Toggle expanded state for a portfolio item
  const handleToggleExpand = (id: string) => {
    // If clicking the same item that's already expanded, close it
    if (expandedItemId === id) {
      setExpandedItemId(null);
    } else {
      // If a different item is already expanded, close it and open the new one
      setExpandedItemId(id);
    }
  };

  // Scroll to the correct position when expanding/collapsing items
  useEffect(() => {
    if (expandedItemId && portfolioRef.current) {
      const expandedItem = document.getElementById(`portfolio-item-${expandedItemId}`);
      if (expandedItem) {
        setTimeout(() => {
          expandedItem.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [expandedItemId]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
    setExpandedItemId(null); // Close any expanded items when filtering
  };

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter);
    setExpandedItemId(null); // Close any expanded items when filtering
  };

  const handleFilterClose = () => {
    setActiveFilter(null);
    setExpandedItemId(null);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    setExpandedItemId(null);
    // Scroll to top of portfolio section
    portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
    setExpandedItemId(null);
    // Scroll to top of portfolio section
    portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <HeroSection onFilterClick={handleFilterClick} activeFilter={activeFilter} />

      <section id="portfolio" ref={portfolioRef} className="relative bg-gray-900 portfolio-container space-y-0">
        
        {activeFilter && (
          <div className="px-6 pt-6">
            <InlineFilterModal 
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              onClose={handleFilterClose}
            />
          </div>
        )}
        
        {displayedPortfolioData.map((item, index) => (
          <div key={item.id} id={`portfolio-item-${item.id}`} className="w-full">
            <PortfolioItem
              id={item.id}
              index={index + 1}
              title={item.title}
              subtitle={item.subtitle}
              stillImageUrl={item.stillImageUrl}
              loopVideoUrl={item.loopVideoUrl}
              client={item.client}
              clientUrl={item.clientUrl}
              agency={item.agency}
              productionCompany={item.productionCompany}
              role={item.role}
              description={item.description}
              additionalCredits={item.additionalCredits}
              externalLinks={item.externalLinks}
              assets={item.assets}
              isExpanded={expandedItemId === item.id}
              onToggleExpand={handleToggleExpand}
              expandedItemId={expandedItemId}
              overlayImageUrl={item.overlayImageUrl}
              stackedLayout={item.stackedLayout}
              category="Featured Works"
            />
          </div>
        ))}

        {showPagination && (
          <div className="flex items-center justify-center gap-6 py-12 bg-gray-900">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              data-testid="button-prev-page"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Button>
            
            <div className="text-white/80 font-medium">
              Page {currentPage + 1} of {totalPages}
            </div>
            
            <Button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              data-testid="button-next-page"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}
      </section>
    </>
  );
}