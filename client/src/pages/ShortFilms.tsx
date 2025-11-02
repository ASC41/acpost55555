import { useState, useRef, useEffect } from "react";
import PortfolioItem from "@/components/PortfolioItem";
import { getPortfolioItemsByCategory } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";

export default function ShortFilms() {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  const ITEMS_PER_PAGE = 8;
  
  // Set page title for Google Analytics tracking
  useEffect(() => {
    document.title = "Short Films | AC POST Portfolio";
  }, []);
  
  // Get portfolio items for Short Films category
  const shortFilmsData = getPortfolioItemsByCategory("Short Films");
  
  // Apply pagination
  const displayedData = shortFilmsData.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
  
  const totalPages = Math.ceil(shortFilmsData.length / ITEMS_PER_PAGE);
  const showPagination = totalPages > 1;

  // Toggle expanded state for a portfolio item
  const handleToggleExpand = (id: string) => {
    if (expandedItemId === id) {
      setExpandedItemId(null);
    } else {
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

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    setExpandedItemId(null);
    portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
    setExpandedItemId(null);
    portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>

      <section id="portfolio" ref={portfolioRef} className="relative bg-gray-900 portfolio-container space-y-0 pt-20">
        {displayedData.map((item, index) => (
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
              category="Short Films"
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