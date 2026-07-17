import {
  Award,
  BookOpen,
  CalendarDays,
  Gift,
  GraduationCap,
  Leaf,
  MapPin,
  Medal,
  Recycle,
  ShieldCheck,
  Sprout,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";

export const recentActivities = [
  { id: "a1", item: "PET bottle", location: "Community Eco Bin Station", points: 10, time: "Today, 10:20 AM", status: "Verified", quantity: 1, weight: 0.1 },
  { id: "a2", item: "Plastic cup", location: "Community Center Bin", points: 8, time: "Yesterday", status: "Verified", quantity: 1, weight: 0.08 },
  { id: "a3", item: "Clean food container", location: "Market Recycling Wall", points: 12, time: "2 days ago", status: "Verified", quantity: 2, weight: 0.2 },
];

export const rewards = [
  { id: "r1", title: "Eco Badge", points: 80, icon: Medal, description: "Unlock a profile badge for consistent recycling." },
  { id: "r2", title: "Snack Voucher", points: 150, icon: Ticket, description: "Redeem at participating partner cafes." },
  { id: "r3", title: "Reusable Bottle", points: 260, icon: Recycle, description: "A limited reusable bottle for top recyclers." },
  { id: "r4", title: "Digital Certificate", points: 200, icon: GraduationCap, description: "Downloadable SDG participation certificate." },
];

export const locations = [
  {
    id: "l1",
    name: "Community Eco Bin Station",
    address: "Community Center Main Entrance",
    hours: "Mon-Fri, 8:00 AM - 8:00 PM",
    types: ["PET bottles", "HDPE containers", "Clean plastic cups"],
    category: "Plastic recovery booth",
    distance: "0.6 km away",
    qrEnabled: true,
    image: "station-community.svg",
    map: "https://www.google.com/maps/search/Community+Center",
  },
  {
    id: "l2",
    name: "Market Recycling Wall",
    address: "Local Market, Level 1 near food court",
    hours: "Daily, 7:00 AM - 10:00 PM",
    types: ["PET bottles", "Clean food containers", "Rigid plastic packaging"],
    category: "Plastic collection point",
    distance: "1.4 km away",
    qrEnabled: true,
    image: "station-market.svg",
    map: "https://www.google.com/maps/search/Local+Market",
  },
  {
    id: "l3",
    name: "Municipal Bulky Waste Bay",
    address: "Recycling Facility, Service Road B",
    hours: "Wed and Fri, 10:00 AM - 4:00 PM",
    types: ["Bulky plastics", "Large plastic packaging", "Broken household plastic"],
    category: "Bulky plastic disposal",
    distance: "3.2 km away",
    qrEnabled: false,
    image: "station-bulky.svg",
    map: "https://www.google.com/maps/search/Facilities+Block",
  },
];

export const educationCards = [
  { title: "Refuse unnecessary plastic", text: "The first R is Refuse: choose no straw, no bag, refill, or a reusable option before recycling is needed.", icon: ShieldCheck },
  { title: "Clean before recycling", text: "Empty, rinse and dry containers. Food residue can contaminate otherwise recyclable materials.", icon: Recycle },
  { title: "Check local acceptance", text: "Plastic types vary by facility. Use the bin label and resin/type guidance at your location.", icon: Leaf },
  { title: "Reuse before recycling", text: "Reusing a durable container usually extends its useful life before it becomes a recycling item.", icon: Sprout },
];

export const locationLeaderboard = {
  week: [
    { rank: 1, name: "Community Eco Bin Station", area: "Community Center", entries: 186, weight: 42.8, image: "station-community.svg", change: "+18%" },
    { rank: 2, name: "Market Recycling Wall", area: "Local Market", entries: 154, weight: 35.6, image: "station-market.svg", change: "+11%" },
    { rank: 3, name: "Municipal Bulky Waste Bay", area: "Service Road B", entries: 112, weight: 31.4, image: "station-bulky.svg", change: "+6%" },
    { rank: 4, name: "Riverside Drop-off Point", area: "Riverside Walk", entries: 89, weight: 18.7, image: "station-community.svg", change: "+4%" },
    { rank: 5, name: "North Park Collection Hub", area: "North Park", entries: 76, weight: 16.2, image: "station-market.svg", change: "+2%" },
  ],
  month: [
    { rank: 1, name: "Market Recycling Wall", area: "Local Market", entries: 692, weight: 158.4, image: "station-market.svg", change: "+22%" },
    { rank: 2, name: "Community Eco Bin Station", area: "Community Center", entries: 648, weight: 147.2, image: "station-community.svg", change: "+19%" },
    { rank: 3, name: "Municipal Bulky Waste Bay", area: "Service Road B", entries: 401, weight: 110.3, image: "station-bulky.svg", change: "+9%" },
    { rank: 4, name: "Riverside Drop-off Point", area: "Riverside Walk", entries: 346, weight: 74.5, image: "station-community.svg", change: "+6%" },
    { rank: 5, name: "North Park Collection Hub", area: "North Park", entries: 301, weight: 67.8, image: "station-market.svg", change: "+3%" },
  ],
};

export const features = [
  { title: "QR recycling scans", description: "People scan bin QR codes and get instant simulated points.", icon: Recycle },
  { title: "Reward motivation", description: "A simple points store keeps participation visible and fun.", icon: Gift },
  { title: "Location guidance", description: "Find fixed recycling and bulky waste drop-off points quickly.", icon: MapPin },
  { title: "Awareness campaigns", description: "Short education cards reinforce SDG 12 recycling behavior.", icon: BookOpen },
];

export const adminMetrics = [
  { label: "Participants", value: "1,248", icon: Users, tone: "sky" },
  { label: "Verified entries", value: "8,930", icon: Recycle, tone: "eco" },
  { label: "Plastic collected", value: "742 kg", icon: CalendarDays, tone: "amber" },
  { label: "Repeat attendance", value: "64%", icon: Award, tone: "rose" },
];

export const campaignPerformance = [
  { name: "Bottle Week - verified return rate", value: 86 },
  { name: "Clean Cup Drive - learning completion", value: 68 },
  { name: "Community booth engagement", value: 74 },
  { name: "SDG 12 return attendance", value: 92 },
];

export const activeUsers = [
  { name: "Aina Rahman", scans: 41 },
  { name: "Jason Lim", scans: 37 },
  { name: "Mei Tan", scans: 33 },
  { name: "Farhan Lee", scans: 28 },
];

export const achievements = [
  { title: "5-day streak", icon: Trophy },
  { title: "15 scans", icon: Recycle },
  { title: "SDG learner", icon: BookOpen },
];
