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
    name: "Pavilion Bukit Jalil Pilot Booth",
    address: "No. 2, Persiaran Jalil 8, Bandar Bukit Jalil, 57000 Kuala Lumpur",
    hours: "Daily, 10:00 AM - 10:00 PM (venue hours)",
    types: ["PET bottles", "HDPE containers", "Clean plastic cups"],
    category: "Prototype mall booth",
    distance: "1.2 km away",
    qrEnabled: true,
    image: "location-pavilion.jpg",
    imageAlt: "Representative photograph of labelled recycling bins",
    map: "https://www.google.com/maps/search/?api=1&query=Pavilion+Bukit+Jalil",
  },
  {
    id: "l2",
    name: "APU Campus Recovery Point",
    address: "No. 11, Jalan Teknologi 5, Taman Teknologi Malaysia, Bukit Jalil, 57000 Kuala Lumpur",
    hours: "Mon-Fri, 8:00 AM - 8:00 PM (prototype booth hours)",
    types: ["PET bottles", "Clean food containers", "Rigid plastic packaging"],
    category: "Prototype campus booth",
    distance: "2.8 km away",
    qrEnabled: true,
    image: "location-apu.jpg",
    imageAlt: "Representative photograph of colour-coded recycling bins",
    map: "https://www.google.com/maps/search/?api=1&query=Asia+Pacific+University+Bukit+Jalil",
  },
  {
    id: "l3",
    name: "Bukit Jalil Park Drop-off",
    address: "Jalan 13/155C, Bukit Jalil, 57000 Kuala Lumpur",
    hours: "Daily, 5:30 AM - 10:00 PM (park hours)",
    types: ["PET bottles", "HDPE containers", "Clean rigid plastics"],
    category: "Prototype park point",
    distance: "3.4 km away",
    qrEnabled: true,
    image: "location-park.jpg",
    imageAlt: "Representative photograph of outdoor separated recycling bins",
    map: "https://www.google.com/maps/search/?api=1&query=Bukit+Jalil+Recreational+Park",
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
    { rank: 1, name: "Pavilion Bukit Jalil Pilot Booth", shortName: "Pavilion Bukit Jalil", area: "Persiaran Jalil 8", entries: 186, weight: 42.8, image: "location-pavilion.jpg", change: "+18%" },
    { rank: 2, name: "APU Campus Recovery Point", shortName: "APU Campus", area: "Technology Park Malaysia", entries: 154, weight: 35.6, image: "location-apu.jpg", change: "+11%" },
    { rank: 3, name: "Bukit Jalil Park Drop-off", shortName: "Bukit Jalil Park", area: "Jalan 13/155C", entries: 112, weight: 31.4, image: "location-park.jpg", change: "+6%" },
    { rank: 4, name: "Awan Besar Community Point", area: "Awan Besar", entries: 89, weight: 18.7, image: "location-pavilion.jpg", change: "+4%" },
    { rank: 5, name: "Sri Petaling Plastic Hub", area: "Sri Petaling", entries: 76, weight: 16.2, image: "location-apu.jpg", change: "+2%" },
  ],
  month: [
    { rank: 1, name: "APU Campus Recovery Point", shortName: "APU Campus", area: "Technology Park Malaysia", entries: 692, weight: 158.4, image: "location-apu.jpg", change: "+22%" },
    { rank: 2, name: "Pavilion Bukit Jalil Pilot Booth", shortName: "Pavilion Bukit Jalil", area: "Persiaran Jalil 8", entries: 648, weight: 147.2, image: "location-pavilion.jpg", change: "+19%" },
    { rank: 3, name: "Bukit Jalil Park Drop-off", shortName: "Bukit Jalil Park", area: "Jalan 13/155C", entries: 401, weight: 110.3, image: "location-park.jpg", change: "+9%" },
    { rank: 4, name: "Awan Besar Community Point", area: "Awan Besar", entries: 346, weight: 74.5, image: "location-pavilion.jpg", change: "+6%" },
    { rank: 5, name: "Sri Petaling Plastic Hub", area: "Sri Petaling", entries: 301, weight: 67.8, image: "location-apu.jpg", change: "+3%" },
  ],
};

export const peopleLeaderboard = {
  week: [
    { rank: 1, name: "Aina Rahman", initials: "AR", booth: "Pavilion Bukit Jalil", entries: 48, weight: 7.4, points: 540, color: "bg-rose-100 text-rose-800" },
    { rank: 2, name: "Jason Lim", initials: "JL", booth: "APU Campus", entries: 43, weight: 6.8, points: 490, color: "bg-sky-100 text-sky-800" },
    { rank: 3, name: "Mei Tan", initials: "MT", booth: "Bukit Jalil Park", entries: 39, weight: 6.1, points: 450, color: "bg-amber-100 text-amber-800" },
    { rank: 4, name: "Nick", initials: "N", booth: "APU Campus", entries: 12, weight: 3.8, points: 120, avatar: "alex-profile.avif", isCurrentUser: true },
    { rank: 5, name: "Priya Kumar", initials: "PK", booth: "Pavilion Bukit Jalil", entries: 11, weight: 2.2, points: 110, color: "bg-violet-100 text-violet-800" },
  ],
  month: [
    { rank: 1, name: "Jason Lim", initials: "JL", booth: "APU Campus", entries: 174, weight: 27.6, points: 1960, color: "bg-sky-100 text-sky-800" },
    { rank: 2, name: "Aina Rahman", initials: "AR", booth: "Pavilion Bukit Jalil", entries: 168, weight: 26.4, points: 1880, color: "bg-rose-100 text-rose-800" },
    { rank: 3, name: "Mei Tan", initials: "MT", booth: "Bukit Jalil Park", entries: 151, weight: 23.9, points: 1690, color: "bg-amber-100 text-amber-800" },
    { rank: 4, name: "Priya Kumar", initials: "PK", booth: "Pavilion Bukit Jalil", entries: 104, weight: 17.1, points: 1210, color: "bg-violet-100 text-violet-800" },
    { rank: 5, name: "Nick", initials: "N", booth: "APU Campus", entries: 62, weight: 11.8, points: 720, avatar: "alex-profile.avif", isCurrentUser: true },
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

export const adminWeeklyRecovery = [
  { day: "Mon", entries: 86, weight: 12.4 },
  { day: "Tue", entries: 112, weight: 18.1 },
  { day: "Wed", entries: 94, weight: 15.6 },
  { day: "Thu", entries: 148, weight: 24.2 },
  { day: "Fri", entries: 132, weight: 21.7 },
  { day: "Sat", entries: 176, weight: 29.8 },
  { day: "Sun", entries: 158, weight: 26.4 },
];

export const adminLocationPerformance = [
  { name: "Pavilion Bukit Jalil", entries: 648, weight: 147.2, participants: 238, engagement: 92 },
  { name: "APU Campus", entries: 692, weight: 158.4, participants: 214, engagement: 86 },
  { name: "Bukit Jalil Park", entries: 401, weight: 110.3, participants: 156, engagement: 68 },
];

export const achievements = [
  { title: "5-day streak", icon: Trophy },
  { title: "15 scans", icon: Recycle },
  { title: "SDG learner", icon: BookOpen },
];
