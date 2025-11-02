import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Contact() {
  // Set page title for Google Analytics tracking
  useEffect(() => {
    document.title = "Contact | AC POST Portfolio";
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:col-span-5">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact</h1>
          <p className="text-white/80 mb-8 text-lg">
            Interested in working together? Have questions about my services? 
            Get in touch using the form or connect directly through the channels below.
          </p>

          <div className="space-y-6">
            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-accent text-xl mt-1"><i className="fas fa-envelope"></i></div>
              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <a href="mailto:adrian@acpost.pro" className="text-white/80 hover:text-accent transition-colors">
                  adrian@acpost.pro
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-accent text-xl mt-1"><i className="fas fa-map-marker-alt"></i></div>
              <div>
                <h3 className="font-medium text-lg">Location</h3>
                <p className="text-white/80">Brooklyn, NY</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-accent text-xl mt-1"><i className="fas fa-share-alt"></i></div>
              <div>
                <h3 className="font-medium text-lg">Social</h3>
                <div className="flex space-x-4 mt-2">
                  <a href="https://www.linkedin.com/in/adrianscarey/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors">
                    <i className="fab fa-linkedin-in text-xl"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-playfair text-2xl font-bold mb-6">Get In Touch</h2>
            <p className="text-white/80 mb-8 text-lg">
              Ready to discuss your next project? Click the button below to send me an email directly.
            </p>
            
            <Button 
              asChild
              className="bg-white hover:bg-white/90 text-black hover:text-black text-lg px-8 py-6 font-medium border-2 border-accent hover:border-accent/80 transition-all duration-300"
            >
              <a href="mailto:adrian@acpost.pro">
                <i className="fas fa-envelope mr-3"></i>
                Send Email
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}