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
  category: "General" | "Legal" | "Operational" | "Emergency";
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
  { id: "NT-101", date: "2026-07-12", title: "Upcoming Bargaining Agreement Meeting", content: "A special general body meeting will be held on July 25th at the central auditorium to discuss the terms of the new collective bargaining agreement.", category: "General" },
  { id: "NT-102", date: "2026-07-10", title: "Mandatory Body Camera Review Policy Change", content: "The state has updated guidelines regarding post-incident review of body camera footage. Review the updated Legal Guidance document under Documents.", category: "Legal" },
  { id: "NT-103", date: "2026-07-08", title: "Welfare Fund Annual Contributions Update", content: "Effective next pay cycle, voluntary payroll contributions to the Officer Relief and Welfare Fund will increase by 0.5% for all opting members.", category: "Operational" },
  { id: "NT-104", date: "2026-07-05", title: "Emergency Representation Support Hotline", content: "If you are involved in a critical incident, call our 24/7 emergency legal representation line immediately at (555) 911-MPA1.", category: "Emergency" },
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
