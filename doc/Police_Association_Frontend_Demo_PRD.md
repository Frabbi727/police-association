# Police Association Management Platform (Frontend Demo PRD)

## Goal
Build a frontend-only, production-quality demo with dummy data. The demo should showcase a complete public association website and a members-only portal.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Framer Motion
- Recharts

## Information Architecture

### Public Website
- Home
- About Association
- Executive Committee
- News
- Notices
- Events
- Gallery
- Publications
- Downloads
- Contact
- Login

### Member Portal
- Dashboard
- My Profile
- Digital Membership Card
- Notices
- Announcements
- Events
- Gym Booking
- Library
- Community Hall Booking
- Guest House Booking
- Welfare
- Payments
- Member Directory
- Documents
- Notifications
- Settings

## Home Page Sections
1. Hero image slider with CTA.
2. Association statistics.
3. President & Secretary messages.
4. Latest news.
5. Notices ticker.
6. Upcoming events.
7. Featured services.
8. Photo gallery carousel.
9. Video highlights.
10. Testimonials.
11. Sponsors.
12. Footer.

## Member Dashboard
KPIs:
- Membership Status
- Due Amount
- Upcoming Booking
- Borrowed Books
- Notifications
- Upcoming Events

Widgets:
- Recent activity
- Calendar
- Quick actions
- Latest announcements

## Core Demo Modules
### Membership
Profile, QR ID, family info, documents.

### Gym
View slots, reserve, cancel, booking history.

### Library
Browse, reserve, borrow history, due dates.

### Welfare
Apply for assistance, view application timeline.

### Facilities
Book hall, guest house, training room.

### Events
Register, ticket, QR pass.

### Payments
Dummy invoices, receipts, history.

### Directory
Search by name, rank, district.

## Admin Demo (UI Only)
- Dashboard
- Members
- Committee
- News
- Notices
- Gallery
- Events
- Bookings
- Welfare
- Payments
- Reports
- Settings

## UX Guidelines
- Government-grade professional design.
- Navy blue + gold theme.
- Large typography.
- Minimal animations.
- Mobile responsive.
- Accessible forms.
- Clear icons and labels.

## Dummy Data
Create 20-50 records for members, events, notices, books, bookings, galleries, and announcements.

## Suggested Folder Structure
```text
src/
 app/
   (public)/
   (member)/
 components/
 data/
 hooks/
 lib/
 types/
```

## Deliverables
- Fully clickable frontend
- Responsive desktop/tablet/mobile
- Dark mode
- Loading skeletons
- Toast messages
- Empty states
- Search/filter/sort
- Professional UI ready for backend integration.
