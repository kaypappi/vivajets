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

// const bombardierSections: SectionDef[] = [
//   {
//     title: "Aircraft Specifications",
//     intro:
//       "The Bombardier Global 7500 stands in a league of its own with a spacious, thoughtfully crafted interior for long‑haul travel.",
//     headerIcon: <Plane size={18} />,
//     items: [
//       { title: "Dimensions", description: "Height 6 ft 2 in, width 8 ft, and cabin length 54 ft 5 in for multiple living spaces.", icon: <Ruler size={16} /> },
//       { title: "Passenger Capacity", description: "Up to 19 passengers, typically 8–12 in luxurious configurations with flat beds and private suites.", icon: <Users size={16} /> },
//       { title: "Baggage Capacity", description: "195 cubic feet—ample room for luggage, golf clubs, and bulky equipment.", icon: <Briefcase size={16} /> },
//       { title: "Manufacturer", description: "Bombardier Business Aircraft.", icon: <Plane size={16} /> },
//       { title: "Length", description: "Approximately 111 ft—accommodates four spacious living zones.", icon: <Ruler size={16} /> },
//       { title: "Wingspan", description: "Approximately 104 ft—optimized for efficiency and stability.", icon: <Ruler size={16} /> },
//       { title: "Height", description: "Approximately 27 ft—impressive presence and ground clearance.", icon: <Ruler size={16} /> },
//       { title: "Max Takeoff Weight (MTOW)", description: "High MTOW supports long‑range missions with full fuel and passengers.", icon: <ArrowUp size={16} /> },
//       { title: "Fuel Capacity", description: "Large capacity enabling ultra‑long‑range flights.", icon: <Zap size={16} /> },
//       { title: "Engines", description: "Twin turbofan engines designed for high efficiency and low noise.", icon: <Cpu size={16} /> },
//       { title: "Max Range", description: "Up to ~7,700 nm for non‑stop intercontinental flights.", icon: <Compass size={16} /> },
//       { title: "Max Cruise Speed", description: "Up to Mach 0.925 when time is critical.", icon: <Gauge size={16} /> },
//       { title: "Max Altitude", description: "Cruises up to 51,000 ft for smoother rides above weather.", icon: <ArrowUp size={16} /> },
//       { title: "Seating Capacity", description: "Configurable layouts typically seat 8–12 in great comfort.", icon: <Users size={16} /> },
//     ],
//   },
//   {
//     title: "Performance",
//     intro:
//       "Exceptional range and speed with efficient operation from a variety of airports, including shorter runways.",
//     headerIcon: <Gauge size={18} />,
//     items: [
//       { title: "Unmatched Range", description: "7,700 nm—non‑stop between most city pairs; ideal for Johannesburg–New York or Lagos–London.", icon: <Compass size={16} /> },
//       { title: "Speed", description: "Cruises at Mach 0.85; up to Mach 0.925 when time is critical.", icon: <Gauge size={16} /> },
//       { title: "Takeoff and Landing", description: "Efficient from varied airports, accessing shorter runways closer to your destination.", icon: <PlaneLanding size={16} /> },
//       { title: "High‑Altitude Capability", description: "Strong performance at altitude and in hot‑and‑high environments.", icon: <Mountain size={16} /> },
//     ],
//   },
//   {
//     title: "Cabin Features",
//     intro: "A four‑zone cabin tailored for productivity, dining, entertainment, and deep rest.",
//     headerIcon: <Armchair size={18} />,
//     items: [
//       { title: "Spacious and Versatile Cabin", description: "Largest in class; create four distinct living zones for work, dining, entertainment, or rest.", icon: <Layout size={16} /> },
//       { title: "Innovative Seating", description: "Nuage seats with deep recline, floating base, and tilting headrest.", icon: <Armchair size={16} /> },
//       { title: "Master Suite", description: "Optional permanent bed and en‑suite lavatory for overnights.", icon: <BedIcon /> },
//       { title: "Entertainment and Connectivity", description: "High‑speed Wi‑Fi and advanced cabin management system.", icon: <Wifi size={16} /> },
//       { title: "Soleil Lighting System", description: "Mimics natural sunlight to align circadian rhythm and reduce jet lag.", icon: <Sun size={16} /> },
//       { title: "Air Quality and Comfort", description: "Next‑gen filtration and low cabin altitude help you arrive refreshed.", icon: <Wind size={16} /> },
//       { title: "Galley and Dining", description: "Fully equipped galley and dedicated dining area for restaurant‑like experience.", icon: <Utensils size={16} /> },
//       { title: "Peaceful Atmosphere", description: "One of the quietest cabins—focus, relax, or sleep without disturbance.", icon: <VolumeX size={16} /> },
//     ],
//   },
//   {
//     title: "Technology",
//     intro: "State‑of‑the‑art avionics and cabin tech for a safer, quieter, and connected experience.",
//     headerIcon: <Cpu size={18} />,
//     items: [
//       { title: "Fly‑by‑Wire System", description: "Enhances safety and ensures a smoother, turbulence‑adjusted flight.", icon: <Radio size={16} /> },
//       { title: "Vision Flight Deck", description: "Synthetic and Enhanced Vision Systems for precision and ease.", icon: <Eye size={16} /> },
//       { title: "Nice Touch Cabin Management", description: "Touchscreen or personal‑device control for lighting, temperature, and entertainment.", icon: <Smartphone size={16} /> },
//       { title: "High‑Speed Internet", description: "Ka‑band connectivity for streaming, work, and entertainment worldwide.", icon: <Wifi size={16} /> },
//       { title: "4K Entertainment System", description: "Stunning visuals and immersive sound.", icon: <Tv size={16} /> },
//       { title: "Quiet Design", description: "Engineered to minimize cabin noise for comfort and focus.", icon: <VolumeX size={16} /> },
//     ],
//   },
// ];

const challengerSections: SectionDef[] = [
  {
    title: "Aircraft Specifications",
    headerIcon: <Plane size={18} />,
    items: [
      { title: "Dimensions", description: "Height 6.1 ft, width 8.2 ft, length 28.4 ft for a spacious large‑cabin layout.", icon: <Ruler size={16} /> },
      { title: "Passenger Capacity", description: "Seats up to 12 passengers comfortably for business or leisure.", icon: <Users size={16} /> },
      { title: "Baggage Capacity", description: "115 cubic feet for multiple suitcases, equipment, and essentials.", icon: <Briefcase size={16} /> },
      { title: "Manufacturer", description: "Bombardier Business Aircraft.", icon: <Plane size={16} /> },
      { title: "Length", description: "Approximately 68 ft—balanced proportions for large‑cabin comfort.", icon: <Ruler size={16} /> },
      { title: "Wingspan", description: "Approximately 64 ft—optimized for stability and efficiency.", icon: <Ruler size={16} /> },
      { title: "Height", description: "Approximately 20 ft—ample ground clearance and presence.", icon: <Ruler size={16} /> },
      { title: "Max Takeoff Weight (MTOW)", description: "Supports long‑range missions with full fuel and passengers.", icon: <ArrowUp size={16} /> },
      { title: "Fuel Capacity", description: "Large fuel volume enabling ~4,000 nm range.", icon: <Zap size={16} /> },
      { title: "Engines", description: "Twin turbofan engines delivering efficient, reliable thrust.", icon: <Cpu size={16} /> },
      { title: "Max Range", description: "Around 4,000 nm—Africa to Europe and regional city pairs.", icon: <Compass size={16} /> },
      { title: "Max Cruise Speed", description: "Up to ~Mach 0.82 for timely arrivals.", icon: <Gauge size={16} /> },
      { title: "Max Altitude", description: "Cruises up to 41,000 ft above weather and traffic.", icon: <ArrowUp size={16} /> },
      { title: "Seating Capacity", description: "Typical layouts seat 9–12 in comfort.", icon: <Users size={16} /> },
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
  {
    title: "Technology",
    headerIcon: <Cpu size={18} />,
    items: [
      { title: "Avionics Suite", description: "Advanced glass cockpit with integrated flight management.", icon: <Cpu size={16} /> },
      { title: "Navigation & Safety", description: "Modern RNAV/RNP, TCAS, TAWS, and weather radar.", icon: <Compass size={16} /> },
      { title: "Vision Systems", description: "Enhanced vision and synthetic vision where equipped.", icon: <Eye size={16} /> },
      { title: "Cabin Technology", description: "High‑speed internet and CMS control via personal devices.", icon: <Wifi size={16} /> },
    ],
  },
];

const hawker900xpSections: SectionDef[] = [
  {
    title: "Aircraft Specifications",
    headerIcon: <Plane size={18} />,
    items: [
      { title: "Dimensions", description: "Cabin height ~5.7 ft, width ~6.0 ft, length ~21.3 ft.", icon: <Ruler size={16} /> },
      { title: "Passenger Capacity", description: "Seats 8–9 passengers in club and divan layouts.", icon: <Users size={16} /> },
      { title: "Baggage Capacity", description: "~50 cubic feet for business gear and luggage.", icon: <Briefcase size={16} /> },
      { title: "Manufacturer", description: "Hawker Beechcraft.", icon: <Plane size={16} /> },
      { title: "Length", description: "Approximately 51 ft—compact and efficient footprint.", icon: <Ruler size={16} /> },
      { title: "Wingspan", description: "Approximately 54 ft—stable platform for regional flying.", icon: <Ruler size={16} /> },
      { title: "Height", description: "Approximately 18 ft—balanced stance for varied airfields.", icon: <Ruler size={16} /> },
      { title: "Max Takeoff Weight (MTOW)", description: "Supports full‑payload operations on typical regional legs.", icon: <ArrowUp size={16} /> },
      { title: "Fuel Capacity", description: "Sized for ~2,800 nm missions with reserves.", icon: <Zap size={16} /> },
      { title: "Engines", description: "Twin turbofans optimized for efficiency and reliability.", icon: <Cpu size={16} /> },
      { title: "Max Range", description: "About 2,800 nm—regional and medium‑haul routes.", icon: <Compass size={16} /> },
      { title: "Max Cruise Speed", description: "Around Mach 0.78 for timely regional hops.", icon: <Gauge size={16} /> },
      { title: "Max Altitude", description: "Cruises up to 41,000 ft.", icon: <ArrowUp size={16} /> },
      { title: "Seating Capacity", description: "Typical 8‑seat configuration.", icon: <Users size={16} /> },
    ],
  },
  {
    title: "Performance",
    headerIcon: <Gauge size={18} />,
    items: [
      { title: "Range", description: "~2,800 nm—efficient regional and medium‑haul missions.", icon: <Compass size={16} /> },
      { title: "Speed", description: "Cruises near Mach 0.78 with strong climb performance.", icon: <Gauge size={16} /> },
      { title: "Takeoff and Landing", description: "~5,000 ft takeoff; ~2,400–2,700 ft landing capability.", icon: <PlaneLanding size={16} /> },
      { title: "Service Ceiling", description: "Up to 41,000 ft for smooth, efficient cruise.", icon: <ArrowUp size={16} /> },
    ],
  },
  {
    title: "Cabin Features",
    headerIcon: <Armchair size={18} />,
    items: [
      { title: "Comfortable Cabin", description: "Club seating with a side‑facing divan for flexible layouts.", icon: <Layout size={16} /> },
      { title: "Connectivity", description: "High‑speed internet and modern cabin controls (where equipped).", icon: <Wifi size={16} /> },
      { title: "Galley & Lavatory", description: "Forward galley and private lavatory for productivity on the move.", icon: <Utensils size={16} /> },
    ],
  },
  {
    title: "Technology",
    headerIcon: <Cpu size={18} />,
    items: [
      { title: "Avionics Suite", description: "Integrated glass cockpit for situational awareness.", icon: <Cpu size={16} /> },
      { title: "Navigation & Safety", description: "RNAV, RNP, TCAS, TAWS, and modern autopilot.", icon: <Compass size={16} /> },
      { title: "Vision & Weather", description: "EVS/SVS where installed, plus advanced weather radar.", icon: <Eye size={16} /> },
      { title: "Cabin Technology", description: "Wi‑Fi and CMS options for entertainment and control.", icon: <Wifi size={16} /> },
    ],
  },
];

// const hawker850xpSections: SectionDef[] = [
//   {
//     title: "Aircraft Specifications",
//     headerIcon: <Plane size={18} />,
//     items: [
//       { title: "Dimensions", description: "Cabin height ~5.7 ft, width ~6.0 ft, length ~21 ft.", icon: <Ruler size={16} /> },
//       { title: "Passenger Capacity", description: "Typically seats 8 passengers in club + divan layout.", icon: <Users size={16} /> },
//       { title: "Baggage Capacity", description: "~50 cubic feet for luggage and carry‑ons.", icon: <Briefcase size={16} /> },
//       { title: "Manufacturer", description: "Hawker Beechcraft.", icon: <Plane size={16} /> },
//       { title: "Length", description: "Approximately 51 ft—optimized midsize footprint.", icon: <Ruler size={16} /> },
//       { title: "Wingspan", description: "Approximately 54 ft with winglets for improved efficiency.", icon: <Ruler size={16} /> },
//       { title: "Height", description: "Approximately 18 ft—balanced for varied airfields.", icon: <Ruler size={16} /> },
//       { title: "Max Takeoff Weight (MTOW)", description: "Supports typical mid‑range missions with full passengers.", icon: <ArrowUp size={16} /> },
//       { title: "Fuel Capacity", description: "Sized for ~2,600 nm operations.", icon: <Zap size={16} /> },
//       { title: "Engines", description: "Twin turbofans engineered for reliability and economy.", icon: <Cpu size={16} /> },
//       { title: "Max Range", description: "About 2,600 nm—efficient regional and mid‑range travel.", icon: <Compass size={16} /> },
//       { title: "Max Cruise Speed", description: "Around Mach 0.78 for swift business trips.", icon: <Gauge size={16} /> },
//       { title: "Max Altitude", description: "Cruises up to 41,000 ft.", icon: <ArrowUp size={16} /> },
//       { title: "Seating Capacity", description: "Typical 8‑seat configuration.", icon: <Users size={16} /> },
//     ],
//   },
//   {
//     title: "Performance",
//     headerIcon: <Gauge size={18} />,
//     items: [
//       { title: "Range", description: "~2,600 nm—ideal for regional and mid‑range routes.", icon: <Compass size={16} /> },
//       { title: "Speed", description: "Cruises around Mach 0.78 with efficient fuel burn.", icon: <Gauge size={16} /> },
//       { title: "Takeoff and Landing", description: "~5,000+ ft takeoff; ~2,400–2,700 ft landing.", icon: <PlaneLanding size={16} /> },
//       { title: "Service Ceiling", description: "Up to 41,000 ft for smoother rides above weather.", icon: <ArrowUp size={16} /> },
//     ],
//   },
//   {
//     title: "Cabin Features",
//     headerIcon: <Armchair size={18} />,
//     items: [
//       { title: "Comfortable Seating", description: "Club seats with fold‑out tables and a side divan.", icon: <Armchair size={16} /> },
//       { title: "Connectivity", description: "Wi‑Fi and cabin controls available depending on installation.", icon: <Wifi size={16} /> },
//       { title: "Galley & Amenities", description: "Equipped galley and private lavatory for comfortable trips.", icon: <Utensils size={16} /> },
//     ],
//   },
//   {
//     title: "Technology",
//     headerIcon: <Cpu size={18} />,
//     items: [
//       { title: "Avionics Suite", description: "Modern glass cockpit and integrated FMS.", icon: <Cpu size={16} /> },
//       { title: "Navigation & Safety", description: "RNAV, RNP, TCAS, TAWS, and weather radar.", icon: <Compass size={16} /> },
//       { title: "Vision Systems", description: "Enhanced/synthetic vision where installed.", icon: <Eye size={16} /> },
//       { title: "Cabin Technology", description: "Connectivity and CMS for entertainment and control.", icon: <Wifi size={16} /> },
//     ],
//   },
// ];

// const legacy600Sections: SectionDef[] = [
//   {
//     title: "Aircraft Specifications",
//     headerIcon: <Plane size={18} />,
//     items: [
//       { title: "Dimensions", description: "Cabin height ~6.0 ft, width ~6.9 ft, length ~42 ft.", icon: <Ruler size={16} /> },
//       { title: "Passenger Capacity", description: "Typically seats 12–13 with generous aisle space.", icon: <Users size={16} /> },
//       { title: "Baggage Capacity", description: "Up to ~286 cubic feet—among the largest in class.", icon: <Briefcase size={16} /> },
//       { title: "Manufacturer", description: "Embraer Executive Jets.", icon: <Plane size={16} /> },
//       { title: "Length", description: "Approximately 86 ft—generous cabin volume for super‑midsize class.", icon: <Ruler size={16} /> },
//       { title: "Wingspan", description: "Approximately 69 ft—efficient cruise and stability.", icon: <Ruler size={16} /> },
//       { title: "Height", description: "Approximately 22 ft—ample ground clearance.", icon: <Ruler size={16} /> },
//       { title: "Max Takeoff Weight (MTOW)", description: "Designed for long‑leg missions with full cabin.", icon: <ArrowUp size={16} /> },
//       { title: "Fuel Capacity", description: "Sized for ~3,400 nm operations with reserves.", icon: <Zap size={16} /> },
//       { title: "Engines", description: "Twin turbofans engineered for long‑range efficiency.", icon: <Cpu size={16} /> },
//       { title: "Max Range", description: "About 3,400 nm—Africa‑Europe and many transcontinental routes.", icon: <Compass size={16} /> },
//       { title: "Max Cruise Speed", description: "Around Mach 0.78–0.80 for efficient long legs.", icon: <Gauge size={16} /> },
//       { title: "Max Altitude", description: "Cruises up to 41,000 ft.", icon: <ArrowUp size={16} /> },
//       { title: "Seating Capacity", description: "Typical 12–13 seat configuration.", icon: <Users size={16} /> },
//     ],
//   },
//   {
//     title: "Performance",
//     headerIcon: <Gauge size={18} />,
//     items: [
//       { title: "Range", description: "~3,400 nm—Africa‑Europe and many transcontinental routes.", icon: <Compass size={16} /> },
//       { title: "Speed", description: "Cruises around Mach 0.78–0.80 for efficient long legs.", icon: <Gauge size={16} /> },
//       { title: "Takeoff and Landing", description: "~5,700+ ft takeoff; ~2,700–3,000 ft landing.", icon: <PlaneLanding size={16} /> },
//       { title: "Service Ceiling", description: "Up to 41,000 ft for smooth cruise above weather.", icon: <ArrowUp size={16} /> },
//     ],
//   },
//   {
//     title: "Cabin Features",
//     headerIcon: <Armchair size={18} />,
//     items: [
//       { title: "Spacious Three‑Zone Cabin", description: "Zones for work, dining, and relaxation.", icon: <Layout size={16} /> },
//       { title: "Connectivity", description: "High‑speed internet and modern CMS options.", icon: <Wifi size={16} /> },
//       { title: "Quiet & Comfortable", description: "Low cabin altitude with ample headroom and lighting.", icon: <VolumeX size={16} /> },
//     ],
//   },
//   {
//     title: "Technology",
//     headerIcon: <Cpu size={18} />,
//     items: [
//       { title: "Avionics Suite", description: "Advanced glass cockpit with integrated FMS.", icon: <Cpu size={16} /> },
//       { title: "Navigation & Safety", description: "RNAV, RNP, TCAS, TAWS, and weather radar.", icon: <Compass size={16} /> },
//       { title: "Vision Systems", description: "Enhanced/synthetic vision where equipped.", icon: <Eye size={16} /> },
//       { title: "Cabin Technology", description: "Connectivity and CMS for control and entertainment.", icon: <Wifi size={16} /> },
//     ],
//   },
// ];

const modelKeyToSections: Record<string, SectionDef[]> = {
  // "global-7500": bombardierSections,
  "challenger-604": challengerSections,
  "hawker-900xp": hawker900xpSections,
  // "hawker-850xp": hawker850xpSections,
  // "legacy-600": legacy600Sections,
};

export default function BuyersGuideDetails({ model }: { model: string }) {
  const sections = modelKeyToSections[model] ?? challengerSections;
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

