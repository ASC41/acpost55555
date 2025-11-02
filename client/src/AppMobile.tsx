import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import NavigationMobile from "@/components/NavigationMobile";
import SelectedWorksMobile from "@/pages/SelectedWorksMobile";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ShortFilmsMobile from "@/pages/ShortFilmsMobile";
import DirectingMobile from "@/pages/DirectingMobile";
import VFXMobile from "@/pages/VFXMobile";
import Footer from "@/components/Footer";

function AppMobile() {
  const [location] = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <NavigationMobile />
        <main className="flex-grow bg-gray-900">
          <Switch>
            <Route path="/" component={SelectedWorksMobile} />
            <Route path="/selected-works" component={SelectedWorksMobile} />
            <Route path="/featured-works" component={SelectedWorksMobile} />
            <Route path="/short-films" component={ShortFilmsMobile} />
            <Route path="/directing" component={DirectingMobile} />
            <Route path="/vfx" component={VFXMobile} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default AppMobile;