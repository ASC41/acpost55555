import { useEffect } from "react";
import { motion } from "framer-motion";

export default function About() {
  // Set page title for Google Analytics tracking
  useEffect(() => {
    document.title = "About | AC POST Portfolio";
  }, []);
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <h1 className="font-inter text-4xl md:text-5xl font-bold tracking-tight mb-8">About</h1>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg">
              <img 
                src="https://cdn.jsdelivr.net/gh/free-whiteboard-online/Free-Erasorio-Alternative-for-Collaborative-Design@8831f209a0479769366cdc3067890f5dc387b9bb/uploads/2025-09-22T18-03-32-692Z-yz2u3vrur.jpg" 
                alt="Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">Bio</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                With over 15 years of experience in the film and video production industry, 
                I've had the privilege of working on a diverse range of projects from commercial 
                spots to feature films and documentaries.
              </p>
              <p>
                My career began in post-production, where I developed a deep understanding of 
                the technical and creative aspects of editing, color grading, and motion graphics. 
                This foundation has informed my approach to directing, allowing me to seamlessly 
                blend technical precision with creative vision.
              </p>
              <p>
                Throughout my career, I've been fortunate to collaborate with talented creatives, 
                agencies, and production companies across the country. These collaborations have 
                not only enriched my skillset but have also resulted in compelling storytelling 
                that resonates with audiences.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Directing</h3>
                <p className="text-white/80">
                  Character-driven storytelling with an emphasis on authentic performances and visually 
                  compelling narratives.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Editing</h3>
                <p className="text-white/80">
                  Rhythm-focused approach that enhances storytelling through deliberate pacing and 
                  emotional resonance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Motion Graphics</h3>
                <p className="text-white/80">
                  Clean, purposeful design that communicates complex ideas through elegant visual 
                  solutions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">VFX</h3>
                <p className="text-white/80">
                  Seamless integration of visual effects that enhance rather than distract from the 
                  core narrative.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}