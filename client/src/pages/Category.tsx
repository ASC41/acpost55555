import { useState, useRef, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PortfolioItem from "@/components/PortfolioItem";
import { getPortfolioItemsByCategory } from "@/lib/portfolio-data";

interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  const portfolioItems = getPortfolioItemsByCategory(category);

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

  // Create FPO versions of portfolio items
  const fpoItems = portfolioItems.map(item => ({
    ...item,
    stillImageUrl: "https://via.placeholder.com/1920x1080/333333/666666?text=FPO+Video+Content",
    loopVideoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    assets: item.assets.map(asset => ({
      ...asset,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnailUrl: "https://via.placeholder.com/1920x1080/333333/666666?text=FPO+Video+Content"
    }))
  }));

  return (
    <>
      <HeroSection />

      <section id="portfolio" ref={portfolioRef} className="relative bg-gray-900 pt-16">
        {fpoItems.map((item, index) => (
          <div key={item.id} id={`portfolio-item-${item.id}`}>
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
              stackedLayout={item.stackedLayout}
            />
          </div>
        ))}
      </section>
    </>
  );
}