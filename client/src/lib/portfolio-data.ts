export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  stillImageUrl: string;
  loopVideoUrl: string;
  client?: string;
  clientUrl?: string;
  agency?: {
    name: string;
    url?: string;
  };
  productionCompany?: {
    name: string;
    url?: string;
  };
  role: string;
  description: string[] | string;
  additionalCredits?: Array<{
    title: string;
    name: string;
    url?: string;
  }>;
  externalLinks?: Array<{
    title: string;
    url: string;
  }>;
  assets: Array<{
    videoUrl: string;
    thumbnailUrl: string;
    aspectRatio?: "video" | "square" | "portrait" | "ultrawide" | "wide";
    // Optional metadata overrides for multi-video portfolios
    title?: string;
    subtitle?: string;
    description?: string[] | string;
    role?: string;
    client?: string;
    agency?: {
      name: string;
      url?: string;
    };
    productionCompany?: {
      name: string;
      url?: string;
    };
    additionalCredits?: Array<{
      title: string;
      name: string;
      url?: string;
    }>;
    externalLinks?: Array<{
      title: string;
      url: string;
    }>;
    tags?: string[];
  }>;
  categories: string[];
  tags?: string[];
  overlayImageUrl?: string;
  stackedLayout?: boolean;
  customLayout?: boolean;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "marketwatch",
    title: "MarketWatch",
    subtitle: "Peacock CTV & DOOH Campaign",
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1128915252/c5e0020fd8?share=copy",
    client: "MarketWatch",
    agency: {
      name: "Mother",
      url: "https://www.mothernewyork.com/"
    },
    role: "Motion Graphics · Sound Design · VFX",
    description: "AC Post worked with Mother to execute agency boards for MarketWatch's campaign spanning social, CTV, and DOOH. While not in initial ideation, AC Post contributed to the creative by introducing the pacifier-sucking animation, custom SFX, and baby giggle that became signature to the campaign's tongue-in-cheek 'Nepo Baby' humor. The work also included refining 3D assets, motion-tracked compositing, and high-end VFX and finishing treatments to deliver a cohesive, polished final product.",
    additionalCredits: [
      {
        title: "3D Assets",
        name: "Haruko Hayakawa",
        url: "https://www.haruko.co/"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1128874441/d7ae4de92d?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1128874391/a594012062?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    tags: ["motion-graphics", "sound-design", "vfx"],
    stackedLayout: true
  },
  {
    id: "tods",
    title: "Tod's",
    subtitle: "Tod's x Uma Thurman - Social Media",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - would be replaced with actual image
    loopVideoUrl: "https://vimeo.com/952662879/23fe18740e?share=copy",
    client: "Tod's",
    agency: {
      name: "Panopticon Films",
      url: "https://panopticon-films.com/"
    },
    productionCompany: {
      name: "Silentface",
      url: "https://www.silentface.net/home"
    },
    role: "Editing · Sound Design & Dialogue Editor · Color · VFX Skin Retouching",
    description: "Led by Panopticon Films and Silentface, AC POST collaborated on a social media asset for Tod's featuring actress Uma Thurman. Captured from a live event, the piece was showcased on Tod's official Instagram account, where it garnered over half a million views and strong engagement.",
    externalLinks: [
      {
        title: "Watch it on Instagram!",
        url: "https://www.instagram.com/tods/reel/C3ZvCIxMAdX/"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/952662879/23fe18740e?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    tags: ["editing", "vfx", "color", "sound-design"],
    stackedLayout: true
  },
  {
    id: "nick-jr",
    title: "Nick Jr.",
    subtitle: "Rusty Rivet's TVC & Dino-Week Deliverables",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - would be replaced with actual image
    loopVideoUrl: "https://vimeo.com/218018308?share=copy",
    client: "Nick Jr",
    role: "Editing",
    description: "Worked with internal producer and creative lead Gabe Sigel, for Rusty Rivet's TVC and other dino-week ad deliverables.",
    additionalCredits: [
      {
        title: "Creative Lead",
        name: "Gabe Sigel",
        url: "https://gabesiegal.com/"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/218018308?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    tags: ["editing"],
    stackedLayout: true
  },
  {
    id: "olaplex",
    title: "Olaplex",
    subtitle: "Banners & Infographics",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - would be replaced with actual image
    loopVideoUrl: "https://vimeo.com/1087814534/cad4f377df",
    client: "Olaplex",
    agency: {
      name: "Inspira",
      url: "https://inspiramarketing.com/"
    },
    productionCompany: {
      name: "SuiteSpot",
      url: "https://www.suitespot.tv/"
    },
    role: "Motion Designer & Visual Finishing Artist",
    description: "AC POST created select VFX composite scenes, transforming 2D product photography into immersive 2.5D environments with cinematic camera moves and layered water compositing elements such as steam, rain, and droplets on packaging. As part of a collaborative design team, I contributed as a motion designer and visual finisher across both stills and live-action plates. My responsibilities included crafting motion graphics, photo retouching, and high-precision rotoscoping. I executed advanced video enhancement and detailing—utilizing tools like Fixel Detailizer to selectively refine gradations, textures, and visual clarity for polished, cinematic results. I also handled multilanguage versioning, adapting visual and typographic elements for international audiences, and contributed to the design of on-screen text and graphic elements, aligning with the overarching visual direction.",
    tags: ["motion-graphics", "vfx", "color"],
    assets: [
      // Video DOOH loops
      {
        videoUrl: "https://vimeo.com/1087822087/808967332a?share=copy",
        thumbnailUrl: "",
        aspectRatio: "ultrawide" // 2880x1200
      },
      {
        videoUrl: "https://vimeo.com/1087822183/321342adb6?share=copy",
        thumbnailUrl: "",
        aspectRatio: "ultrawide" // 2880x1200
      },
      {
        videoUrl: "https://vimeo.com/1087822568/444b70dd3b?share=copy",
        thumbnailUrl: "",
        aspectRatio: "wide" // 1160x750
      },
      {
        videoUrl: "https://vimeo.com/1087822559/f5968a7809?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait" // 600x750
      },
      {
        videoUrl: "https://vimeo.com/1087822521/bf50e2fa74?share=copy",
        thumbnailUrl: "",
        aspectRatio: "ultrawide" // 2880x1200
      },
      {
        videoUrl: "https://vimeo.com/1087822511/fe6e337be0?share=copy",
        thumbnailUrl: "",
        aspectRatio: "wide" // 1160x750
      },
      {
        videoUrl: "https://vimeo.com/1087822501/ce82c51e0d?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait" // 600x750
      },
      {
        videoUrl: "https://vimeo.com/1087822446/a0a3766410?share=copy",
        thumbnailUrl: "",
        aspectRatio: "wide" // 1160x750
      },
      {
        videoUrl: "https://vimeo.com/1087822436/a4e2a7f08e?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait" // 600x750
      },
      {
        videoUrl: "https://vimeo.com/1087822398/1d230fcc9a?share=copy",
        thumbnailUrl: "",
        aspectRatio: "ultrawide" // 2880x1200
      },
      {
        videoUrl: "https://vimeo.com/1087822207/7d783d4641?share=copy",
        thumbnailUrl: "",
        aspectRatio: "ultrawide" // 2880x1200
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "slack-combined",
    title: "Slack",
    subtitle: "Slack System Process Training",
    stillImageUrl: "https://vumbnail.com/1099067029.jpg",
    loopVideoUrl: "https://vimeo.com/1099067029/df3a4cfcfa?share=copy",
    client: "Slack",
    productionCompany: {
      name: "Suite Spot",
      url: "https://www.suitespot.tv/"
    },
    role: "Motion Graphics · Sound Design & Mix",
    description: "Collaborated with Suite Spot and Slack's internal team to produce a concise instructional video guiding Slack personnel through a key system process. Delivered under a tight turnaround, the piece combined custom-designed motion graphics with pre-existing character assets, integrated into an engaging, polished animation. Managed the full post-production pipeline, including editing, color, and detailed sound design and mix.",
    tags: ["motion-graphics", "sound-design"],
    additionalCredits: [
      {
        title: "Post Supervisor",
        name: "Conor O'Donnell"
      },
      {
        title: "Assistant",
        name: "Daniel Lewinstein",
        url: "https://www.daniellewinstein.com/"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1099067029/df3a4cfcfa?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video",
        title: "Slack",
        subtitle: "Slack System Process Training",
        description: "Collaborated with Suite Spot and Slack's internal team to produce a concise instructional video guiding Slack personnel through a key system process. Delivered under a tight turnaround, the piece combined custom-designed motion graphics with pre-existing character assets, integrated into an engaging, polished animation. Managed the full post-production pipeline, including editing, color, and detailed sound design and mix.",
        role: "Motion Graphics · Sound Design & Mix · Color"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "lowes-foods",
    title: "Lowe's Foods",
    subtitle: "Brown Bear for Brown Bag",
    stillImageUrl: "https://f.io/e3aN3Knv",
    loopVideoUrl: "https://vimeo.com/1087204567/6d8b4a0db0",
    client: "Lowe's Foods",
    agency: {
      name: "Walrus",
      url: "https://walrusnyc.com/"
    },
    productionCompany: {
      name: "Cardboard Spaceship",
      url: "https://cardboard-spaceship.com/unleashing-creativity-and-imagination-with-cardboard-spaceship/"
    },
    role: "Motion Graphics · Editing · VFX",
    description: "In collaboration with Walrus Agency and production company Cardboard Spaceship, AC POST delivered a vibrant campaign for Lowe's Foods: Brown Bear for Brown Bag. Brought to life by actor Matthew Mason in a semi-animatronic suit and voiced by Daniel Wisniewski, the quirky, charismatic bear became the face of the brand's eco-friendly bag initiative, blending humor with a heartfelt environmental message. Post-production spanned the entire pipeline — editorial that sharpened comedic timing, motion graphics, visual effects, nuanced sound design and mix that amplified the bear's personality, and color grading that reinforced the warm, approachable aesthetic. The campaign rolled out across multiple platforms and was recognized in Muse by Clio for its inventive sustainability storytelling.",
    tags: ["vfx"],
    additionalCredits: [
      {
        title: "Sound Design & Mix",
        name: "Matt Richman - SoundSpot Studios",
        url: "https://www.SpotSoundStudio.com"
      },
      {
        title: "Color Grading",
        name: "Rob Bessette - Color Refinery",
        url: "https://www.colorrefinery.com"
      }
    ],
    externalLinks: [
      {
        title: "Read the Muse by Clio article",
        url: "https://musebyclios.com/advertising/this-talking-bear-and-musical-squirrel-sure-love-lowes-foods/"
      },
      {
        title: "View the entire campaign on Walrus",
        url: "https://walrusnyc.com/case_study/brown-bear-for-brown-bag/"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1059759864/f79335578f",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1059525770/7b3979c7e8",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1059760104/088fd3cbbc",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1064100128/b95f587ea5",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "walmart",
    title: "Walmart",
    subtitle: "HOMECOMING",
    stillImageUrl: "https://vumbnail.com/622505026.jpg",
    loopVideoUrl: "https://vimeo.com/622505026/4f4e9fa480?share=copy",
    client: "Walmart",
    agency: {
      name: "Magic Seed Co.",
      url: "https://magicseed.co/"
    },
    role: "Motion Graphics · Sound Design & Mix",
    description: "Collaborated with lead designers and creatives to produce a 30-second loopable spot for Walmart's HOMECOMING awareness campaign. The spot aired nationwide on Walmart TV screens in-store and served as a toolkit for partners, supporting a broader media strategy that included streaming, TV commercials, and more.",
    tags: ["motion-graphics"],
    additionalCredits: [
      {
        title: "Lead Designer",
        name: "Carlos Foxworthy",
        url: "https://www.carlosfoxworthy.com/"
      },
      {
        title: "Additional Motion Graphics",
        name: "Dustin Ward - WARDCINEMA",
        url: "https://www.wardcinema.com/"
      }
    ],
    externalLinks: [
      {
        title: "Bronze Award CLIOS (read more)",
        url: "https://clios.com/winners-gallery/details/142035"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/622505026/4f4e9fa480?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "nintendo",
    title: "Nintendo",
    subtitle: "Fire Emblem 30th Anniversary Special",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://www.youtube.com/watch?v=-zEVrpXDZcE",
    client: "Nintendo",
    productionCompany: {
      name: "Suite Spot",
      url: "https://www.suitespot.tv/"
    },
    role: "Motion Graphics · Editing · Sound Mix · Color",
    description: "Partnered with Suite Spot and Nintendo's internal team to deliver an hour-long promotional piece celebrating 30 years of the Fire Emblem series — a franchise with a rich history and passionate global fan base. This special featured cast interviews and behind-the-scenes stories, blending multi-cam live-action setups with integrated animated segments and motion graphics. Co-edited and co-animated with Alex Sherman, implementing character animations created by Hedy Lee and customizing select reactions for key moments. Handled editing, motion graphics, final sound mix, and color under the supervision of Conor O'Donnell.",
    tags: ["editing", "motion-graphics", "color", "sound-design"],
    additionalCredits: [
      {
        title: "Post Supervisor",
        name: "Conor O'Donnell"
      },
      {
        title: "Co-Editor/Co-Animator",
        name: "Alex Sherman"
      },
      {
        title: "Character Animator Toolkit, Titles, and Lower Thirds Design",
        name: "Hedy Lee"
      }
    ],
    assets: [
      {
        videoUrl: "https://www.youtube.com/watch?v=-zEVrpXDZcE",
        thumbnailUrl: "",
        aspectRatio: "video",
        subtitle: "Fire Emblem 30th Anniversary Special",
        description: "Partnered with Suite Spot and Nintendo's internal team to deliver an hour-long promotional piece celebrating 30 years of the Fire Emblem series — a franchise with a rich history and passionate global fan base. This special featured cast interviews and behind-the-scenes stories, blending multi-cam live-action setups with integrated animated segments and motion graphics. Co-edited and co-animated with Alex Sherman, implementing character animations created by Hedy Lee and customizing select reactions for key moments. Handled editing, motion graphics, final sound mix, and color under the supervision of Conor O'Donnell.",
        additionalCredits: [
          {
            title: "Post Supervisor",
            name: "Conor O'Donnell"
          },
          {
            title: "Co-Editor/Co-Animator",
            name: "Alex Sherman"
          },
          {
            title: "Character Animator Toolkit, Titles, and Lower Thirds Design",
            name: "Hedy Lee"
          }
        ]
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "mtv-champs",
    title: "MTV",
    subtitle: "Champs vs Stars Promo",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://vimeo.com/273798255?share=copy",
    client: "MTV",
    productionCompany: {
      name: "Suite Spot",
      url: "https://www.suitespot.tv/"
    },
    role: "Editor",
    description: "Edited a select series of promotional assets for MTV's Champs vs. Stars, including TVC and social cutdowns, delivering multiple versions optimized for network and social rollout.",
    assets: [
      {
        videoUrl: "https://vimeo.com/273798255?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/273798265?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "advil",
    title: "Advil",
    subtitle: "Brehanna Daniels Influencer Partnership & Brand Refresh",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - would be replaced with actual image
    loopVideoUrl: "https://vimeo.com/1122570117/220edad60f?share=copy",
    client: "Advil",
    agency: {
      name: "DDB",
      url: "https://www.ddb.com/"
    },
    role: "Motion Graphics · Editing · Sound design & Mix · Color",
    description: "Led editing and motion graphics across two distinct Advil social campaigns. For the Brehanna Daniels influencer spotlight, managed full post-production—editing, motion design, sound design and mix, and color grading—bringing agency-designed assets to life for Instagram. For the second campaign, handled editing and motion graphics for social ad assets designed for no-sound playback across multiple platforms.",
    tags: ["motion-graphics", "editing", "sound-design", "color"],
    assets: [
      {
        videoUrl: "https://vimeo.com/428639357?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/428643888/6fa558ab2b?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/428643855/6c528049a5?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "jnj",
    title: "J&J",
    subtitle: "5B Documentary Award Submission",
    stillImageUrl: "https://f.io/2YJHx-B5",
    loopVideoUrl: "https://vimeo.com/1087212145/409286afb3",
    client: "Johnson & Johnson",
    agency: {
      name: "UM Worldwide",
      url: "https://www.umww.com/"
    },
    productionCompany: {
      name: "SuiteSpot",
      url: "https://www.suitespot.tv/"
    },
    role: "Motion Graphics · Editing · Sound design & Mix · Color",
    description: "I contributed to an award submission for the documentary 5B, which chronicles the nurses and caregivers who opened the first AIDS ward at San Francisco General Hospital. I edited archival footage together with a new interview featuring the film's editor to create a cohesive and emotionally resonant entry.",
    additionalCredits: [
      {
        title: "Additional Post Color",
        name: "Zach Jopling",
        url: "https://www.zachjopling.com/"
      }
    ],
    externalLinks: [
      {
        title: "Watch the 5B Trailer on YouTube",
        url: "https://youtu.be/oOwm214-xFQ?si=nARVji8NlyncTfG6"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/358919608",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works", "Feature Films"],
    stackedLayout: true
  },
  {
    id: "royal-canin",
    title: "Royal Canin",
    subtitle: "Brand Campaign",
    stillImageUrl: "https://f.io/WcTfKP9H",
    loopVideoUrl: "https://vimeo.com/749742251/4fc2b6b250?share=copy",
    client: "Royal Canin",
    agency: {
      name: "adam&eveDDB",
      url: "https://adamandevenyc.com/"
    },
    role: "Motion Graphics · Editing · Sound design & Mix · Color",
    description: "Worked with agency creatives to execute deliverables based on previous media and integration with graphics elements. Campaign includes TVC spots, social media content across multiple platforms, award show materials, awareness campaigns, and educational content.",
    tags: ["motion-graphics", "editing", "color"],
    assets: [
      // TVC
      {
        videoUrl: "https://vimeo.com/749732532/850eb015f1?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1065353927/5dd9149ae9?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1065353836/baf44c7b0a?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      // Puppy Preshow Social Campaign (Asset 4: 16x9, Asset 5: 4x5)
      {
        videoUrl: "https://vimeo.com/749742251/4fc2b6b250?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/749736272/6f4d018b14?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      // Award Show (Asset 6: 4x5, Asset 7: 9x16, Asset 8: 4x5)
      {
        videoUrl: "https://vimeo.com/749739368/cb303dca09?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/749735585/9626a4e894?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/749735564/c77711f8e5?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      // Awareness Campaign (Asset 9: 9x16, Asset 10: 4x5)
      {
        videoUrl: "https://vimeo.com/749806092/aea88d5edd?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/749806081/3e1de47161?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      // Social Education Campaign (Asset 11: 4x5, Asset 12: 9x16, Asset 13: 9x16, Asset 14: 9x16, Asset 15: 4x5, Asset 16: 4x5)
      {
        videoUrl: "https://vimeo.com/749806105/c24a3c47e7?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/749805948/a3d81ee841?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/749805948/a3d81ee841?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/749805908/ec006cfb3d?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/749805898/93a13a1063?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/749805889/aef0289a0b?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/749805874/094733ec2a?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/749805863/243d9f8fb1?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/749805841/dae5e2c48d?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      // New Stages (Asset 20: 9x16, Asset 21: 4x5)
      {
        videoUrl: "https://vimeo.com/749806006/17cec89607?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/749805990/a80f618343?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true,
    customLayout: true
  },
  {
    id: "fortnite-travis-scott",
    title: "Fortnite x Travis Scott",
    subtitle: "Social Media Multilanguage Versioning",
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1122570126/fba534c3e6?share=copy",
    client: "Fortnite",
    productionCompany: {
      name: "Suite Spot",
      url: "https://www.suitespot.tv/"
    },
    role: "Motion Graphics",
    description: "Delivered localized 9×16 end-card graphics for the Fortnite × Travis Scott \"Astronomical\" event, adapting layouts into multiple languages and exporting finals for global social distribution. The live shows drew 12.3 million concurrent players and over 27 million unique participants across all dates, making it one of the largest virtual concert events of its kind.",
    tags: ["motion-graphics"],
    assets: [
      {
        videoUrl: "https://vimeo.com/1114994839/3fa8d61a67?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/1114993443/ba176ebdc2?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/1114994812/e0a303c7f4?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/1114994825/6408dde045?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/1114994775/9f52e098ed?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/1114994796/77c1ed52f9?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/1114994780/ff1c56ff78?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      },
      {
        videoUrl: "https://vimeo.com/1114994789/d7346bbf89?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "pge",
    title: "PG&E",
    subtitle: "Flex Alert/Super Power Savers",
    stillImageUrl: "https://f.io/4tH5sqTD",
    loopVideoUrl: "https://vimeo.com/1087314309/ccabc6df1a",
    client: "PG&E",
    agency: {
      name: "adam&eveDDB",
      url: "https://adamandevenyc.com/"
    },
    role: "Motion Graphics & Editing",
    description: "AC Post contributed to a 2024 energy awareness campaign, creating a series of pieces to educate Californians on best practices for energy conservation and preventing power outages.",
    tags: ["motion-graphics", "editing"],
    additionalCredits: [
      {
        title: "Super Power Savers TVC: Motion graphics by AC Post. Edited and sound design by",
        name: "Matt Slamowitz",
        url: "https://www.mattslam.com/"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/952644951",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/952645847",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/952645672",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/952645691",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/952645714",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/952645480",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true,
    customLayout: true
  },
  {
    id: "bet-new-edition",
    title: "BET",
    subtitle: "New Edition Promo",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://vimeo.com/204095509?share=copy",
    client: "BET",
    agency: {
      name: "Vayner Media",
      url: "https://vaynermedia.com/"
    },
    role: "Editor · Motion Graphics",
    description: "Edited and designed motion graphics for a BET promotional spot produced by VaynerMedia, highlighting the legacy and cultural impact of New Edition.",
    assets: [
      {
        videoUrl: "https://vimeo.com/204095509?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "hay-day",
    title: "Hay Day - Meet the Farmer!",
    subtitle: "S3E2: Mikhael (Canada)",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://youtu.be/tE3btbVncSE?si=-rwp6b10poxwghC_",
    client: "Hay Day",
    productionCompany: {
      name: "Suite Spot",
      url: "https://www.suitespot.tv/"
    },
    role: "Colorist · Sound Design · Mix",
    description: "AC POST delivered the color grade, sound design, and final mix for this episode of Hay Day's \"Meet the Farmer,\" profiling Mikhael, a Quebec-based tree planter.",
    tags: ["color", "sound-design"],
    additionalCredits: [
      {
        title: "Producer",
        name: "Daniel Mecca"
      }
    ],
    assets: [
      {
        videoUrl: "https://youtu.be/tE3btbVncSE?si=-rwp6b10poxwghC_",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "enigma-labs",
    title: "Enigma Labs",
    subtitle: "Commercial Cutdowns",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://vimeo.com/952657026/8fd012224a?share=copy",
    client: "Enigma Labs",
    role: "Finishing Editor · Motion Graphics Support · Audio Editing",
    description: "Collaborated with Enigma Labs to produce four 30-second cutdowns adapted from longer hero spots for web and social. Focused on editorial refinements, minor color adjustments, integration of brand assets and new text/CTAs, and re-edited audio stems with select added sound effects for platform-ready delivery.",
    tags: ["editing", "audio-editing"],
    externalLinks: [
      {
        title: "Visit Enigma Labs",
        url: "https://enigmalabs.io/"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/952657026/8fd012224a?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/952659637/cf84a82238?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/952656794/68c8ac7871?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/952657305/1b8a4d478e?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "Global Meme Summit Sizzle Reel",
    stillImageUrl: "https://f.io/dNIexoaj",
    loopVideoUrl: "https://vimeo.com/1087313699/8477c92219",
    client: "Instagram",
    productionCompany: {
      name: "SuiteSpot",
      url: "https://www.suitespot.tv/"
    },
    role: "Motion Graphics · Editing · Sound design & Mix · Color",
    description: "Edited and animated a sizzle reel for Instagram's Global Meme Summit 2022. Recreated the show's visual style to build supporting graphics, including animating the \"Memeverse\" 3D spinning logo at :16, along with lower thirds and transition elements. Also contributed voiceover for the \"memeverse!\" line at :08.",
    assets: [
      {
        videoUrl: "https://vimeo.com/749745062",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "cbs-hot-bench",
    title: "CBS Hot Bench",
    subtitle: "Show Opener",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://vimeo.com/1121667997/29d4389ad5?share=copy",
    client: "CBS",
    productionCompany: {
      name: "Suite Spot",
      url: "https://www.suitespot.tv/"
    },
    role: "Color",
    description: "AC POST partnered with Suite Spot to provide color grading for the CBS show intro of Hot Bench.",
    tags: ["color"],
    assets: [
      {
        videoUrl: "https://vimeo.com/1121667997/29d4389ad5?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "paramount-plus-streaming",
    title: "Paramount+",
    subtitle: "Streaming Event Countdown Loop",
    stillImageUrl: "https://vumbnail.com/1065363290.jpg",
    loopVideoUrl: "https://vimeo.com/1065363290/5fb7fa1f41?share=copy",
    client: "Paramount+",
    role: "Editing · Motion Graphics · VFX",
    description: "Worked with Paramount+ to produce a 15-minute looping video for a live streaming event. Enhanced aerial footage by compositing lens flares using Video Copilot's Optical Flares.",
    tags: ["editing", "mograph", "vfx"],
    assets: [
      {
        videoUrl: "https://vimeo.com/1069048330/11ab792687?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "terry-virginia",
    title: "Terry for Virginia",
    subtitle: "Hulu TVC",
    stillImageUrl: "https://i.vimeocdn.com/video/1286958502-b8e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8-d_640",
    loopVideoUrl: "https://vimeo.com/643540144/39ee4a9ece?share=copy",
    client: "Terry McAuliffe for Governor",
    agency: {
      name: "Change Media Group",
      url: "https://changemediagroup.com/"
    },
    role: "Editor, Sound Design & Mix, Motion Graphics, Color",
    description: "AC Post partnered with Change Media Group to develop a campaign promotional video for Terry McAuliffe's 2021 Virginia gubernatorial run.",
    tags: ["editing", "sound-design", "motion-graphics", "color"],
    assets: [
      {
        videoUrl: "https://vimeo.com/643540144/39ee4a9ece?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "pmg",
    title: "PMG",
    subtitle: "Case Studies",
    stillImageUrl: "https://f.io/WcTfKP9H",
    loopVideoUrl: "https://vimeo.com/1087238477/3f526bba87",
    agency: {
      name: "PMG",
      url: "https://www.pmg.com/work"
    },
    productionCompany: {
      name: "SuiteSpot",
      url: "https://www.suitespot.tv/"
    },
    role: "Storyboarding · Motion Graphics · Sound design & Mix",
    description: [
      "AC Post collaborated with PMG to produce motion graphic-driven case studies showcasing the remarkable outcomes achieved with two iconic brands:",
      "'Uncrap The World' Campaign: This initiative aimed to promote environmental sustainability by encouraging consumers to choose eco-friendly products.",
      "Lilly Pulitzer: A campaign designed to refresh the brand for a new generation, emphasizing inclusivity and vibrant fashion."
    ],
    tags: ["motion-graphics"],
    externalLinks: [
      {
        title: "Read PMG's comprehensive case study on the 'Uncrap The World' campaign",
        url: "https://www.pmg.com/work/who-gives-a-crap-global-campaign"
      },
      {
        title: "View Lilly Pulitzer Case Study",
        url: "https://www.pmg.com/work/lilly-pulitzer-for-a-new-generation-of-originals"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1087233778/a50a2598cc",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1059516927/2a7f15f54d",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "mcdonalds",
    title: "McDonald's",
    subtitle: "Mambo Sauce (Mini Doc Series)",
    stillImageUrl: "https://f.io/-ZMRccLt",
    loopVideoUrl: "https://vimeo.com/1087811174/0dfd378f8a",
    client: "McDonald's",
    agency: {
      name: "Twin Elephant Post",
      url: "https://www.twinelephantpost.com/"
    },
    role: "Motion Graphics",
    description: "Motion Graphics for lower thirds, titles, and end credits. Editorial assistant to the lead editor and creative, Chris Besecker.",
    tags: ["motion-graphics"],
    externalLinks: [
      {
        title: "McDonald's Corporate Article: Voices Behind Mambo Sauce",
        url: "https://corporate.mcdonalds.com/corpmcd/our-stories/article/voices-behind-mambo-sauce.html"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/952660298",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "syfy-magicians",
    title: "SyFy Channel",
    subtitle: "The Magicians - Social Media", 
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1122520400/c7a75e84fb?share=copy",
    client: "SyFy Channel",
    agency: {
      name: "Vayner Media",
      url: "https://vaynermedia.com/"
    },
    role: "Motion Graphics",
    description: "AC POST collaborated with VaynerMedia to create a versatile graphics template for The Magicians social media shoutouts. Designed and built entirely from scratch, the template replicated the show's signature sigil style and could be customized with any fan's name for seamless use across campaigns.",
    tags: ["motion-graphics"],
    assets: [
      {
        videoUrl: "https://vimeo.com/1122520383/53e1f34011?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520400/c7a75e84fb",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520392/708b60888f",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520405/98329dbc42",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520411/4ab3c3bf0c",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520418/cab582fb4b",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520427/a3ac07909b",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520429/c69130dad1",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520435/786e884cdf",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520439/bfa56237f4",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/1122520448/ac4f073da5",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "thermacare",
    title: "Thermacare",
    subtitle: "Social",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://vimeo.com/428657616/7d97493e86?share=copy",
    client: "Thermacare",
    agency: {
      name: "Tribal Worldwide",
      url: "https://www.tribalworldwide.com/"
    },
    role: "Motion Graphics",
    description: "AC POST created a series of advertisements combining motion graphics with live-action footage, working from agency-designed boards to execute the creative director's vision through dynamic motion.",
    tags: ["motion-graphics"],
    assets: [
      {
        videoUrl: "https://vimeo.com/428657616/7d97493e86?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428657535/687e6ef93b?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428657552/0d96c16d02?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428657577/83f3c1e731?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428657585/95b05edbb9?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "att-social",
    title: "AT&T",
    subtitle: "Social Media Campaigns",
    stillImageUrl: "https://f.io/WcTfKP9H",
    loopVideoUrl: "https://vimeo.com/428664558/233c803025?share=copy",
    client: "AT&T",
    agency: {
      name: "DDB",
      url: "https://www.ddb.com/"
    },
    role: "Motion Graphics",
    description: "Collaborated with DDB to produce a series of AT&T social campaigns promoting safe driving practices. Working from agency-designed frames, I handled editing, motion graphics, and VFX compositing — integrating the handwritten \"IT CAN WAIT\" message onto the palms of two live-action talents, consistent with the campaign's visual style. Deliverables included both silent social posts and versions with custom audio, tailored for platform-specific delivery and brand alignment.",
    tags: ["motion-graphics", "vfx"],
    assets: [
      {
        videoUrl: "https://vimeo.com/428664600/4044240b7e?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428664565/2685de8178?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428664558/233c803025?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428682932/a5e11e6c8c?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428682929/a983907f81?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428664624/468138d03b?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/428664606/fa8a60b4a6?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428664636/88589ee3bc?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428664630/d54317f43c?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428664610/4b3e1c5096?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      },
      {
        videoUrl: "https://vimeo.com/428664585/f851d5f3f1?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/428664548/324b3d6031?share=copy",
        thumbnailUrl: "",
        aspectRatio: "square"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "adidas",
    title: "Adidas",
    subtitle: "Social Media Campaign",
    stillImageUrl: "https://i.vimeocdn.com/video/749745062-b8e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8-d_640",
    loopVideoUrl: "https://vimeo.com/358919780/ac5992170f?share=copy",
    client: "Adidas",
    productionCompany: {
      name: "NYLAC.TV",
      url: "https://nylac.tv"
    },
    role: "Motion Graphics",
    description: "Supported lead editor and creative director Rick Starick and the internal Adidas team as assistant editor and motion graphics designer on a series of social assets promoting the brand's campaign.",
    tags: ["motion-graphics"],
    additionalCredits: [
      {
        title: "Lead Editor / Creative Director",
        name: "Rick Starick",
        url: "https://nylac.tv"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/358919780/ac5992170f?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      },
      {
        videoUrl: "https://vimeo.com/299876971?share=copy",
        thumbnailUrl: "",
        aspectRatio: "portrait"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "im-home",
    title: "I'm Home",
    subtitle: "Short Film – Love Serve Remember Foundation",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://vimeo.com/1118112999/f6852416cb?share=copy",
    client: "Love Serve Remember Foundation",
    clientUrl: "https://www.ramdass.org/",
    role: "Concept · Direction · Production · Editing · Compositing · Color · Post-Finishing",
    description: [
      "AC POST, in partnership with the Love Serve Remember Foundation, produced I'm Home, a stop-motion animation short featuring Ram Dass. Set in a nondescript motel in Middle America, the film uses puppetry, set design, and animation to explore \"home\" as something within.",
      "Through humor, poetic narration, and visual metaphor, it becomes a meditation on presence beyond physical form. Selected for screening at the Provincetown International Film Festival 2024, an Academy Award®–qualifying festival."
    ],
    additionalCredits: [
      { title: "Narration", name: "Ram Dass" },
      { title: "Executive Producer", name: "Raghu Markus" },
      { title: "Animators", name: "Giacomo Giuriato · Alex Morelli · María Jiménez Romero" },
      { title: "Puppet Maker & Set Fabricator", name: "Martina Tondi" },
      { title: "DP & Motion Control Operator", name: "Enrico Gerli" },
      { title: "Post Production", name: "Marta Giuliano" },
      { title: "Storyboard Artist", name: "Stephanie Sykes" },
      { title: "Shooting Stage", name: "Officina15 APS" },
      { title: "Producers", name: "Dan Mecca · Kunal Datta · Alan Pierson · Kelly Rego · Mangala Braymiller · Rachael Fisher · Adrian Carey" },
      { title: "Festival Producer", name: "David M. Nightmaire" },
      { title: "Post Supervisor", name: "Conor O'Donnell" },
      { title: "Directing & Post Finishing", name: "Adrian Carey" }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1118112999/f6852416cb?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["shorts", "editing", "vfx", "color"],
    categories: ["Featured Works", "Short Films"],
    stackedLayout: true,
    overlayImageUrl: "https://cdn.jsdelivr.net/gh/free-whiteboard-online/Free-Erasorio-Alternative-for-Collaborative-Design@50a225025c13baafce354ac5965cf3f22c8b6e46/uploads/2025-09-21T00-33-24-459Z-t5iykidp2.png"
  },
  {
    id: "mariposas",
    title: "Mariposas",
    subtitle: "Short Film",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://vimeo.com/228007763?share=copy",
    role: "Director · Editor · Post Supervisor",
    description: [
      "Set in a universe of magical realism, Mariposas opens on a group of parents waiting in a school car-pool line to pick up their children. One boastful father prattles on superficially about his daughter to another, but is unable to perceive her when it matters most. Based on the short story of the same title by Argentinian author Samanta Schweblin.",
      "After its extensive festival run, Mariposas has screened at 333 film festivals worldwide, across 58 countries and 27 U.S. states, reaching audiences on six continents. The film has earned 93 nominations and won 168 awards, with recognition across categories including Best Short Film, Best Director, Best Actor, Best Editing/VFX, Best Score, and Best Poster. Highlights include Academy-qualifying programs, student outreach through Cleveland International Film Festival's FilmSlam, and screenings in North America, Europe, Asia, South America, Africa, and Oceania."
    ],
    externalLinks: [
      {
        title: "Read Film Threat Review",
        url: "https://filmthreat.com/reviews/mariposas/"
      }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/228007763?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["directing", "shorts", "editing"],
    categories: ["Short Films"],
    stackedLayout: true
  },
  {
    id: "transcending-judgement",
    title: "Transcending Judgement",
    subtitle: "Short Film – Love Serve Remember Foundation",
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1118838319/c7ff4077d2?share=copy",
    client: "Love Serve Remember Foundation",
    clientUrl: "https://www.ramdass.org/",
    role: "Concept · Direction · Production · Editing · Color · Post-Finishing",
    description: [
      "AC POST, in partnership with the Love Serve Remember Foundation, produced an Unreal Engine–driven animated short based on a Ram Dass lecture. The film translates his 'woods' metaphor—seeing trees without judgment—into a visual essay on human uniqueness and acceptance. AC POST provided editorial integration, post finishing and color to shape the final piece into a calm, meditative work anchored by the original narration.",
      "• Winner — Sugar Loaf Film Festival (2023)",
      "• Semi-Finalist — Max Sir International Film Festival (2023)",
      "• Quarter-Finalist — WideScreen Film & Music Video Festival (2024)"
    ],
    additionalCredits: [
      { title: "Narration", name: "Ram Dass" },
      { title: "Executive Producer", name: "Raghu Markus" },
      { title: "Animator", name: "Graeme van Rensburg" },
      { title: "Metahuman Ram Dass Modeler", name: "Akshay Gadekar" },
      { title: "Sound Design & Mix", name: "David Bass" },
      { title: "Producers", name: "Dan Mecca · Kunal Datta · Alan Pierson · Kelly Rego · Mangala Braymiller · Rachael Fisher · Adrian Carey" },
      { title: "Festival Producer", name: "David M. Nightmaire" },
      { title: "Post Supervisor", name: "Conor O' Donnell" },
      { title: "Directing & Post Finishing", name: "Adrian Carey" }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1118838319/c7ff4077d2?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["shorts", "directing", "editing", "color", "vfx"],
    categories: ["Short Films"],
    stackedLayout: true
  },
  {
    id: "breaking-addiction-to-method",
    title: "Breaking Addiction to Method",
    subtitle: "Short Film – Love Serve Remember Foundation",
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1118118826/3dbdd867e0?share=copy",
    client: "Love Serve Remember Foundation",
    clientUrl: "https://www.ramdass.org/",
    role: "Direction · Production · Editing · Color · Post-Finishing",
    description: "AC POST, in partnership with the Love Serve Remember Foundation, produced an animated short drawn from a Ram Dass lecture. The film examines the balance between using methods for inner growth and avoiding attachment to them—using the rhythm of breath as a meditation tool—while tracing a transformative arc toward love and a loosening of fixed perceptions. AC POST handled editorial and post-finishing.",
    additionalCredits: [
      { title: "Narration", name: "Ram Dass" },
      { title: "Executive Producer", name: "Raghu Markus" },
      { title: "Animation, Storyboards, Layout/Camera & Look Development", name: "Mirko Pelliccia" },
      { title: "Sound Design & Mix", name: "David Bass" },
      { title: "Producers", name: "Dan Mecca · Kunal Datta · Alan Pierson · Kelly Rego · Mangala Braymiller · Rachael Fisher · Adrian Carey" },
      { title: "Festival Producer", name: "David M. Nightmaire" },
      { title: "Post Supervisor", name: "Conor O'Donnell" },
      { title: "Directing & Post Finishing", name: "Adrian Carey" }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1118118826/3dbdd867e0?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["shorts", "directing", "editing", "color"],
    categories: ["Short Films"],
    stackedLayout: true
  },
  {
    id: "loving-the-unlovable",
    title: "Loving the Unlovable",
    subtitle: "Short Film – Love Serve Remember Foundation",
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1118117218/f558ff2168?share=copy",
    client: "Love Serve Remember Foundation",
    clientUrl: "https://www.ramdass.org/",
    role: "Directing · Producing · Editing",
    description: "In collaboration with the Love Serve Remember Foundation, AC POST directed, produced, and edited this 2D-animated interpretation of Ram Dass's guidance on cultivating compassion.",
    additionalCredits: [
      { title: "Narration", name: "Ram Dass" },
      { title: "Executive Producer", name: "Raghu Markus" },
      { title: "Creative Director", name: "Malachi Staples" },
      { title: "Project Manager & Animator", name: "Jenny Mintz" },
      { title: "Backgrounds & Illustrations", name: "JR Pagaduan" },
      { title: "Character Designs", name: "Alejandra Anguita" },
      { title: "Compositor", name: "Cole Cummings" },
      { title: "Storyboard Artist", name: "Leonardi Guzman" },
      { title: "Sound Design & Mix", name: "David Bass" },
      { title: "Producers", name: "Dan Mecca · Kunal Datta · Alan Pierson · Kelly Rego · Mangala Braymiller · Rachael Fisher · Adrian Carey" },
      { title: "Festival Producer", name: "David M. Nightmaire" },
      { title: "Post Supervisor", name: "Conor O'Donnell" },
      { title: "Directing & Post Finishing", name: "Adrian Carey" }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1118117218/f558ff2168?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["shorts", "directing", "editing", "producing"],
    categories: ["Featured Works", "Short Films"],
    stackedLayout: true,
    overlayImageUrl: "https://cdn.jsdelivr.net/gh/free-whiteboard-online/Free-Erasorio-Alternative-for-Collaborative-Design@9f9a18794f989430a080b57f358422d5d572e314/uploads/2025-09-22T01-14-56-048Z-o4fpg5mbi.png"
  },
  {
    id: "escaping-the-prison-of-the-mind",
    title: "Escaping the Prison of the Mind",
    subtitle: "Short Film – Love Serve Remember Foundation",
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1118114092/671c84e765?share=copy",
    client: "Love Serve Remember Foundation",
    clientUrl: "https://www.ramdass.org/",
    role: "Direction · Production · Post-Finishing",
    description: "AC POST, in collaboration with the Love Serve Remember Foundation, produced a 2D-animated short built from a Ram Dass talk on aging, perception, and the social constructs that shape identity. The film presents his guidance as a clear visual essay—grounded by narration and concise 2D animation—inviting viewers to look beyond convention and question the mind's narratives.",
    additionalCredits: [
      { title: "Narration", name: "Ram Dass" },
      { title: "Executive Producer", name: "Raghu Markus" },
      { title: "Animator & Storyboard Artist", name: "Fried", url: "https://www.danielearcuri.com" },
      { title: "Sound Design & Mix", name: "David Bass" },
      { title: "Producers", name: "Dan Mecca · Kunal Datta · Alan Pierson · Kelly Rego · Mangala Braymiller · Rachael Fisher · Adrian Carey" },
      { title: "Festival Producer", name: "David M. Nightmaire" },
      { title: "Post Supervisor", name: "Conor O' Donnell" },
      { title: "Directing & Post Finishing", name: "Adrian Carey" }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1118114092/671c84e765?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["shorts", "directing", "producing"],
    categories: ["Short Films"],
    stackedLayout: true,
    overlayImageUrl: "https://cdn.jsdelivr.net/gh/free-whiteboard-online/Free-Erasorio-Alternative-for-Collaborative-Design@a324236f0348df3819afa0f60cdb132d1f61e3fd/uploads/2025-09-22T01-23-21-586Z-c0sh7302p.png"
  },
  {
    id: "cultivating-imagination",
    title: "Cultivating Imagination",
    subtitle: "Short Film – Love Serve Remember Foundation",
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1118112356/ca6a485b93?share=copy",
    client: "Love Serve Remember Foundation",
    clientUrl: "https://www.ramdass.org/",
    role: "Direction · Post-Finishing",
    description: [
      "AC POST directed and delivered post-finishing on a 2D-animated short drawn from a Ram Dass talk that uses his relationship with Maharaji to interrogate imagination versus reality—framing spiritual methods as intentional constructs designed to break the very constructs they create.",
      "• Winner — Denver Monthly Film Awards, Best Super Short Film (2023)"
    ],
    additionalCredits: [
      { title: "Narration", name: "Ram Dass" },
      { title: "Executive Producer", name: "Raghu Markus" },
      { title: "Animator", name: "Manuel Victoria" },
      { title: "Storyboard Artist", name: "Alex Sherman" },
      { title: "Sound Design & Mix", name: "David Bass" },
      { title: "Producers", name: "Dan Mecca · Kunal Datta · Alan Pierson · Kelly Rego · Mangala Braymiller · Rachael Fisher · Adrian Carey" },
      { title: "Festival Producer", name: "David M. Nightmaire" },
      { title: "Post Supervisor", name: "Conor O'Donnell" },
      { title: "Directing & Post Finishing", name: "Adrian Carey" }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1118112356/ca6a485b93?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["shorts", "directing"],
    categories: ["Short Films"],
    stackedLayout: true
  },
  {
    id: "devotional-power-of-music",
    title: "The Devotional Power of Music",
    subtitle: "Short Film – Love Serve Remember Foundation",
    stillImageUrl: "",
    loopVideoUrl: "https://vimeo.com/1120691294/9244476c72?share=copy",
    client: "Love Serve Remember Foundation",
    clientUrl: "https://www.ramdass.org/",
    role: "Character Animation · Editing",
    description: [
      "AC POST, in partnership with the Love Serve Remember Foundation, delivered a 2D-animated short built from Ram Dass's account of Anandamayi Ma and devotional song. AC POST handled character animation and editorial, integrating illustrated artwork with narration to present a clear, presence-driven visual essay."
    ],
    additionalCredits: [
      { title: "J'ai Om Bhagwan", name: "The Devotional Power of Music" },
      { title: "Narration", name: "Ram Dass" },
      { title: "Executive Producer", name: "Raghu Markus" },
      { title: "Illustrator & Animator", name: "Romana Vashtar" },
      { title: "Character Animator", name: "Adrian Carey" },
      { title: "Composer", name: "Forrest Del" },
      { title: "Sound Design & Mix", name: "David Bass" },
      { title: "Producers", name: "Dan Mecca · Kunal Datta · Alan Pierson · Kelly Rego · Mangala Braymiller · Rachael Fisher · Adrian Carey" },
      { title: "Festival Producer", name: "David M. Nightmaire" },
      { title: "Post Supervisor", name: "Conor O' Donnell" },
      { title: "Directing & Post Finishing", name: "Adrian Carey" }
    ],
    assets: [
      {
        videoUrl: "https://vimeo.com/1120691294/9244476c72?share=copy",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["shorts", "animation", "editing"],
    categories: ["Short Films"],
    stackedLayout: true
  },
  {
    id: "my-heart-song",
    title: "My Heart Song",
    subtitle: "Official Music Video – Ram Dass × John Pattern",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://youtu.be/ilIKHZAeEv8?si=89nhsZ39koT997Be",
    client: "Love Serve Remember Foundation",
    clientUrl: "https://www.ramdass.org/",
    role: "Editing · Motion Graphics · Animation",
    description: "AC POST partnered with the Love Serve Remember Foundation to produce the My Heart Song music video featuring audio and archival footage of Ram Dass and music by John Pattern. Drawing from vintage 35mm and 16mm digitized footage, AC POST employed rotoscoping, compositing, and animation workflows to restore and seamlessly integrate the archival elements. The visuals were crafted to feel meditative and authentic—honoring the integrity of the original recordings while shaping a cohesive, contemplative narrative.",
    assets: [
      {
        videoUrl: "https://youtu.be/ilIKHZAeEv8?si=89nhsZ39koT997Be",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["motion-graphics", "editing", "music-videos"],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "kiss-forrest-del",
    title: "Kiss",
    subtitle: "Official Music Video – Forrest Del",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://youtu.be/a_mnJBO-6oM?si=XV4lZwCwx2sfkwwl",
    role: "Concept · Production · Direction · Editing · Motion Graphics · Visual Effects · Color",
    description: "AC POST partnered with musician Forrest Del to develop and deliver the visuals for \"Kiss.\" From concept through post, AC POST produced, directed, edited, and applied motion graphics, VFX, and color grading to craft a cohesive visual narrative. The work balanced aesthetic polish with emotive performance, integrating choreography, cinematography, and stylized effects to enhance the song's mood without overshadowing it.",
    additionalCredits: [
      {
        title: "DP/Producer",
        name: "Chris Ungco (@chrisungcodp)",
        url: "https://instagram.com/chrisungcodp"
      },
      {
        title: "Starring",
        name: "Alexis Van Dyke (@lexi.vandyke)",
        url: "https://instagram.com/lexi.vandyke"
      },
      {
        title: "Choreographer",
        name: "Stephanie George (@stephshaygeorge)",
        url: "https://instagram.com/stephshaygeorge"
      },
      {
        title: "AC",
        name: "Madi Stonefield (@hey.hotdog)",
        url: "https://instagram.com/hey.hotdog"
      },
      {
        title: "Gaffer",
        name: "Jose Caldera (@josegcldr)",
        url: "https://instagram.com/josegcldr"
      },
      {
        title: "Key Grip",
        name: "Aria Brice (@random_protoplasam)",
        url: "https://instagram.com/random_protoplasam"
      },
      {
        title: "Hair & Makeup",
        name: "Francesca-Maria (@francescammua)",
        url: "https://instagram.com/francescammua"
      },
      {
        title: "Wardrobe",
        name: "Simin Lim (@siminlimin)",
        url: "https://instagram.com/siminlimin"
      },
      {
        title: "Mix / Master",
        name: "Joshua Pleeter (@joshuapleeter)",
        url: "https://instagram.com/joshuapleeter"
      },
      {
        title: "Post Supervisor",
        name: "Alan Pierson (@alanjpierson)",
        url: "https://instagram.com/alanjpierson"
      },
      {
        title: "Lenses",
        name: "@old_fast_glass",
        url: "https://instagram.com/old_fast_glass"
      }
    ],
    assets: [
      {
        videoUrl: "https://youtu.be/a_mnJBO-6oM?si=XV4lZwCwx2sfkwwl",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    tags: ["motion-graphics", "editing", "directing", "vfx", "color", "music-videos"],
    categories: ["Featured Works"],
    stackedLayout: true
  },
  {
    id: "usps",
    title: "USPS: Every Door Direct Mail®",
    subtitle: "EDDM Explainer Video",
    stillImageUrl: "https://f.io/WcTfKP9H", // Placeholder - will be replaced with actual image
    loopVideoUrl: "https://youtu.be/Uj8vNN23zOI?si=69QZi_tp1IzL2CZj",
    client: "USPS",
    productionCompany: {
      name: "Suite Spot",
      url: "https://www.suitespot.tv/"
    },
    role: "Editing · Motion Graphics",
    description: "AC POST provided editorial and motion graphics services for Suite Spot on the first video in USPS's Every Door Direct Mail® series.",
    tags: ["editing", "motion-graphics"],
    assets: [
      {
        videoUrl: "https://youtu.be/Uj8vNN23zOI?si=69QZi_tp1IzL2CZj",
        thumbnailUrl: "",
        aspectRatio: "video"
      }
    ],
    categories: ["Featured Works"],
    stackedLayout: true
  }
];

// Function to get portfolio items by category
export function getPortfolioItemsByCategory(category: string): PortfolioItem[] {
  return portfolioData.filter(item => 
    item.categories.includes(category)
  );
}

export interface VFXSegment {
  id: string;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
}

export interface VFXReel {
  id: string;
  title: string;
  videoUrl: string;
  segments: VFXSegment[];
}

export const vfxReelData: VFXReel = {
  id: "vfx-reel-2025",
  title: "VFX Reel 2025",
  videoUrl: "https://vimeo.com/1132843812?share=copy",
  segments: [
    {
      id: "tods",
      startTime: 4,
      endTime: 19,
      title: "Tod's x Uma Thurman",
      description: "Skin retouching and beauty enhancement."
    },
    {
      id: "olaplex",
      startTime: 19,
      endTime: 25,
      title: "Olaplex",
      description: "Environmental compositing with 3D camera parallax applied to product photography."
    },
    {
      id: "marketwatch",
      startTime: 25,
      endTime: 30,
      title: "MarketWatch",
      description: "Shine compositing and element tracking integrated onto a 3D model."
    },
    {
      id: "hbo",
      startTime: 31,
      endTime: 52,
      title: "HBO's Random Acts of Flyness",
      description: "Rotoscoping, compositing, and screen replacement for HBO's Random Acts of Flyness."
    },
    {
      id: "paramount",
      startTime: 53,
      endTime: 59,
      title: "Paramount+",
      description: "Cinematic lens-flare composites across multiple shots for a loopable screensaver used in live broadcast."
    },
    {
      id: "lowes",
      startTime: 59,
      endTime: 70,
      title: "Lowe's Foods",
      description: "Hallucination treatment, wire removal from a squirrel puppet, and general product cleanup for a regional commercial series."
    },
    {
      id: "salesforce",
      startTime: 71,
      endTime: 81,
      title: "Salesforce",
      description: "Rotoscoping, sci-fi set extensions, HUD displays, and compositing for an opening event video introducing a keynote speaker."
    },
    {
      id: "jose-cuervo",
      startTime: 82,
      endTime: 87,
      title: "Jose Cuervo",
      description: "Rotoscoping and compositing."
    },
    {
      id: "horologium",
      startTime: 88,
      endTime: 110,
      title: "Horologium (Unreleased Short Film)",
      description: "Nose replacement, electricity effects, fire and debris integration composited into live-action plates."
    },
    {
      id: "att",
      startTime: 110,
      endTime: 112,
      title: "AT&T",
      description: "Motion tracking and compositing \"It Can Wait\" messaging onto live-action plates featuring NBA players."
    },
    {
      id: "forrest-del",
      startTime: 113,
      endTime: 128,
      title: "Forrest Del – \"Kiss\" Music Video",
      description: "Rotoscoping and compositing."
    },
    {
      id: "nintendo",
      startTime: 128,
      endTime: 133,
      title: "Nintendo",
      description: "Phone-screen compositing for Nintendo Music commercial pieces."
    },
    {
      id: "acuvue",
      startTime: 134,
      endTime: 139,
      title: "Acuvue",
      description: "Signage removal and replacement across multiple shots."
    },
    {
      id: "love-serve-remember",
      startTime: 138,
      endTime: 147,
      title: "Love Serve Remember Foundation",
      description: "Compositing, frame blending, and rotoscoping for select shots in a stop-motion short film."
    }
  ]
};