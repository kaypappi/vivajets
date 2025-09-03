import SectionTable from "./section-table";
import {
  Plane,
  Gauge,
  Armchair,
  Cpu,
  Ruler,
  Users,
  Briefcase,
  Zap,
  ArrowUp,
  Mountain,
  Tv,
  Sun,
  Wind,
  Utensils,
  VolumeX,
  Compass,
  Wifi,
  Smartphone,
  Radio,
  Eye,
  Layout,
  PlaneLanding,
} from "lucide-react";

type SectionItem = { title: string; description: string; icon?: React.ReactNode };
type SectionDef = { title: string; intro?: string; headerIcon?: React.ReactNode; items: SectionItem[] };

const bombardierSections: SectionDef[] = [
  {
    title: "Aircraft Specifications",
    intro:
      "The Bombardier Global 7500 stands in a league of its own with a spacious, thoughtfully crafted interior for long‑haul travel.",
    headerIcon: <Plane size={18} />,
    items: [
      { title: "Dimensions", description: "Height 6 ft 2 in, width 8 ft, and cabin length 54 ft 5 in for multiple living spaces.", icon: <Ruler size={16} /> },
      { title: "Passenger Capacity", description: "Up to 19 passengers, typically 8–12 in luxurious configurations with flat beds and private suites.", icon: <Users size={16} /> },
      { title: "Baggage Capacity", description: "195 cubic feet—ample room for luggage, golf clubs, and bulky equipment.", icon: <Briefcase size={16} /> },
    ],
  },
  {
    title: "Performance",
    intro:
      "Exceptional range and speed with efficient operation from a variety of airports, including shorter runways.",
    headerIcon: <Gauge size={18} />,
    items: [
      { title: "Unmatched Range", description: "7,700 nm—non‑stop between most city pairs; ideal for Johannesburg–New York or Lagos–London.", icon: <Compass size={16} /> },
      { title: "Speed", description: "Cruises at Mach 0.85; up to Mach 0.925 when time is critical.", icon: <Gauge size={16} /> },
      { title: "Takeoff and Landing", description: "Efficient from varied airports, accessing shorter runways closer to your destination.", icon: <PlaneLanding size={16} /> },
      { title: "High‑Altitude Capability", description: "Strong performance at altitude and in hot‑and‑high environments.", icon: <Mountain size={16} /> },
    ],
  },
  {
    title: "Cabin Features",
    intro: "A four‑zone cabin tailored for productivity, dining, entertainment, and deep rest.",
    headerIcon: <Armchair size={18} />,
    items: [
      { title: "Spacious and Versatile Cabin", description: "Largest in class; create four distinct living zones for work, dining, entertainment, or rest.", icon: <Layout size={16} /> },
      { title: "Innovative Seating", description: "Nuage seats with deep recline, floating base, and tilting headrest.", icon: <Armchair size={16} /> },
      { title: "Master Suite", description: "Optional permanent bed and en‑suite lavatory for overnights.", icon: <BedIcon /> },
      { title: "Entertainment and Connectivity", description: "High‑speed Wi‑Fi and advanced cabin management system.", icon: <Wifi size={16} /> },
      { title: "Soleil Lighting System", description: "Mimics natural sunlight to align circadian rhythm and reduce jet lag.", icon: <Sun size={16} /> },
      { title: "Air Quality and Comfort", description: "Next‑gen filtration and low cabin altitude help you arrive refreshed.", icon: <Wind size={16} /> },
      { title: "Galley and Dining", description: "Fully equipped galley and dedicated dining area for restaurant‑like experience.", icon: <Utensils size={16} /> },
      { title: "Peaceful Atmosphere", description: "One of the quietest cabins—focus, relax, or sleep without disturbance.", icon: <VolumeX size={16} /> },
    ],
  },
  {
    title: "Technology",
    intro: "State‑of‑the‑art avionics and cabin tech for a safer, quieter, and connected experience.",
    headerIcon: <Cpu size={18} />,
    items: [
      { title: "Fly‑by‑Wire System", description: "Enhances safety and ensures a smoother, turbulence‑adjusted flight.", icon: <Radio size={16} /> },
      { title: "Vision Flight Deck", description: "Synthetic and Enhanced Vision Systems for precision and ease.", icon: <Eye size={16} /> },
      { title: "Nice Touch Cabin Management", description: "Touchscreen or personal‑device control for lighting, temperature, and entertainment.", icon: <Smartphone size={16} /> },
      { title: "High‑Speed Internet", description: "Ka‑band connectivity for streaming, work, and entertainment worldwide.", icon: <Wifi size={16} /> },
      { title: "4K Entertainment System", description: "Stunning visuals and immersive sound.", icon: <Tv size={16} /> },
      { title: "Quiet Design", description: "Engineered to minimize cabin noise for comfort and focus.", icon: <VolumeX size={16} /> },
    ],
  },
];

const challengerSections: SectionDef[] = [
  {
    title: "Aircraft Specifications",
    headerIcon: <Plane size={18} />,
    items: [
      { title: "Dimensions", description: "Height 6.1 ft, width 8.2 ft, length 28.4 ft for a spacious large‑cabin layout.", icon: <Ruler size={16} /> },
      { title: "Passenger Capacity", description: "Seats up to 12 passengers comfortably for business or leisure.", icon: <Users size={16} /> },
      { title: "Baggage Capacity", description: "115 cubic feet for multiple suitcases, equipment, and essentials.", icon: <Briefcase size={16} /> },
    ],
  },
  {
    title: "Performance",
    headerIcon: <Gauge size={18} />,
    items: [
      { title: "Range", description: "4,000 nm—connects major African cities and international hubs without refueling.", icon: <Compass size={16} /> },
      { title: "Speed", description: "Cruises ~470 knots (Mach 0.82 max) for efficient travel times.", icon: <Gauge size={16} /> },
      { title: "Takeoff & Landing", description: "~5,840 ft takeoff; 2,775 ft landing for access to medium/shorter runways.", icon: <PlaneLanding size={16} /> },
      { title: "Service Ceiling", description: "Up to 41,000 ft for smoother rides above traffic and weather.", icon: <ArrowUp size={16} /> },
    ],
  },
  {
    title: "Cabin Features",
    headerIcon: <Armchair size={18} />,
    items: [
      { title: "Spacious Interior", description: "Open layout with large windows and abundant natural light.", icon: <Layout size={16} /> },
      { title: "Connectivity", description: "High‑speed Wi‑Fi and cabin management system for work and entertainment.", icon: <Wifi size={16} /> },
      { title: "Galley and Amenities", description: "Fully equipped galley and private lavatory for long‑haul convenience.", icon: <Utensils size={16} /> },
    ],
  },
];

const gulfstreamSections: SectionDef[] = [
  {
    title: "Aircraft Specifications",
    headerIcon: <Plane size={18} />,
    items: [
      { title: "Dimensions", description: "Cabin height 6.2 ft, width 7.3 ft, length 50.1 ft.", icon: <Ruler size={16} /> },
      { title: "Passenger Capacity", description: "Seats up to 19; typically 8–12 in luxurious layouts.", icon: <Users size={16} /> },
      { title: "Baggage Capacity", description: "226 cubic feet for extended global trips.", icon: <Briefcase size={16} /> },
    ],
  },
  {
    title: "Performance",
    headerIcon: <Gauge size={18} />,
    items: [
      { title: "Range", description: "6,750 nm—connects nearly any two cities worldwide without refueling.", icon: <Compass size={16} /> },
      { title: "Speed", description: "Cruises at Mach 0.85; max Mach 0.90.", icon: <Gauge size={16} /> },
      { title: "Takeoff and Landing", description: "~5,910 ft takeoff; ~2,770 ft landing for broad airport access.", icon: <PlaneLanding size={16} /> },
      { title: "Service Ceiling", description: "Operates efficiently at 51,000 ft.", icon: <ArrowUp size={16} /> },
    ],
  },
  {
    title: "Cabin Features",
    headerIcon: <Armchair size={18} />,
    items: [
      { title: "Elegant Living Areas", description: "Multiple zones for work, dining, and rest.", icon: <Layout size={16} /> },
      { title: "Advanced Technology", description: "EVS and Synthetic Vision for safer, efficient flights.", icon: <Cpu size={16} /> },
      { title: "Comfort & Connectivity", description: "Quiet cabin with Ka‑band internet and ergonomic seating.", icon: <Wifi size={16} /> },
    ],
  },
];

const dassaultSections: SectionDef[] = [
  {
    title: "Aircraft Specifications",
    headerIcon: <Plane size={18} />,
    items: [
      { title: "Dimensions", description: "Cabin height 6.2 ft, width 7.7 ft, length 39.1 ft.", icon: <Ruler size={16} /> },
      { title: "Passenger Capacity", description: "Comfortably seats 12–16 with reclining options and divans.", icon: <Users size={16} /> },
      { title: "Baggage Capacity", description: "Around 140 cubic feet of storage for luggage and equipment.", icon: <Briefcase size={16} /> },
    ],
  },
  {
    title: "Performance",
    headerIcon: <Gauge size={18} />,
    items: [
      { title: "Range", description: "5,950 nm—nonstop Lagos–London or Accra–Washington D.C.", icon: <Compass size={16} /> },
      { title: "Speed", description: "Cruises at Mach 0.80; top Mach 0.90.", icon: <Gauge size={16} /> },
      { title: "Takeoff and Landing", description: "~5,710 ft takeoff; ~2,400 ft landing enables smaller airports.", icon: <PlaneLanding size={16} /> },
      { title: "Service Ceiling", description: "Operates up to 51,000 ft.", icon: <ArrowUp size={16} /> },
    ],
  },
  {
    title: "Cabin Features",
    headerIcon: <Armchair size={18} />,
    items: [
      { title: "Three‑Engine Design", description: "Trijet configuration supports greater range and safety.", icon: <Plane size={16} /> },
      { title: "Customizable Interior", description: "Adaptable zones for dining, work, and relaxation.", icon: <Layout size={16} /> },
      { title: "Quiet Comfort", description: "Advanced insulation for one of the quietest cabins in class.", icon: <VolumeX size={16} /> },
      { title: "Air Quality & Lighting", description: "Air filtration and LED lighting help reduce jet lag.", icon: <Sun size={16} /> },
      { title: "Advanced Avionics", description: "Dassault Digital Flight Control System for smooth, efficient flights.", icon: <Cpu size={16} /> },
    ],
  },
];

const modelKeyToSections: Record<string, SectionDef[]> = {
  "global-7500": bombardierSections,
  "challenger-604": challengerSections,
  g650: gulfstreamSections,
  "falcon-7x": dassaultSections,
};

export default function BuyersGuideDetails({ model }: { model: string }) {
  const sections = modelKeyToSections[model] ?? bombardierSections;
  return (
    <div className="mt-1 ">
      {sections.map((section, idx) => (
        <SectionTable
          key={idx}
          title={section.title}
          intro={section.intro}
          headerIcon={section.headerIcon}
          items={section.items}
        />
      ))}
    </div>
  );
}

function BedIcon() {
  // Simple bed glyph using SVG to avoid importing another icon
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

