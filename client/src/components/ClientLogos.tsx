
import { motion } from "framer-motion";

const clientLogos = [
  {
    name: "Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
  },
  {
    name: "Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/1200px-Meta-Logo.png"
  },
  {
    name: "Instagram", 
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
  },
  {
    name: "McDonald's",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg"
  },
  {
    name: "Walmart",
    logoUrl: "https://cdn.freebiesupply.com/images/large/2x/walmart-logo-black-transparent.png"
  },
  {
    name: "Weight Watchers",
    logoUrl: "https://companieslogo.com/img/orig/WW_BIG-1d986e25.png?t=1720244494"
  },
  {
    name: "Adidas",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
  },
  {
    name: "Netflix",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  },
  {
    name: "HBO",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg"
  },
  {
    name: "BET",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/BET_Logo.svg/2560px-BET_Logo.svg.png"
  },
  {
    name: "Sci Fi Channel",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c6/SYFY_Logo_2020.png"
  },
  {
    name: "Paramount+",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Paramount%2B_logo.svg"
  },
  {
    name: "Nick Jr",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Nick_Jr._logo_2018.svg/2560px-Nick_Jr._logo_2018.svg.png"
  },
  {
    name: "Advil",
    logoUrl: "https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/bp-advil-v2/en_US/global/logo/advil-logo-v2.png?auto=format"
  },
  {
    name: "Royal Canin",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Royal-Canin-Logo.svg/2560px-Royal-Canin-Logo.svg.png"
  },
  {
    name: "Slack",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
  },
  {
    name: "PG&E",
    logoUrl: "https://cdn.freebiesupply.com/logos/large/2x/pg-e-logo-png-transparent.png"
  },
  {
    name: "Alaska Airlines",
    logoUrl: "https://news.alaskaair.com/wp-content/uploads/2022/03/AS_Wordmark_Official_logo_rgb_midnight.png"
  },
  {
    name: "Salesforce",
    logoUrl: "https://www.pngkey.com/png/full/854-8549180_png-50-px-salesforce-black-and-white-logo.png"
  },
  {
    name: "Nintendo",
    logoUrl: "https://www.pngall.com/wp-content/uploads/13/Nintendo-Logo-PNG-Cutout.png"
  },
  {
    name: "CBS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/CBS_logo.svg/2560px-CBS_logo.svg.png"
  }
];

export default function ClientLogos() {
  const logoWidth = 140;
  const spacing = 40;
  const totalWidth = clientLogos.length * (logoWidth + spacing);

  return (
    <div className="relative overflow-hidden max-w-5xl mx-auto">
      <motion.div
        className="flex will-change-transform"
        animate={{
          x: [0, -totalWidth]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
          }
        }}
        style={{ width: totalWidth * 2 }}
      >
        {/* First set of logos */}
        {clientLogos.map((logo, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: logoWidth, marginRight: spacing }}
          >
            <div className="h-12 flex items-center justify-center">
              <img
                src={logo.logoUrl}
                alt={logo.name}
                className="max-h-8 max-w-24 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-white/80 font-medium text-sm whitespace-nowrap">${logo.name}</span>`;
                  }
                }}
              />
            </div>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {clientLogos.map((logo, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: logoWidth, marginRight: spacing }}
          >
            <div className="h-12 flex items-center justify-center">
              <img
                src={logo.logoUrl}
                alt={logo.name}
                className="max-h-8 max-w-24 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-white/80 font-medium text-sm whitespace-nowrap">${logo.name}</span>`;
                  }
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
