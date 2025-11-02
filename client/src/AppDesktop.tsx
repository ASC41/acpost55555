import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/Navigation";
import SelectedWorks from "@/pages/SelectedWorks";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ShortFilms from "@/pages/ShortFilms";
import Directing from "@/pages/Directing";
import VFX from "@/pages/VFX";
import Footer from "@/components/Footer";

function AppDesktop() {
  const [location] = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navigation />
        <main className="flex-grow bg-gray-900">
          <Switch>
            <Route path="/" component={SelectedWorks} />
            <Route path="/selected-works" component={SelectedWorks} />
            <Route path="/featured-works" component={SelectedWorks} />
            <Route path="/short-films" component={ShortFilms} />
            <Route path="/directing" component={Directing} />
            <Route path="/vfx" component={VFX} />
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

export default AppDesktop;