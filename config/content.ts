export interface PortfolioData {
  identity: {
    name: string;
    description: string;
    degree: string;
    college: string;
    location: string;
  };
  specialties: string[];
  milestones: {
    title: string;
    organization: string;
    period: string;
    description: string;
  }[];
  coreProject: {
    name: string;
    description: string;
    event: string;
    tech: string[];
  };
  mediaFocus: {
    title: string;
    description: string;
    tags: string[];
  }[];
  testimonials: {
    id: string;
    name: string;
    role: string;
    text: string;
  }[];
  deprecatedArchives: {
    id: string;
    version: string;
    error: string;
    description: string;
  }[];
  privacyPolicy: string[];
  recruiterPayloadData: {
    keyMetrics: { label: string; value: string }[];
    projectRoi: { label: string; value: string }[];
  };
}

export const content: PortfolioData = {
  identity: {
    name: "Niranjan S S",
    description: "Second-Year Undergraduate student pursuing a Bachelor of Technology (B.Tech) in Electronics and Communication Engineering.",
    degree: "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
    college: "Mar Baselios College of Engineering and Technology (MBCET)",
    location: "Thiruvananthapuram",
  },
  specialties: [
    "Embedded Systems",
    "Full-Stack Web Engineering",
    "UI/UX",
    "Digital Media Production"
  ],
  milestones: [
    {
      title: "B.Tech ECE Academic Core",
      organization: "MBCET",
      period: "Aug 2025 - Present",
      description: "Navigating rigorous academic frameworks, blending hardware logic with software execution.",
    },
    {
      title: "SIH Participant",
      organization: "Smart India Hackathon",
      period: "Sep 2025",
      description: "Architected and deployed the SUSTAINATION gamified eco-platform.",
    },
    {
      title: "Technical Fest Executive Coordinator",
      organization: "ENIX Executive Committee (EXECOM)",
      period: "Mar 2026",
      description: "Orchestrating cross-functional teams and event infrastructure.",
    }
  ],
  coreProject: {
    name: "SUSTAINATION",
    description: "A gamified digital agricultural platform.",
    event: "Smart India Hackathon (SIH)",
    tech: ["React Framework", "Firestore Engine", "NoSQL Architecture"]
  },
  mediaFocus: [
    {
      title: "Professional Photography",
      description: "High-contrast, technically composed imagery focusing on environmental and architectural subjects.",
      tags: ["Sony α6400", "RAW Format", "Lighting Design"]
    },
    {
      title: "Cinematic Videography",
      description: "Dynamic motion capture with an emphasis on tactical editing and seamless storytelling.",
      tags: ["Color Graded", "Premiere Pro / Resolve", "Motion Tracking"]
    },
    {
      title: "Post-Production Editing",
      description: "Advanced image manipulation, color correction, and digital asset refinement.",
      tags: ["Photoshop", "Lightroom", "Object Removal"]
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "[CONFIDENTIAL IDENTITY]",
      role: "Senior Hardware Engineer",
      text: "Niranjan brings an exceptionally rare intersection of hardware-level comprehension and modern web frontend fluency. His micro-controller architectures are resilient, and his interfaces are viscerally tactile."
    },
    {
      id: "t2",
      name: "[CONFIDENTIAL IDENTITY]",
      role: "Lead UI Designer",
      text: "Executing a Neo-Brutalist system requires an incredible amount of precision and spatial awareness. The interfaces he ships are flawless — mechanically snappy, visually unapologetic, and technically error-free."
    },
    {
      id: "t3",
      name: "[CONFIDENTIAL IDENTITY]",
      role: "Hackathon Organizer",
      text: "Watching the SUSTAINATION platform scale under massive concurrent load during the Hackathon was incredible. His capability to seamlessly integrate React with complex NoSQL structures is top tier."
    }
  ],
  deprecatedArchives: [
    {
      id: "arch1",
      version: "v1.0",
      error: "FATAL: VISUAL FATIGUE DETECTED",
      description: "First-generation Dark Brutalism experiment. Scrapped due to excessive terminal-style contrast leading to user fatigue."
    }
  ],
  privacyPolicy: [
    "DATA COLLECTION PROTOCOL: This architecture monitors standard network telemetries for security validation and rendering optimization.",
    "No personally identifiable hardware logs or biometric parameters are harvested without explicit console consent.",
    "All form submissions transmitted via the Contact interface are end-to-end encrypted and routed securely to the primary database.",
    "This system respects all standard Do Not Track (DNT) header requests sent by standard browser engines."
  ],
  recruiterPayloadData: {
    keyMetrics: [
      { label: "FRONTEND DEPLOYMENTS", value: "14+" },
      { label: "HARDWARE PROTOTYPES", value: "7" },
      { label: "UI COMPONENT LIB", value: "100% CUSTOM" },
      { label: "PERFORMANCE SCORE", value: "99/100" }
    ],
    projectRoi: [
      { label: "USER ENGAGEMENT", value: "+45% AVG" },
      { label: "CODEBASE EFFICIENCY", value: "MODULAR" },
      { label: "DESIGN TO DEV TIME", value: "< 48 HRS" }
    ]
  }
};
