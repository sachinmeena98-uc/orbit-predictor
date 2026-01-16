export interface College {
  id: string;
  name: string;
  shortName: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'GFTI';
  location: {
    city: string;
    state: string;
  };
  ranks: {
    [branch: string]: {
      OPEN: number;
      'OBC-NCL': number;
      SC: number;
      ST: number;
      EWS: number;
    };
  };
  metrics: {
    nirf: number;
    avgPackage: string;
    fees: string;
    campusSize: string;
  };
  planetColor: string;
  orbitRadius: number;
  description: string;
}

export const colleges: College[] = [
  {
    id: "IITB",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    type: "IIT",
    location: { city: "Mumbai", state: "Maharashtra" },
    ranks: {
      "Computer Science": { OPEN: 100, "OBC-NCL": 250, SC: 700, ST: 350, EWS: 150 },
      "Electrical Engineering": { OPEN: 350, "OBC-NCL": 850, SC: 2200, ST: 1100, EWS: 500 },
      "Mechanical Engineering": { OPEN: 1200, "OBC-NCL": 2800, SC: 6500, ST: 3500, EWS: 1800 },
    },
    metrics: { nirf: 3, avgPackage: "₹21.5 LPA", fees: "₹10.5 L", campusSize: "550 acres" },
    planetColor: "#FF5722",
    orbitRadius: 4,
    description: "Premier engineering institute known for innovation and research excellence."
  },
  {
    id: "IITD",
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    type: "IIT",
    location: { city: "New Delhi", state: "Delhi" },
    ranks: {
      "Computer Science": { OPEN: 60, "OBC-NCL": 180, SC: 550, ST: 280, EWS: 100 },
      "Electrical Engineering": { OPEN: 280, "OBC-NCL": 700, SC: 1800, ST: 900, EWS: 400 },
      "Mechanical Engineering": { OPEN: 950, "OBC-NCL": 2200, SC: 5500, ST: 2800, EWS: 1400 },
    },
    metrics: { nirf: 2, avgPackage: "₹23.5 LPA", fees: "₹10.5 L", campusSize: "320 acres" },
    planetColor: "#FF9800",
    orbitRadius: 4.5,
    description: "Top-tier institution with strong industry connections and placements."
  },
  {
    id: "IITM",
    name: "Indian Institute of Technology Madras",
    shortName: "IIT Madras",
    type: "IIT",
    location: { city: "Chennai", state: "Tamil Nadu" },
    ranks: {
      "Computer Science": { OPEN: 120, "OBC-NCL": 300, SC: 800, ST: 400, EWS: 180 },
      "Electrical Engineering": { OPEN: 400, "OBC-NCL": 950, SC: 2500, ST: 1300, EWS: 600 },
      "Mechanical Engineering": { OPEN: 1400, "OBC-NCL": 3200, SC: 7500, ST: 4000, EWS: 2100 },
    },
    metrics: { nirf: 1, avgPackage: "₹20.5 LPA", fees: "₹10.5 L", campusSize: "617 acres" },
    planetColor: "#E91E63",
    orbitRadius: 5,
    description: "India's #1 ranked institute with a beautiful campus inside IIT Madras Research Park."
  },
  {
    id: "IITK",
    name: "Indian Institute of Technology Kanpur",
    shortName: "IIT Kanpur",
    type: "IIT",
    location: { city: "Kanpur", state: "Uttar Pradesh" },
    ranks: {
      "Computer Science": { OPEN: 200, "OBC-NCL": 450, SC: 1100, ST: 550, EWS: 280 },
      "Electrical Engineering": { OPEN: 550, "OBC-NCL": 1300, SC: 3200, ST: 1600, EWS: 800 },
      "Mechanical Engineering": { OPEN: 1800, "OBC-NCL": 4200, SC: 9500, ST: 5000, EWS: 2700 },
    },
    metrics: { nirf: 4, avgPackage: "₹18.5 LPA", fees: "₹10.5 L", campusSize: "1055 acres" },
    planetColor: "#9C27B0",
    orbitRadius: 5.5,
    description: "Known for its strong research culture and entrepreneurial ecosystem."
  },
  {
    id: "NITW",
    name: "National Institute of Technology Warangal",
    shortName: "NIT Warangal",
    type: "NIT",
    location: { city: "Warangal", state: "Telangana" },
    ranks: {
      "Computer Science": { OPEN: 4500, "OBC-NCL": 8500, SC: 18000, ST: 12000, EWS: 6000 },
      "Electrical Engineering": { OPEN: 8500, "OBC-NCL": 16000, SC: 35000, ST: 22000, EWS: 11000 },
      "Mechanical Engineering": { OPEN: 15000, "OBC-NCL": 28000, SC: 55000, ST: 38000, EWS: 20000 },
    },
    metrics: { nirf: 9, avgPackage: "₹12.5 LPA", fees: "₹6.5 L", campusSize: "250 acres" },
    planetColor: "#00BCD4",
    orbitRadius: 8,
    description: "One of the oldest NITs with excellent infrastructure and alumni network."
  },
  {
    id: "NITT",
    name: "National Institute of Technology Tiruchirappalli",
    shortName: "NIT Trichy",
    type: "NIT",
    location: { city: "Tiruchirappalli", state: "Tamil Nadu" },
    ranks: {
      "Computer Science": { OPEN: 5200, "OBC-NCL": 9800, SC: 21000, ST: 14000, EWS: 7000 },
      "Electrical Engineering": { OPEN: 9800, "OBC-NCL": 18500, SC: 40000, ST: 26000, EWS: 13000 },
      "Mechanical Engineering": { OPEN: 17000, "OBC-NCL": 32000, SC: 62000, ST: 42000, EWS: 23000 },
    },
    metrics: { nirf: 8, avgPackage: "₹11.8 LPA", fees: "₹6.5 L", campusSize: "800 acres" },
    planetColor: "#4CAF50",
    orbitRadius: 8.5,
    description: "Renowned for quality education and strong placement record."
  },
  {
    id: "NITK",
    name: "National Institute of Technology Karnataka",
    shortName: "NIT Surathkal",
    type: "NIT",
    location: { city: "Surathkal", state: "Karnataka" },
    ranks: {
      "Computer Science": { OPEN: 4800, "OBC-NCL": 9000, SC: 19500, ST: 13000, EWS: 6500 },
      "Electrical Engineering": { OPEN: 9000, "OBC-NCL": 17000, SC: 37000, ST: 24000, EWS: 12000 },
      "Mechanical Engineering": { OPEN: 16000, "OBC-NCL": 30000, SC: 58000, ST: 40000, EWS: 21500 },
    },
    metrics: { nirf: 10, avgPackage: "₹13.2 LPA", fees: "₹6.5 L", campusSize: "295 acres" },
    planetColor: "#2196F3",
    orbitRadius: 9,
    description: "Beach-side campus with excellent technical fest and cultural activities."
  },
  {
    id: "IIITH",
    name: "IIIT Hyderabad",
    shortName: "IIIT Hyderabad",
    type: "IIIT",
    location: { city: "Hyderabad", state: "Telangana" },
    ranks: {
      "Computer Science": { OPEN: 1500, "OBC-NCL": 3500, SC: 8000, ST: 5000, EWS: 2200 },
      "Electronics": { OPEN: 3200, "OBC-NCL": 7500, SC: 16000, ST: 10000, EWS: 4500 },
    },
    metrics: { nirf: 25, avgPackage: "₹16.5 LPA", fees: "₹8.5 L", campusSize: "66 acres" },
    planetColor: "#673AB7",
    orbitRadius: 11,
    description: "Research-focused institute with strong CS and AI programs."
  },
  {
    id: "IIITD",
    name: "IIIT Delhi",
    shortName: "IIIT Delhi",
    type: "IIIT",
    location: { city: "New Delhi", state: "Delhi" },
    ranks: {
      "Computer Science": { OPEN: 2000, "OBC-NCL": 4500, SC: 10000, ST: 6500, EWS: 2800 },
      "Electronics": { OPEN: 4000, "OBC-NCL": 9000, SC: 19000, ST: 12500, EWS: 5500 },
    },
    metrics: { nirf: 30, avgPackage: "₹15.2 LPA", fees: "₹9.5 L", campusSize: "25 acres" },
    planetColor: "#3F51B5",
    orbitRadius: 11.5,
    description: "State-of-the-art facilities with focus on emerging technologies."
  },
  {
    id: "BITS",
    name: "BITS Pilani",
    shortName: "BITS Pilani",
    type: "GFTI",
    location: { city: "Pilani", state: "Rajasthan" },
    ranks: {
      "Computer Science": { OPEN: 2500, "OBC-NCL": 5500, SC: 12000, ST: 8000, EWS: 3500 },
      "Electronics": { OPEN: 5000, "OBC-NCL": 11000, SC: 24000, ST: 16000, EWS: 7000 },
      "Mechanical Engineering": { OPEN: 12000, "OBC-NCL": 25000, SC: 50000, ST: 35000, EWS: 16000 },
    },
    metrics: { nirf: 28, avgPackage: "₹14.5 LPA", fees: "₹18.5 L", campusSize: "328 acres" },
    planetColor: "#FFC107",
    orbitRadius: 13,
    description: "Private deemed university known for flexible academic structure."
  },
  {
    id: "DTU",
    name: "Delhi Technological University",
    shortName: "DTU",
    type: "GFTI",
    location: { city: "New Delhi", state: "Delhi" },
    ranks: {
      "Computer Science": { OPEN: 3000, "OBC-NCL": 7000, SC: 15000, ST: 10000, EWS: 4200 },
      "Electrical Engineering": { OPEN: 7000, "OBC-NCL": 14000, SC: 30000, ST: 20000, EWS: 9500 },
      "Mechanical Engineering": { OPEN: 14000, "OBC-NCL": 27000, SC: 52000, ST: 36000, EWS: 18500 },
    },
    metrics: { nirf: 35, avgPackage: "₹13.8 LPA", fees: "₹7.2 L", campusSize: "164 acres" },
    planetColor: "#795548",
    orbitRadius: 13.5,
    description: "Former DCE with strong legacy and excellent placements."
  },
];

export const branches = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Electronics",
  "Civil Engineering",
  "Chemical Engineering",
];

export const categories = ["OPEN", "OBC-NCL", "SC", "ST", "EWS", "PwD"];

export const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

export const instituteTypes = ["IIT", "NIT", "IIIT", "GFTI"];

export type PredictionConfidence = 'safe' | 'moderate' | 'ambitious' | 'unlikely';

export function getPredictionConfidence(
  userRank: number,
  closingRank: number
): PredictionConfidence {
  const ratio = userRank / closingRank;
  
  if (ratio <= 0.7) return 'safe';
  if (ratio <= 0.95) return 'moderate';
  if (ratio <= 1.2) return 'ambitious';
  return 'unlikely';
}

export function filterColleges(
  rank: number,
  category: string,
  branches: string[],
  instituteTypes: string[]
): (College & { confidence: PredictionConfidence; matchingBranch: string })[] {
  const results: (College & { confidence: PredictionConfidence; matchingBranch: string })[] = [];
  
  colleges.forEach(college => {
    if (!instituteTypes.includes(college.type)) return;
    
    branches.forEach(branch => {
      const branchData = college.ranks[branch];
      if (!branchData) return;
      
      const closingRank = branchData[category as keyof typeof branchData];
      if (!closingRank) return;
      
      const confidence = getPredictionConfidence(rank, closingRank);
      if (confidence !== 'unlikely') {
        results.push({
          ...college,
          confidence,
          matchingBranch: branch,
        });
      }
    });
  });
  
  // Sort by confidence (safe first) then by NIRF rank
  return results.sort((a, b) => {
    const confidenceOrder = { safe: 0, moderate: 1, ambitious: 2 };
    const confDiff = confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
    if (confDiff !== 0) return confDiff;
    return a.metrics.nirf - b.metrics.nirf;
  });
}
