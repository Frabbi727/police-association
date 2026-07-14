"use client";

import * as React from "react";

export interface Member {
  name: string;
  rank: string;
  division: string;
  badge: string;
  status: "Active" | "Retired" | "Suspended";
  email: string;
  phone: string;
}

export interface Notice {
  id: string;
  date: string;
  title: string;
  content: string;
  category: string;
}

export interface Announcement {
  id: string;
  date: string;
  title: string;
  content: string;
  sender: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  registered: boolean;
}

export interface GymBooking {
  id: string;
  slot: string;
  day: string; // e.g. "Monday", "Tuesday", etc.
  reservedBy: string; // Badge number or "available"
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: "Law & Code" | "Mental Health" | "Physical Training" | "History";
  status: "Available" | "Borrowed";
  borrowedBy?: string; // Badge number
  dueDate?: string;
}

export interface WelfareApplication {
  id: string;
  date: string;
  type: "Medical Grant" | "Educational Scholarship" | "Emergency Relief" | "Retirement Welfare";
  amount: number;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
  timeline: { date: string; status: string; comment: string }[];
}

export interface FacilityBooking {
  id: string;
  facility: "Community Hall" | "Guest House Suite A" | "Guest House Suite B" | "Tactical Training Room";
  date: string;
  duration: string; // e.g., "1 Day", "4 Hours"
  status: "Pending" | "Approved" | "Cancelled";
  bookedBy: string; // Badge number
  amount: number;
}

export interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Paid" | "Unpaid";
  dueDate: string;
  paidDate?: string;
}

export interface NotificationItem {
  id: string;
  date: string;
  title: string;
  message: string;
  read: boolean;
  category: "info" | "alert" | "success";
}

interface DemoContextType {
  user: { badgeNumber: string; email: string; name: string; rank: string; division: string } | null;
  members: Member[];
  notices: Notice[];
  announcements: Announcement[];
  events: EventItem[];
  gymBookings: GymBooking[];
  books: Book[];
  welfareApplications: WelfareApplication[];
  facilityBookings: FacilityBooking[];
  invoices: Invoice[];
  notifications: NotificationItem[];
  
  // Translation
  language: "en" | "bn";
  toggleLanguage: () => void;
  t: (key: string, englishDefault: string) => string;
  formatCurrency: (amount: number) => string;
  
  // Actions
  login: (badge: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, phone: string, email: string) => void;
  
  bookGymSlot: (slotId: string) => void;
  cancelGymSlot: (slotId: string) => void;
  
  borrowBook: (bookId: string) => void;
  returnBook: (bookId: string) => void;
  
  submitWelfare: (type: WelfareApplication["type"], amount: number, description: string) => void;
  reviewWelfare: (id: string, status: "Approved" | "Rejected", comment: string) => void;
  
  bookFacility: (facility: FacilityBooking["facility"], date: string, duration: string, amount: number) => void;
  cancelFacilityBooking: (id: string) => void;
  approveFacilityBooking: (id: string) => void;
  
  payInvoice: (invoiceId: string, cardNum: string) => Promise<boolean>;
  issueInvoice: (memberBadge: string, description: string, amount: number) => void;
  
  addMember: (member: Omit<Member, "status">) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

const DemoContext = React.createContext<DemoContextType | undefined>(undefined);

// Initial Data Setup
const defaultMembers: Member[] = [
  { name: "Officer John Doe", rank: "Patrol Officer", division: "Patrol North", badge: "8492", status: "Active", email: "officer.doe@metro-pd.gov", phone: "(555) 018-3482" },
  { name: "Det. John Kowalski", rank: "Detective", division: "Legal Affairs", badge: "1092", status: "Active", email: "jkowalski@metro-pa.org", phone: "(555) 201-9988" },
  { name: "Sgt. Marcus Vance", rank: "Sergeant", division: "Traffic Control", badge: "8821", status: "Active", email: "mvance@metro-pa.org", phone: "(555) 202-7711" },
  { name: "Off. Sarah Jenkins", rank: "Patrol Officer", division: "Communications", badge: "4421", status: "Active", email: "sjenkins@metro-pa.org", phone: "(555) 203-4411" },
  { name: "Capt. Raymond Vance (Ret.)", rank: "Retired Captain", division: "Welfare & Benefits", badge: "0990", status: "Retired", email: "rvance@metro-pa.org", phone: "(555) 204-5522" },
  { name: "Off. Michael Chang", rank: "Patrol Officer", division: "K9 Unit", badge: "3029", status: "Active", email: "mchang@metro-pd.gov", phone: "(555) 109-8833" },
  { name: "Det. Lisa Warren", rank: "Detective", division: "Special Investigations", badge: "1192", status: "Active", email: "lwarren@metro-pd.gov", phone: "(555) 103-9023" },
  { name: "Sgt. David Miller", rank: "Sergeant", division: "Patrol South", badge: "7730", status: "Active", email: "dmiller@metro-pd.gov", phone: "(555) 104-2034" },
  { name: "Off. Amanda Brooks", rank: "Patrol Officer", division: "Patrol North", badge: "5183", status: "Suspended", email: "abrooks@metro-pd.gov", phone: "(555) 102-4455" },
  { name: "Capt. Robert Sterling", rank: "Captain", division: "Administration", badge: "0012", status: "Active", email: "rsterling@metro-pd.gov", phone: "(555) 101-0022" },
];

const defaultNotices: Notice[] = [
  {
    id: "NT-101",
    date: "2026-07-15",
    title: "General Notice: Membership Roster Auditing 2026",
    content: "All members are requested to audit and update their profile details (mobile number, current division, rank) under the Profile Settings tab. The data will be synced with the central office records for active duty cards.",
    category: "notice"
  },
  {
    id: "NT-102",
    date: "2026-07-12",
    title: "Official Statement: Demands for Separate Police Pay Scale",
    content: "The Bangladesh Police Association (BDPA) executive committee has issued a statement outlining our formal demands to the Ministry of Home Affairs. This includes revisions to basic wages, separate risk allowances for field constables, and pension protections.",
    category: "statement"
  },
  {
    id: "NT-103",
    date: "2026-07-10",
    title: "Congratulations: Kamrul Hasan Talukdar Elected President",
    content: "The association expresses its warmest congratulations to Inspector Kamrul Hasan Talukdar for being elected unopposed as the President of the Bangladesh Police Association. We look forward to strong representation and member welfare under his leadership.",
    category: "congratulations"
  },
  {
    id: "NT-104",
    date: "2026-07-08",
    title: "General Notice: Transit Hostel Suites Reservation Policy",
    content: "Effective immediately, the transit hostel suites at Rajarbagh Police Lines can be booked online via the Member Dashboard. Active duty officers must submit their badge verification code during booking to claim subsidized rates.",
    category: "notice"
  },
  {
    id: "NT-105",
    date: "2026-07-06",
    title: "Official Statement: BDPA Condemns Acts of Violence Against On-Duty Officers",
    content: "A formal statement was issued by the General Secretary Monirul Haque Dablu condemning recent incident developments. The BDPA chief legal team is providing immediate representation and full support to the affected officers.",
    category: "statement"
  },
  {
    id: "NT-106",
    date: "2026-07-03",
    title: "Congratulations: Inspector Monirul Haque Dablu Elected General Secretary",
    content: "Congratulations to Inspector Monirul Haque Dablu for his election as the General Secretary of the BDPA central executive committee. We welcome his dedication and representation goals.",
    category: "congratulations"
  }
];

const defaultAnnouncements: Announcement[] = [
  { id: "AN-01", date: "2026-07-14", title: "Summer Family Picnic RSVP Extended", content: "Great news! The deadline to register for the Annual Summer Family Picnic has been extended to July 20th. Registrations can be done online under the Events tab.", sender: "Welfare Committee" },
  { id: "AN-02", date: "2026-07-11", title: "New Gym Equipment Installed", content: "We are pleased to announce that a new set of commercial treadmills and squat racks have been installed at the Association Gym. Book your slots now!", sender: "Facilities Board" },
  { id: "AN-03", date: "2026-07-06", title: "Legal Council Advisory: Off-Duty Conduct", content: "All members are requested to review the advisory memo regarding off-duty legal representation coverage limitations. Ensure you download the PDF.", sender: "Chief Legal Council" },
];

const defaultEvents: EventItem[] = [
  { id: "EV-201", title: "Annual Charity Gala & Dinner", date: "2026-08-15", location: "Grand Palace Ballroom", description: "Join us for our biggest fundraising event of the year. All proceeds support the Widows and Orphans Assistance Fund. Ticket includes 3-course dinner.", image: "/images/event_gala.jpg", registered: false },
  { id: "EV-202", title: "Police Youth Athletic League Tournament", date: "2026-07-28", location: "Sector 4 Sports Complex", description: "Volunteers needed! MPA is hosting a community youth basketball tournament to build trust and partnerships with sector youngsters.", image: "/images/event_basketball.jpg", registered: true },
  { id: "EV-203", title: "Officer Well-being & Mental Health Seminar", date: "2026-08-02", location: "PA Training Center", description: "A full-day seminar focused on tactical breathing, stress management, and resources available for officers dealing with cumulative trauma.", image: "/images/event_seminar.jpg", registered: false },
];

const defaultGymBookings: GymBooking[] = [
  { id: "GYM-1", day: "Monday", slot: "06:00 AM - 07:30 AM", reservedBy: "available" },
  { id: "GYM-2", day: "Monday", slot: "08:00 AM - 09:30 AM", reservedBy: "8492" },
  { id: "GYM-3", day: "Monday", slot: "04:00 PM - 05:30 PM", reservedBy: "3029" },
  { id: "GYM-4", day: "Monday", slot: "06:00 PM - 07:30 PM", reservedBy: "available" },
  { id: "GYM-5", day: "Tuesday", slot: "06:00 AM - 07:30 AM", reservedBy: "8492" },
  { id: "GYM-6", day: "Tuesday", slot: "08:00 AM - 09:30 AM", reservedBy: "available" },
  { id: "GYM-7", day: "Tuesday", slot: "04:00 PM - 05:30 PM", reservedBy: "available" },
  { id: "GYM-8", day: "Tuesday", slot: "06:00 PM - 07:30 PM", reservedBy: "8821" },
];

const defaultBooks: Book[] = [
  { id: "BK-301", title: "Criminal Code & Procedure 2026", author: "L. K. Vance", category: "Law & Code", status: "Borrowed", borrowedBy: "8492", dueDate: "2026-07-25" },
  { id: "BK-302", title: "Emotional Survival for Law Enforcement", author: "Dr. Kevin Gilmartin", category: "Mental Health", status: "Borrowed", borrowedBy: "8492", dueDate: "2026-07-20" },
  { id: "BK-303", title: "K9 Patrol Tactics and Training Guide", author: "Sgt. Mark Miller", category: "Physical Training", status: "Available" },
  { id: "BK-304", title: "History of the Metropolitan Police Force", author: "Arthur Pendelton", category: "History", status: "Available" },
  { id: "BK-305", title: "Interrogation Law: A Field Manual", author: "Legal Board PA", category: "Law & Code", status: "Available" },
  { id: "BK-306", title: "Officer Physical Conditioning", author: "Coach John Sterling", category: "Physical Training", status: "Available" },
];

const defaultWelfareApplications: WelfareApplication[] = [
  {
    id: "WF-908",
    date: "2026-07-02",
    type: "Medical Grant",
    amount: 1500,
    description: "Co-payment support for physical therapy sessions following off-duty knee surgery.",
    status: "Approved",
    timeline: [
      { date: "2026-07-02", status: "Submitted", comment: "Application filed with documentation." },
      { date: "2026-07-03", status: "Under Review", comment: "Assigned to Raymond Vance for review." },
      { date: "2026-07-05", status: "Approved", comment: "Approved. Disbursement of $1,500 made directly to clinic account." },
    ],
  },
  {
    id: "WF-912",
    date: "2026-07-13",
    type: "Educational Scholarship",
    amount: 2000,
    description: "College entrance scholarship request for dependent daughter (Emily Doe, attending Boston College).",
    status: "Pending",
    timeline: [
      { date: "2026-07-13", status: "Submitted", comment: "Application filed, transcript attached." },
    ],
  },
];

const defaultFacilityBookings: FacilityBooking[] = [
  { id: "FAC-501", facility: "Community Hall", date: "2026-08-20", duration: "1 Day", status: "Approved", bookedBy: "8492", amount: 250 },
  { id: "FAC-502", facility: "Guest House Suite A", date: "2026-07-18", duration: "2 Days", status: "Pending", bookedBy: "8492", amount: 120 },
];

const defaultInvoices: Invoice[] = [
  { id: "INV-4012", date: "2026-07-01", description: "Annual Membership Dues (2026-2027)", amount: 150, status: "Paid", dueDate: "2026-07-15", paidDate: "2026-07-03" },
  { id: "INV-4028", date: "2026-07-10", description: "Facilities Booking Fee - Community Hall (FAC-501)", amount: 250, status: "Unpaid", dueDate: "2026-08-10" },
  { id: "INV-4029", date: "2026-07-12", description: "Facilities Booking Fee - Guest House Suite A (FAC-502)", amount: 120, status: "Unpaid", dueDate: "2026-07-18" },
];

const defaultNotifications: NotificationItem[] = [
  { id: "NTF-01", date: "2026-07-14", title: "New Gym Slots Open", message: "New gym booking slots have been opened for the next week. Book yours now.", read: false, category: "info" },
  { id: "NTF-02", date: "2026-07-13", title: "Welfare Claim Submitted", message: "Your Educational Scholarship claim has been successfully submitted.", read: false, category: "success" },
  { id: "NTF-03", date: "2026-07-10", title: "Invoice Overdue Warning", message: "You have unpaid invoices due soon. Check the Payments tab.", read: true, category: "alert" },
  { id: "NTF-04", date: "2026-07-05", title: "Welfare Claim WF-908 Approved", message: "Your Medical Grant request of $1,500 has been approved.", read: true, category: "success" },
];

const digitsMap: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
};

export function translateDigits(numStr: string): string {
  return numStr.replace(/\d/g, (char) => digitsMap[char] || char);
}

const translationDict: Record<string, string> = {
  // Navigation links
  "Home": "হোম",
  "About Us": "আমাদের সম্পর্কে",
  "News & FAQ": "সংবাদ ও প্রশ্নোত্তর",
  "Contact": "যোগাযোগ",
  "Members Portal": "সদস্য পোর্টাল",
  "Portal Dashboard": "পোর্টাল ড্যাশবোর্ড",
  "Admin View": "অ্যাডমিন ভিউ",
  "Portal Login": "পোর্টাল লগইন",
  "Support Us": "আমাদের সমর্থন করুন",
  "Logout": "লগআউট",
  "Secure Logout": "নিরাপদ লগআউট",
  "Exit Admin Portal": "অ্যাডমিন পোর্টাল থেকে প্রস্থান",
  "Presenter: Admin View": "উপস্থাপক: অ্যাডমিন ভিউ",
  
  // Sidebar links
  "Overview": "সারসংক্ষেপ",
  "Profile & ID Card": "প্রোফাইল ও আইডি কার্ড",
  "Gym Booking": "জিম বুকিং",
  "Library Catalog": "লাইব্রেরি ক্যাটালগ",
  "Facility Bookings": "সুবিধা বুকিং",
  "Welfare Claims": "কল্যাণমূলক দাবি",
  "Invoices & Payments": "ইনভয়েস ও পেমেন্ট",
  "Member Directory": "সদস্য ডিরেক্টরি",
  "Documents": "নথিপত্র",
  "Portal Settings": "পোর্টাল সেটিংস",
  "System Settings": "সিস্টেম সেটিংস",
  "Members Log": "সদস্য লগ",
  "Welfare Claims Review": "কল্যাণ দাবি পর্যালোচনা",
  "Payments Log": "পেমেন্ট লগ",

  // Common UI states / labels
  "Active": "সক্রিয়",
  "Retired": "অবসরপ্রাপ্ত",
  "Suspended": "সাময়িক বরখাস্ত",
  "Pending": "অপেক্ষমান",
  "Approved": "অনুমোদিত",
  "Rejected": "প্রত্যাখ্যাত",
  "Cancelled": "বাতিলকৃত",
  "Paid": "পরিশোধিত",
  "Unpaid": "অপরিশোধিত",
  "Borrowed": "ধারকৃত",
  "Available": "সহলভ্য",
  
  "Badge Number": "ব্যাজ নম্বর",
  "Email Address": "ইমেইল ঠিকানা",
  "Password": "পাসওয়ার্ড",
  "Department Badge Number": "বিভাগীয় ব্যাজ নম্বর",
  "Officer Email Address": "অফিসার ইমেইল ঠিকানা",
  "Security Password": "নিরাপত্তা পাসওয়ার্ড",
  "Secure Login": "নিরাপদ লগইন",
  "Update Profile Details": "প্রোফাইল আপডেট করুন",
  "Change Password": "পাসওয়ার্ড পরিবর্তন করুন",
  "Full Name": "পূর্ণ নাম",
  "Contact Phone": "যোগাযোগ ফোন",
  "Department Email": "বিভাগীয় ইমেইল",
  "Save Changes": "পরিবর্তন সংরক্ষণ করুন",
  "Pay Invoice": "পরিশোধ করুন",
  "Due Amount": "বকেয়া পরিমাণ",
  "Welfare Claim Tracker": "কল্যাণ দাবি ট্র্যাকার",
  "Facility Booking History": "সুবিধা বুকিং ইতিহাস",
  "Active Loans": "সক্রিয় ধারসমূহ",
  "Active Reservations": "সক্রিয় বুকিংসমূহ",
  
  "COMMUNITY REPRESENTATION": "জনসাধারণের প্রতিনিধিত্ব",
  "CRITICAL INCIDENT DEFENSE": "জরুরী আইনী সুরক্ষা",
  "WELFARE & MEMBER BENEFITS": "কল্যাণ ও সদস্য সুবিধা",
  "OPERATIONAL EXCELLENCE": "কার্যক্রম পরিচালনা উৎকর্ষ",
  "COMMUNITY PARTNERSHIP": "কমিউনিটি অংশীদারিত্ব",
  "Access Members Portal": "পোর্টাল প্রবেশ করুন",
  "About Our Association": "আমাদের সম্পর্কে জানুন",
  "Read Association FAQs": "এসোসিয়েশন প্রশ্নোত্তর পড়ুন",
  "Bangladesh": "বাংলাদেশ",
  "Bangladesh Officer Portal": "বাংলাদেশ পুলিশ কর্মকর্তা পোর্টাল",
  "Are you a Bangladesh Police Officer?": "আপনি কি একজন বাংলাদেশ পুলিশ কর্মকর্তা?",
  "Unlock full access to member directory, contract downloads, legal representation request tools, and updates on executive board meetings.": "সদস্য ডিরেক্টরি, চুক্তি ডাউনলোড, আইনী সহায়তার অনুরোধের সরঞ্জাম এবং নির্বাহী বোর্ডের সভার আপডেটের পূর্ণ অ্যাক্সেস আনলক করুন।",
  "Register For Access": "নিবন্ধন করুন",
  "Active Bulletins": "সক্রিয় বুলেটিন",
  "Summer Family Picnic RSVP Extended": "গ্রীষ্মকালীন বনভোজনের সময় বর্ধিত",
  "New Gym Equipment Installed": "নতুন জিম সরঞ্জাম স্থাপন",
  "Legal Council Advisory: Off-Duty Conduct": "আইনি কাউন্সিলের পরামর্শ: ডিউটি বহির্ভূত আচরণ",
  "Members Secure Login": "সদস্যদের নিরাপদ লগইন",
  "Access collective agreements, facilities booking, and member records securely.": "যৌথ চুক্তি, সুযোগ-সুবিধা বুকিং এবং সদস্যের রেকর্ড নিরাপদে অ্যাক্সেস করুন।",
  "Authenticating Secures...": "নিরাপদ প্রমাণীকরণ করা হচ্ছে...",
  "Verification failed. Please check badge or email.": "যাচাইকরণ ব্যর্থ হয়েছে। অনুগ্রহ করে ব্যাজ বা ইমেইল চেক করুন।",
  "An unexpected error occurred during secure authentication.": "নিরাপদ প্রমাণীকরণের সময় একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।",
  "Member Portal": "সদস্য পোর্টাল",
  "Admin View (Presenter)": "অ্যাডমিন ভিউ (উপস্থাপক)",
  "Exit Portal": "পোর্টাল থেকে প্রস্থান",
  "5,200+": "৫,২০০+",
  "35+": "৩৫+",
  "$2.4M+": "২.৪ মিলিয়ন+ টাকা",
  "100%": "১০০%",
  "Active Members": "সক্রিয় সদস্য",
  "Years of Service": "বছরের সেবা",
  "Raised for Charity": "দাতব্য তহবিলে সাহায্য",
  "Legal Coverage": "আইনি সেবা কভারেজ",
  "Officers & retired staff": "কর্মকর্তা ও অবসরপ্রাপ্ত কর্মী",
  "Dedicated advocacy": "উৎসর্গীকৃত সমর্থন",
  "Support for families": "পারিবারিক সাহায্য তহবিল",
  "Full legal protection": "সম্পূর্ণ আইনি সুরক্ষা",
  "Community Hall": "কমিউনিটি হল",
  "Guest House Suite A": "গেস্ট হাউস স্যুট এ",
  "Guest House Suite B": "গেস্ট হাউস স্যুট বি",
  "Tactical Training Room": "ট্যাকটিক্যাল ট্রেনিং রুম",
  "1 Day": "১ দিন",
  "2 Days": "২ দিন",
  "3 Days": "৩ দিন",
  "4 Hours": "৪ ঘন্টা",
  "8 Hours": "৮ ঘন্টা",
  "Book Gym Slot": "জিম স্লট বুক করুন",
  "Borrow Books": "বই ধার করুন",
  "Reserve Facilities": "সুযোগ-সুবিধা বুক করুন",
  "Apply for Welfare": "কল্যাণের জন্য আবেদন করুন",
  "Member Activity Log": "সদস্যের কার্যকলাপ লগ",
  "Overview of your service engagement, gym bookings, and checked out resources.": "আপনার সেবামূলক ব্যস্ততা, জিম বুকিং এবং ধারকৃত উপকরণের সংক্ষিপ্ত বিবরণ।",
  "Gym Hours Logged": "জিম সময় (ঘণ্টা)",
  "Library Borrowings": "লাইব্রেরি ধারসমূহ",
  "Latest Announcements": "সাম্প্রতিক ঘোষণা",
  "Official releases and updates from the executive committee.": "নির্বাহী কমিটির অফিসিয়াল বিজ্ঞপ্তি এবং আপডেটসমূহ।",
  "No submitted welfare applications.": "কোনো দাখিলকৃত কল্যাণ আবেদন নেই।",
  "No facility reservations booked.": "কোনো সুযোগ-সুবিধা সংরক্ষণ নেই।",
  "Date": "তারিখ",
  "Duration": "স্থিতিকাল",
  "Amount Requested": "অনুরোধকৃত পরিমাণ",
  "Latest Update": "সর্বশেষ আপডেট",
  "Kamrul Hasan Talukdar": "কামরুল হাসান তালুকদার",
  "Monirul Haque Dablu": "মনিরুল হক ডাবলু",
  "Md. Abdullahhel Baki": "মোঃ আব্দুল্লাহেল বাকী",
  "Md. Daud Hossain": "মোঃ দাউদ হোসেন",
  "President, Bangladesh Police Association": "সভাপতি, বাংলাদেশ পুলিশ অ্যাসোসিয়েশন",
  "General Secretary, Bangladesh Police Association": "সাধারণ সম্পাদক, বাংলাদেশ পুলিশ অ্যাসোসিয়েশন",
  "Vice President, Bangladesh Police Association": "সহ-সভাপতি, বাংলাদেশ পুলিশ অ্যাসোসিয়েশন",
  "Treasurer, Bangladesh Police Association": "কোষাধ্যক্ষ, বাংলাদেশ পুলিশ অ্যাসোসিয়েশন",
  "Oversees the association's strategic direction, legal defense, and welfare advocacy for non-cadre police officers across Bangladesh.": "সমগ্র বাংলাদেশে নন-ক্যাডার পুলিশ কর্মকর্তাদের আইনি সহায়তা, স্ট্র্যাটেজিক কার্যক্রম এবং কল্যাণমূলক কাজের তদারকি করেন।",
  "Manages union coordination, communications, member relations, and representations of our force nationwide.": "সমগ্র দেশে আমাদের অ্যাসোসিয়েশনের সংযোগ রক্ষা, যোগাযোগ এবং সদস্য সম্পর্কের কাজ পরিচালনা করেন।",
  "Coordinates community outreach, regional committees, and public relations partnerships for the association.": "অ্যাসোসিয়েশনের বিভিন্ন আঞ্চলিক কমিটি, সামাজিক কর্মসূচি ও জনসংযোগ অংশীদারিত্বের কাজ তদারকি করেন।",
  "Manages the welfare fund distribution, financial audits, and charity program operations of the association.": "অ্যাসোসিয়েশনের কল্যাণ তহভিলের বণ্টন, আর্থিক নিরীক্ষা ও দাতব্য কর্মসূচি পরিচালনা করেন।",
  "Our Proud History": "আমাদের গৌরবময় ইতিহাস",
  "Founded in 1920, the Bangladesh Police Association is one of the oldest professional representations in the region, established to represent the interests of non-cadre police officers from Inspector downwards.": "১৯২০ সালে প্রতিষ্ঠিত বাংলাদেশ পুলিশ অ্যাসোসিয়েশন এই অঞ্চলের অন্যতম প্রাচীন পেশাদার সংগঠন, যা ইন্সপেক্টর থেকে শুরু করে কনস্টেবল পর্যন্ত নন-ক্যাডার পুলিশ কর্মকর্তাদের অধিকার রক্ষায় কাজ করে আসছে।",
  "Representing over 50,000 members, our legacy is built on protecting those who protect others. We continue to advocate for better welfare services, professional training, legal security, and enhanced community partnerships.": "৫০,০০০ এর বেশি সদস্যের প্রতিনিধিত্বকারী আমাদের গৌরবময় ঐতিহ্য গড়ে উঠেছে তাদের সুরক্ষার মাধ্যমে যারা অন্যকে রক্ষা করেন। আমরা উন্নত কল্যাণমূলক সেবা, পেশাদার প্রশিক্ষণ, আইনি নিরাপত্তা এবং শক্তিশালী সামাজিক অংশীদারিত্ব নিশ্চিত করতে কাজ করছি।",
  "Executive Board Officers": "কার্যনির্বাহী কমিটির কর্মকর্তা",
  "Who We Are": "আমাদের পরিচিতি",
  "Leadership": "নেতৃত্ব",
  "Rajarbagh Police Lines, Dhaka - 1217, Bangladesh": "রাজারবাগ পুলিশ লাইন্স, ঢাকা - ১২১৭, বাংলাদেশ",
  "Representing the professional interests and ensuring the safety and welfare of Bangladesh Police officers since 1920.": "১৯২০ সাল থেকে বাংলাদেশ পুলিশের অফিসারদের পেশাগত স্বার্থ রক্ষা এবং নিরাপত্তা ও কল্যাণ নিশ্চিত করতে কাজ করছে।",
  "Our Core Directives": "আমাদের মূল নির্দেশনা",
  "Negotiating fair labor agreements and competitive benefit structures.": "ন্যায্য কর্মসংস্থান চুক্তি এবং প্রতিযোগিতামূলক কল্যাণ সুবিধা নিশ্চিত করা।",
  "Providing comprehensive legal defense representation 24/7.": "২৪/৭ সার্বক্ষণিক আইনি সহায়তা নিশ্চিত করা।",
  "Supporting families of disabled or fallen officers via the Welfare Fund.": "কল্যাণ তহবিলের মাধ্যমে অক্ষম বা কর্তব্যরত অবস্থায় শহীদ পুলিশ কর্মকর্তাদের পরিবারকে সহায়তা করা।",
  "Strengthening police-community relations through neighborhood events.": "সামাজিক কর্মসূচির মাধ্যমে পুলিশ ও জনগণের সম্পর্ক শক্তিশালী করা।",
  "Official Facebook Page": "অফিসিয়াল ফেসবুক পেজ",
  "Link": "লিঙ্ক",
  "Official Notice Board & Media Hub": "অফিসিয়াল নোটিশ বোর্ড ও মিডিয়া হাব",
  "Stay updated with official announcements, press statements, and congratulations greetings.": "অফিসিয়াল ঘোষণা, প্রেস বিবৃতি এবং অভিনন্দন বার্তাগুলোর সাথে আপডেট থাকুন।",
  "All Notices": "সকল নোটিশ",
  "Press Statements": "প্রেস বিবৃতি",
  "Congratulations": "অভিনন্দন ও অভিনন্দন বার্তা",
  "General Notice: Membership Roster Auditing 2026": "সাধারণ নোটিশ: সদস্য তালিকা নিরীক্ষা ২০২৬",
  "All members are requested to audit and update their profile details (mobile number, current division, rank) under the Profile Settings tab. The data will be synced with the central office records for active duty cards.": "সকল সদস্যকে প্রোফাইল সেটিংস ট্যাবের অধীনে তাদের প্রোফাইল বিবরণ (মোবাইল নম্বর, বর্তমান বিভাগ, পদবি) নিরীক্ষা ও আপডেট করার জন্য অনুরোধ করা হচ্ছে। এই তথ্যগুলি কেন্দ্রীয় অফিসের নথির সাথে সমন্বয় করা হবে।",
  "Official Statement: Demands for Separate Police Pay Scale": "অফিসিয়াল বিবৃতি: পৃথক পুলিশ বেতন স্কেলের দাবি",
  "The Bangladesh Police Association (BDPA) executive committee has issued a statement outlining our formal demands to the Ministry of Home Affairs. This includes revisions to basic wages, separate risk allowances for field constables, and pension protections.": "বাংলাদেশ পুলিশ অ্যাসোসিয়েশন (বিডিপিএ) কার্যনির্বাহী কমিটি স্বরাষ্ট্র মন্ত্রণালয়ে আমাদের আনুষ্ঠানিক দাবি তুলে ধরে একটি বিবৃতি জারি করেছে। এর মধ্যে মূল বেতন সংশোধন, মাঠ পর্যায়ের কনস্টেবলদের জন্য পৃথক ঝুঁকি ভাতা এবং পেনশন সুরক্ষা অন্তর্ভুক্ত রয়েছে।",
  "Congratulations: Kamrul Hasan Talukdar Elected President": "অভিনন্দন: কামরুল হাসান তালুকদার সভাপতি নির্বাচিত",
  "The association expresses its warmest congratulations to Inspector Kamrul Hasan Talukdar for being elected unopposed as the President of the Bangladesh Police Association. We look forward to strong representation and member welfare under his leadership.": "বাংলাদেশ পুলিশ অ্যাসোসিয়েশনের সভাপতি হিসেবে বিনা প্রতিদ্বন্দ্বিতায় নির্বাচিত হওয়ায় ইন্সপেক্টর কামরুল হাসান তালুকদারকে অ্যাসোসিয়েশন আন্তরিক অভিনন্দন জানাচ্ছে। আমরা তাঁর নেতৃত্বে শক্তিশালী প্রতিনিধিত্ব এবং সদস্য কল্যাণের প্রত্যাশা করছি।",
  "General Notice: Transit Hostel Suites Reservation Policy": "সাধারণ নোটিশ: ট্রানজিট হোস্টেল সুইট সংরক্ষণ নীতিমালা",
  "Effective immediately, the transit hostel suites at Rajarbagh Police Lines can be booked online via the Member Dashboard. Active duty officers must submit their badge verification code during booking to claim subsidized rates.": "অবিলম্বে কার্যকর, রাজারবাগ পুলিশ লাইন্সের ট্রানজিট হোস্টেল সুইটগুলি মেম্বার ড্যাশবোর্ডের মাধ্যমে অনলাইনে বুক করা যাবে। ভর্তুকিযুক্ত হারের জন্য বুকিংয়ের সময় অবশ্যই ব্যাজ নম্বর প্রদান করতে হবে।",
  "Official Statement: BDPA Condemns Acts of Violence Against On-Duty Officers": "অফিসিয়াল বিবৃতি: অন-ডিউটি কর্মকর্তাদের ওপর সহিংসতার তীব্র নিন্দা",
  "A formal statement was issued by the General Secretary Monirul Haque Dablu condemning recent incident developments. The BDPA chief legal team is providing immediate representation and full support to the affected officers.": "সাম্প্রতিক অনাকাঙ্ক্ষিত ঘটনার তীব্র নিন্দা জানিয়ে সাধারণ সম্পাদক মনিরুল হক ডাবলু একটি আনুষ্ঠানিক বিবৃতি জারি করেছেন। বিডিপিএ প্রধান আইনি দল ক্ষতিগ্রস্ত কর্মকর্তাদের তাৎক্ষণিক প্রতিনিধিত্ব এবং সম্পূর্ণ সহায়তা প্রদান করছে।",
  "Congratulations: Inspector Monirul Haque Dablu Elected General Secretary": "অভিনন্দন: ইন্সপেক্টর মনিরুল হক ডাবলু সাধারণ সম্পাদক নির্বাচিত",
  "Congratulations to Inspector Monirul Haque Dablu for his election as the General Secretary of the BDPA central executive committee. We welcome his dedication and representation goals.": "বিডিপিএ কেন্দ্রীয় কার্যনির্বাহী কমিটির সাধারণ সম্পাদক হিসেবে নির্বাচিত হওয়ায় ইন্সপেক্টর মনিরুল হক ডাবলুকে অভিনন্দন। আমরা তাঁর উৎসর্গ এবং প্রতিনিধিত্বমূলক লক্ষ্যকে স্বাগত জানাই।",
  "Signing Authority": "স্বাক্ষরকারী কর্তৃপক্ষ",
  "Date Published": "প্রকাশের তারিখ",
  "Read Full Details": "বিস্তারিত বিবরণ",
  "Close Details": "বন্ধ করুন",
  "Filter by Category": "ক্যাটাগরি ফিল্টার",
  "All": "সকল",
  "No notices matching the selected filter.": "নির্বাচিত ফিল্টারের সাথে মিলে যাওয়া কোনো নোটিশ নেই।",
  "statement": "বিবৃতি",
  "notice": "নোটিশ",
  "congratulations": "অভিনন্দন",
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<DemoContextType["user"]>(null);
  const [members, setMembers] = React.useState<Member[]>(defaultMembers);
  const [notices] = React.useState<Notice[]>(defaultNotices);
  const [announcements] = React.useState<Announcement[]>(defaultAnnouncements);
  const [events, setEvents] = React.useState<EventItem[]>(defaultEvents);
  const [gymBookings, setGymBookings] = React.useState<GymBooking[]>(defaultGymBookings);
  const [books, setBooks] = React.useState<Book[]>(defaultBooks);
  const [welfareApplications, setWelfareApplications] = React.useState<WelfareApplication[]>(defaultWelfareApplications);
  const [facilityBookings, setFacilityBookings] = React.useState<FacilityBooking[]>(defaultFacilityBookings);
  const [invoices, setInvoices] = React.useState<Invoice[]>(defaultInvoices);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(defaultNotifications);
  const [language, setLanguage] = React.useState<"en" | "bn">("en");

  // Sync state from localStorage on Mount
  React.useEffect(() => {
    try {
      const storedUser = localStorage.getItem("mpa_demo_user");
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedMembers = localStorage.getItem("mpa_demo_members");
      if (storedMembers) setMembers(JSON.parse(storedMembers));

      const storedEvents = localStorage.getItem("mpa_demo_events");
      if (storedEvents) setEvents(JSON.parse(storedEvents));

      const storedGym = localStorage.getItem("mpa_demo_gym");
      if (storedGym) setGymBookings(JSON.parse(storedGym));

      const storedBooks = localStorage.getItem("mpa_demo_books");
      if (storedBooks) setBooks(JSON.parse(storedBooks));

      const storedWelfare = localStorage.getItem("mpa_demo_welfare");
      if (storedWelfare) setWelfareApplications(JSON.parse(storedWelfare));

      const storedFacilities = localStorage.getItem("mpa_demo_facilities");
      if (storedFacilities) setFacilityBookings(JSON.parse(storedFacilities));

      const storedInvoices = localStorage.getItem("mpa_demo_invoices");
      if (storedInvoices) setInvoices(JSON.parse(storedInvoices));

      const storedNotifications = localStorage.getItem("mpa_demo_notifications");
      if (storedNotifications) setNotifications(JSON.parse(storedNotifications));

      const storedLang = localStorage.getItem("mpa_demo_lang");
      if (storedLang === "en" || storedLang === "bn") {
        setLanguage(storedLang as "en" | "bn");
      }
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  // Save State Helper functions
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "bn" : "en";
    setLanguage(nextLang);
    try {
      localStorage.setItem("mpa_demo_lang", nextLang);
    } catch (e) {
      console.error(e);
    }
  };

  const t = (key: string, englishDefault: string): string => {
    if (language === "bn") {
      return translationDict[key] || translationDict[englishDefault] || englishDefault;
    }
    return englishDefault;
  };

  const formatCurrency = (amount: number): string => {
    if (language === "bn") {
      return translateDigits(`৳${amount.toLocaleString()}`);
    }
    return `$${amount.toLocaleString()}`;
  };

  const login = async (badge: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Simple verification check
    const matchedMember = members.find(m => m.badge === badge);
    if (matchedMember) {
      const updatedUser = {
        badgeNumber: badge,
        email: email,
        name: matchedMember.name,
        rank: matchedMember.rank,
        division: matchedMember.division,
      };
      setUser(updatedUser);
      saveToLocalStorage("mpa_demo_user", updatedUser);
      return true;
    }
    
    // Fallback/Custom login for demo
    const customUser = {
      badgeNumber: badge,
      email: email,
      name: "Officer John Doe",
      rank: "Patrol Officer",
      division: "Patrol North"
    };
    setUser(customUser);
    saveToLocalStorage("mpa_demo_user", customUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mpa_demo_user");
  };

  const updateProfile = (name: string, phone: string, email: string) => {
    if (!user) return;
    
    // Update matching member in list
    const updatedMembers = members.map(m => {
      if (m.badge === user.badgeNumber) {
        return { ...m, name, phone, email };
      }
      return m;
    });
    setMembers(updatedMembers);
    saveToLocalStorage("mpa_demo_members", updatedMembers);

    // Update session user
    const updatedUser = { ...user, name, email };
    setUser(updatedUser);
    saveToLocalStorage("mpa_demo_user", updatedUser);
  };

  const bookGymSlot = (slotId: string) => {
    if (!user) return;
    const updated = gymBookings.map(b => {
      if (b.id === slotId) {
        return { ...b, reservedBy: user.badgeNumber };
      }
      return b;
    });
    setGymBookings(updated);
    saveToLocalStorage("mpa_demo_gym", updated);

    // Add notification
    const slot = gymBookings.find(b => b.id === slotId);
    if (slot) {
      const newNtf: NotificationItem = {
        id: `NTF-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        title: "Gym Slot Reserved",
        message: `You reserved the gym slot: ${slot.day} at ${slot.slot}.`,
        read: false,
        category: "success"
      };
      const updatedNtf = [newNtf, ...notifications];
      setNotifications(updatedNtf);
      saveToLocalStorage("mpa_demo_notifications", updatedNtf);
    }
  };

  const cancelGymSlot = (slotId: string) => {
    const updated = gymBookings.map(b => {
      if (b.id === slotId) {
        return { ...b, reservedBy: "available" };
      }
      return b;
    });
    setGymBookings(updated);
    saveToLocalStorage("mpa_demo_gym", updated);
  };

  const borrowBook = (bookId: string) => {
    if (!user) return;
    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 14); // 2 weeks limit

    const updated = books.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          status: "Borrowed" as const,
          borrowedBy: user.badgeNumber,
          dueDate: due.toISOString().split("T")[0]
        };
      }
      return b;
    });
    setBooks(updated);
    saveToLocalStorage("mpa_demo_books", updated);
  };

  const returnBook = (bookId: string) => {
    const updated = books.map(b => {
      if (b.id === bookId) {
        const { borrowedBy, dueDate, ...rest } = b;
        return {
          ...rest,
          status: "Available" as const
        };
      }
      return b;
    });
    setBooks(updated);
    saveToLocalStorage("mpa_demo_books", updated);
  };

  const submitWelfare = (type: WelfareApplication["type"], amount: number, description: string) => {
    if (!user) return;
    const newApp: WelfareApplication = {
      id: `WF-${Math.floor(Math.random() * 900) + 100}`,
      date: new Date().toISOString().split("T")[0],
      type,
      amount,
      description,
      status: "Pending",
      timeline: [
        { date: new Date().toISOString().split("T")[0], status: "Submitted", comment: "Application submitted and queued for review." }
      ]
    };
    const updated = [newApp, ...welfareApplications];
    setWelfareApplications(updated);
    saveToLocalStorage("mpa_demo_welfare", updated);

    // Add notification
    const newNtf: NotificationItem = {
      id: `NTF-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      title: "Welfare Assistance Submitted",
      message: `Your ${type} request of $${amount.toLocaleString()} was filed. Claim ID: ${newApp.id}.`,
      read: false,
      category: "success"
    };
    const updatedNtf = [newNtf, ...notifications];
    setNotifications(updatedNtf);
    saveToLocalStorage("mpa_demo_notifications", updatedNtf);
  };

  const reviewWelfare = (id: string, status: "Approved" | "Rejected", comment: string) => {
    const updated = welfareApplications.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          timeline: [
            ...app.timeline,
            { date: new Date().toISOString().split("T")[0], status, comment }
          ]
        };
      }
      return app;
    });
    setWelfareApplications(updated);
    saveToLocalStorage("mpa_demo_welfare", updated);

    // Notify user
    const app = welfareApplications.find(a => a.id === id);
    if (app) {
      const newNtf: NotificationItem = {
        id: `NTF-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        title: `Welfare Claim ${status}`,
        message: `Your claim ${id} has been ${status.toLowerCase()}. Remarks: "${comment}"`,
        read: false,
        category: status === "Approved" ? "success" : "alert"
      };
      const updatedNtf = [newNtf, ...notifications];
      setNotifications(updatedNtf);
      saveToLocalStorage("mpa_demo_notifications", updatedNtf);
    }
  };

  const bookFacility = (facility: FacilityBooking["facility"], date: string, duration: string, amount: number) => {
    if (!user) return;
    const newBooking: FacilityBooking = {
      id: `FAC-${Math.floor(Math.random() * 900) + 100}`,
      facility,
      date,
      duration,
      status: "Pending",
      bookedBy: user.badgeNumber,
      amount
    };
    const updated = [newBooking, ...facilityBookings];
    setFacilityBookings(updated);
    saveToLocalStorage("mpa_demo_facilities", updated);

    // Auto-create invoice
    const newInvoice: Invoice = {
      id: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString().split("T")[0],
      description: `Facilities Booking Fee - ${facility} (${newBooking.id})`,
      amount,
      status: "Unpaid",
      dueDate: date
    };
    const updatedInvoices = [newInvoice, ...invoices];
    setInvoices(updatedInvoices);
    saveToLocalStorage("mpa_demo_invoices", updatedInvoices);
  };

  const cancelFacilityBooking = (id: string) => {
    const updated = facilityBookings.map(b => {
      if (b.id === id) {
        return { ...b, status: "Cancelled" as const };
      }
      return b;
    });
    setFacilityBookings(updated);
    saveToLocalStorage("mpa_demo_facilities", updated);
  };

  const approveFacilityBooking = (id: string) => {
    const updated = facilityBookings.map(b => {
      if (b.id === id) {
        return { ...b, status: "Approved" as const };
      }
      return b;
    });
    setFacilityBookings(updated);
    saveToLocalStorage("mpa_demo_facilities", updated);
  };

  const payInvoice = async (invoiceId: string, cardNum: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const updated = invoices.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: "Paid" as const,
          paidDate: new Date().toISOString().split("T")[0]
        };
      }
      return inv;
    });
    setInvoices(updated);
    saveToLocalStorage("mpa_demo_invoices", updated);

    // Link corresponding facility booking if any
    const invoice = invoices.find(i => i.id === invoiceId);
    if (invoice) {
      // e.g. "Facilities Booking Fee - Community Hall (FAC-501)"
      const match = invoice.description.match(/\((FAC-\d+)\)/);
      if (match && match[1]) {
        const facId = match[1];
        const updatedFac = facilityBookings.map(b => {
          if (b.id === facId) {
            return { ...b, status: "Approved" as const };
          }
          return b;
        });
        setFacilityBookings(updatedFac);
        saveToLocalStorage("mpa_demo_facilities", updatedFac);
      }

      // Add success notification
      const newNtf: NotificationItem = {
        id: `NTF-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        title: "Payment Received",
        message: `Paid $${invoice.amount.toLocaleString()} for ${invoice.description}. Receipt generated.`,
        read: false,
        category: "success"
      };
      const updatedNtf = [newNtf, ...notifications];
      setNotifications(updatedNtf);
      saveToLocalStorage("mpa_demo_notifications", updatedNtf);
    }
    
    return true;
  };

  const issueInvoice = (memberBadge: string, description: string, amount: number) => {
    const newInvoice: Invoice = {
      id: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString().split("T")[0],
      description,
      amount,
      status: "Unpaid",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 14 days later
    };
    const updated = [newInvoice, ...invoices];
    setInvoices(updated);
    saveToLocalStorage("mpa_demo_invoices", updated);

    // If it's the logged-in user, notify them
    if (user && user.badgeNumber === memberBadge) {
      const newNtf: NotificationItem = {
        id: `NTF-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        title: "New Invoice Issued",
        message: `A new invoice of $${amount.toLocaleString()} has been issued for "${description}".`,
        read: false,
        category: "alert"
      };
      const updatedNtf = [newNtf, ...notifications];
      setNotifications(updatedNtf);
      saveToLocalStorage("mpa_demo_notifications", updatedNtf);
    }
  };

  const addMember = (member: Omit<Member, "status">) => {
    const newMember: Member = {
      ...member,
      status: "Active"
    };
    const updated = [...members, newMember];
    setMembers(updated);
    saveToLocalStorage("mpa_demo_members", updated);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map(n => {
      if (n.id === id) {
        return { ...n, read: true };
      }
      return n;
    });
    setNotifications(updated);
    saveToLocalStorage("mpa_demo_notifications", updated);
  };

  const clearNotifications = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    saveToLocalStorage("mpa_demo_notifications", updated);
  };

  return (
    <DemoContext.Provider
      value={{
        user,
        members,
        notices,
        announcements,
        events,
        gymBookings,
        books,
        welfareApplications,
        facilityBookings,
        invoices,
        notifications,
        
        language,
        toggleLanguage,
        t,
        formatCurrency,
        
        login,
        logout,
        updateProfile,
        bookGymSlot,
        cancelGymSlot,
        borrowBook,
        returnBook,
        submitWelfare,
        reviewWelfare,
        bookFacility,
        cancelFacilityBooking,
        approveFacilityBooking,
        payInvoice,
        issueInvoice,
        addMember,
        markNotificationRead,
        clearNotifications,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = React.useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
