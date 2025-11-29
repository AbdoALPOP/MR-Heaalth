# MyTherapy Clone - Application Requirements Document

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Functional Requirements](#functional-requirements)
3. [Non-Functional Requirements](#non-functional-requirements)
4. [Technical Requirements](#technical-requirements)
5. [User Interface Requirements](#user-interface-requirements)
6. [Data Requirements](#data-requirements)
7. [Performance Requirements](#performance-requirements)
8. [Security & Privacy Requirements](#security--privacy-requirements)
9. [Compatibility Requirements](#compatibility-requirements)
10. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

### Purpose
A comprehensive medication reminder and health tracking application similar to MyTherapy, designed to help users manage medications, track health measurements, build healthy habits, and manage family health profiles.

### Target Users
- Patients with chronic conditions requiring regular medication
- Elderly users needing medication reminders
- Caregivers managing multiple family members' health
- Health-conscious individuals tracking vital signs
- Users seeking to build healthy habits

### Core Value Proposition
Simplify medication adherence and health tracking through an intuitive, multi-language, accessible application with family management capabilities.

---

## 📱 Functional Requirements

### FR-1: Medication Management

#### FR-1.1: Add Medication
**Priority:** High  
**Description:** Users must be able to add new medications to their schedule

**Requirements:**
- Input fields: Medicine name, type, dosage, frequency, time(s)
- Medicine types: Tablet, Capsule, Syrup, Injection, Drops, Cream, Inhaler
- Frequency options: Daily, Twice Daily, Three Times Daily, As Needed
- Support multiple times per day
- Add/remove time slots dynamically
- Save medication to local storage
- Validation for required fields

#### FR-1.2: View Medications
**Priority:** High  
**Description:** Users must see their medication schedule

**Requirements:**
- Display today's medication schedule on home page
- Show medication name, dosage, and time
- Visual indicators for taken/missed/upcoming medications
- Filter by status (All, Taken, Missed, Upcoming)
- Sort by time
- Display medication count and completion percentage

#### FR-1.3: Mark Medication Status
**Priority:** High  
**Description:** Users must be able to mark medications as taken or skipped

**Requirements:**
- One-tap to mark as taken
- Option to skip medication
- Timestamp when action taken
- Update UI immediately
- Persist status in local storage
- Update daily statistics

#### FR-1.4: Edit/Delete Medication
**Priority:** Medium  
**Description:** Users must be able to modify or remove medications

**Requirements:**
- Edit all medication fields
- Delete medication with confirmation
- Update schedule immediately
- Maintain data consistency

---

### FR-2: Health Measurements Tracking

#### FR-2.1: Record Measurements
**Priority:** High  
**Description:** Users must track health measurements

**Requirements:**
- **Blood Pressure:**
  - Systolic value (mmHg)
  - Diastolic value (mmHg)
  - Date and time
  - Optional notes
  
- **Blood Glucose:**
  - Glucose level (mg/dL)
  - Date and time
  - Optional notes
  
- **Weight:**
  - Weight value (kg)
  - Date and time
  - Optional notes

#### FR-2.2: View Measurement History
**Priority:** High  
**Description:** Users must view their measurement history

**Requirements:**
- List view of all measurements
- Filter by measurement type
- Sort by date (newest first)
- Display formatted date (Today, Yesterday, DD/MM/YYYY)
- Show trend indicators (up/down)

#### FR-2.3: Measurement Statistics
**Priority:** Medium  
**Description:** Display measurement statistics

**Requirements:**
- Average value calculation
- Trend analysis (improving/stable/worsening)
- Visual charts (line graphs)
- Last 7-14 days data
- Color-coded trends

---

### FR-3: Habits & Streaks

#### FR-3.1: Create Habits
**Priority:** Medium  
**Description:** Users must create healthy habits to track

**Requirements:**
- Habit name
- Description
- Icon selection
- Frequency (daily, weekly)
- Reminder time
- Category

#### FR-3.2: Track Habit Completion
**Priority:** Medium  
**Description:** Track daily habit completion

**Requirements:**
- Mark habit as complete for the day
- Display current streak
- Show completion history
- Calculate success rate
- Reset streak on missed days

#### FR-3.3: Habit Statistics
**Priority:** Low  
**Description:** View habit performance

**Requirements:**
- Current streak count
- Longest streak
- Total completions
- Success percentage
- Calendar view of completions

---

### FR-4: Statistics & Reports

#### FR-4.1: Daily Statistics
**Priority:** High  
**Description:** Display daily medication adherence

**Requirements:**
- Total medications for the day
- Taken count
- Missed count
- Adherence percentage
- Visual progress indicator

#### FR-4.2: Weekly/Monthly Reports
**Priority:** Medium  
**Description:** Generate comprehensive health reports

**Requirements:**
- Medication adherence trends
- Measurement charts
- Habit completion rates
- Exportable format (PDF/Image)
- Shareable with doctors

#### FR-4.3: Visual Charts
**Priority:** Medium  
**Description:** Interactive data visualization

**Requirements:**
- Line charts for measurements
- Bar charts for adherence
- Pie charts for habit categories
- Interactive tooltips
- Date range selection

---

### FR-5: Family Management

#### FR-5.1: Add Family Members
**Priority:** Medium  
**Description:** Manage multiple family profiles

**Requirements:**
- Name input
- Relationship selection (Father, Mother, Spouse, Child, Sibling, Pet, Other)
- Color assignment
- Avatar/initial display
- Separate data for each member

#### FR-5.2: Switch Between Profiles
**Priority:** Medium  
**Description:** Quickly switch active profile

**Requirements:**
- One-tap profile switching
- Visual indicator of active profile
- Data isolation per profile
- Maintain state per profile

#### FR-5.3: Profile Management
**Priority:** Low  
**Description:** Edit/delete family member profiles

**Requirements:**
- Edit member details
- Delete profile with confirmation
- Cannot delete primary user

---

### FR-6: Settings & Preferences

#### FR-6.1: Theme Selection
**Priority:** High  
**Description:** Choose between light and dark mode

**Requirements:**
- Light mode option
- Dark mode option
- System default option
- Persistent selection
- Smooth transition
- Apply to all screens

#### FR-6.2: Language Selection
**Priority:** High  
**Description:** Multi-language support

**Requirements:**
- **Arabic (العربية):**
  - Complete UI translation
  - Right-to-left (RTL) layout
  - Arabic numerals
  - Arabic date formatting
  
- **English:**
  - Complete UI translation
  - Left-to-right (LTR) layout
  - Western numerals
  - English date formatting

- Persistent language choice
- Immediate UI update
- Support for additional languages (future)

#### FR-6.3: Notification Settings
**Priority:** High  
**Description:** Configure notification preferences

**Requirements:**
- Enable/disable notifications
- Sound toggle
- Vibration toggle
- Critical notifications toggle
- Notification time preferences

#### FR-6.4: Critical Notifications
**Priority:** High  
**Description:** Urgent alerts for overdue medications

**Requirements:**
- Trigger when medication >30 minutes overdue
- Full-screen modal alert
- List all overdue medications
- Show delay time
- Dismiss option
- Auto-check every minute
- Toggle on/off in settings

---

### FR-7: User Profile

#### FR-7.1: Profile Information
**Priority:** Low  
**Description:** Display user information

**Requirements:**
- Name
- Profile picture/avatar
- Contact information
- Medical information (optional)

#### FR-7.2: Account Settings
**Priority:** Low  
**Description:** Manage account preferences

**Requirements:**
- Change password
- Email preferences
- Data backup/restore
- Account deletion

---

## 🎨 User Interface Requirements

### UIR-1: Design System

#### UIR-1.1: Color Palette
**Light Mode:**
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Background: White (#FFFFFF), Gray-50 (#F9FAFB)
- Text: Gray-900 (#111827)

**Dark Mode:**
- Primary: Blue-400 (#60A5FA)
- Secondary: Purple-400 (#A78BFA)
- Success: Green-400 (#34D399)
- Warning: Yellow-400 (#FBBF24)
- Error: Red-400 (#F87171)
- Background: Gray-900 (#111827), Gray-800 (#1F2937)
- Text: White (#FFFFFF), Gray-300 (#D1D5DB)

#### UIR-1.2: Typography
- Default font: System fonts (optimized for each platform)
- No custom font sizes via Tailwind (use globals.css defaults)
- Support for Arabic typography
- Readable text sizes across devices

#### UIR-1.3: Spacing & Layout
- Consistent padding: 4px increments
- Border radius: 8px, 12px, 16px, 20px, 24px
- Max width: 512px (lg) for mobile-first design
- Responsive grid system

### UIR-2: Navigation

#### UIR-2.1: Bottom Navigation
**Requirements:**
- 5 main sections: Home, Add Medicine, Measurements, Statistics, Profile
- Active state indicator
- Icons + labels
- Responsive to theme changes
- RTL support

#### UIR-2.2: Page Structure
**Requirements:**
- Header with title
- Content area
- Action buttons positioned consistently
- Scroll behavior for long content

### UIR-3: Components

#### UIR-3.1: Forms
**Requirements:**
- Clear labels
- Placeholder text
- Validation messages
- Required field indicators
- Accessible form controls
- Dark mode support

#### UIR-3.2: Modals & Dialogs
**Requirements:**
- Backdrop overlay
- Smooth animations (slide-up, fade-in)
- Close button/action
- Responsive sizing
- Accessible keyboard navigation

#### UIR-3.3: Cards & Lists
**Requirements:**
- Consistent card design
- Shadow/elevation
- Hover states
- Clear hierarchy
- Action buttons

#### UIR-3.4: Buttons
**Requirements:**
- Primary, secondary, outlined variants
- Loading states
- Disabled states
- Icon + text combinations
- Touch-friendly sizing (min 44px height)

### UIR-4: Animations

**Requirements:**
- Smooth transitions (200-300ms)
- Page transitions
- Modal animations
- Loading indicators
- Micro-interactions
- Respect user's motion preferences

### UIR-5: Accessibility

**Requirements:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (4.5:1 for text)
- Focus indicators
- Alt text for images
- Semantic HTML

---

## 💾 Data Requirements

### DR-1: Data Storage

#### DR-1.1: Local Storage
**Requirements:**
- Store all user data in browser localStorage
- Data structure:
  ```javascript
  {
    medicines: Medicine[],
    measurements: Measurement[],
    habits: Habit[],
    familyMembers: FamilyMember[],
    settings: {
      theme: 'light' | 'dark',
      language: 'ar' | 'en',
      notifications: boolean,
      criticalNotifications: boolean,
      sound: boolean,
      vibration: boolean
    }
  }
  ```

#### DR-1.2: Data Persistence
**Requirements:**
- Automatic save on every change
- No data loss on page refresh
- Handle localStorage quota
- Graceful degradation if storage unavailable

### DR-2: Data Models

#### DR-2.1: Medicine Model
```typescript
interface Medicine {
  id: string;
  name: string;
  type: string;
  dosage: string;
  frequency: string;
  times: string[];
  taken: { [date: string]: { [time: string]: 'taken' | 'skipped' | 'pending' } };
  createdAt: string;
  updatedAt: string;
}
```

#### DR-2.2: Measurement Model
```typescript
interface Measurement {
  id: string;
  type: 'blood-pressure' | 'glucose' | 'weight';
  value: string;
  systolic?: number;
  diastolic?: number;
  date: string;
  time: string;
  notes?: string;
}
```

#### DR-2.3: Habit Model
```typescript
interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  category: string;
  frequency: 'daily' | 'weekly';
  completions: string[]; // Array of dates
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
}
```

#### DR-2.4: Family Member Model
```typescript
interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  color: string;
  isActive: boolean;
  createdAt: string;
}
```

### DR-3: Data Migration

**Requirements:**
- Version control for data structure
- Migration scripts for updates
- Backward compatibility
- Data validation on load

---

## ⚡ Performance Requirements

### PR-1: Load Time
**Requirements:**
- Initial page load: <2 seconds
- Navigation between pages: <300ms
- Smooth 60fps animations
- Optimized bundle size

### PR-2: Responsiveness
**Requirements:**
- UI updates within 100ms of user action
- No blocking operations
- Async data operations
- Debounced search/filter functions

### PR-3: Resource Usage
**Requirements:**
- Minimal memory footprint
- Efficient re-renders (React optimization)
- Image optimization
- Code splitting for large features

### PR-4: Scalability
**Requirements:**
- Handle 100+ medications
- Handle 1000+ measurements
- Handle 50+ habits
- Handle 10+ family members
- Maintain performance with large datasets

---

## 🔒 Security & Privacy Requirements

### SR-1: Data Privacy
**Requirements:**
- All data stored locally (no server transmission)
- No personal data collection
- No tracking/analytics without consent
- Clear privacy policy
- GDPR compliance (if applicable)

### SR-2: Data Security
**Requirements:**
- No sensitive data in plain text URLs
- Input validation and sanitization
- XSS protection
- CSRF protection (if backend added)

### SR-3: User Disclaimers
**Requirements:**
- Medical disclaimer on first use
- "Not for PII or sensitive data" warning
- "Not a substitute for medical advice" notice
- Terms of service acceptance

---

## 🌐 Compatibility Requirements

### CR-1: Browser Support
**Requirements:**
- Chrome 90+ (Desktop & Mobile)
- Firefox 88+
- Safari 14+ (Desktop & Mobile)
- Edge 90+
- Samsung Internet 14+

### CR-2: Device Support
**Requirements:**
- Mobile phones (320px - 767px)
- Tablets (768px - 1023px)
- Desktop (1024px+)
- Touch and mouse input
- Portrait and landscape orientations

### CR-3: Operating Systems
**Requirements:**
- iOS 14+
- Android 8.0+
- Windows 10+
- macOS 11+
- Linux (major distributions)

### CR-4: Screen Sizes
**Requirements:**
- Minimum: 320px width
- Optimal: 375px - 428px (mobile)
- Maximum: Responsive to any screen size
- Support for high-DPI displays

---

## 🔧 Technical Requirements

### TR-1: Frontend Framework
**Requirements:**
- React 18+
- TypeScript
- Tailwind CSS 4.0
- Functional components with Hooks
- Context API for state management

### TR-2: Libraries & Dependencies
**Required:**
- lucide-react: Icons
- recharts: Charts and graphs
- date-fns or dayjs: Date manipulation

**Optional:**
- react-hook-form@7.55.0: Form handling
- sonner@2.0.3: Toast notifications
- motion/react: Animations

### TR-3: Build & Development
**Requirements:**
- Modern build tool (Vite/Webpack)
- Hot module replacement
- TypeScript compilation
- CSS processing (Tailwind)
- Code linting (ESLint)
- Code formatting (Prettier)

### TR-4: Code Quality
**Requirements:**
- TypeScript strict mode
- No `any` types (use proper typing)
- Component modularity
- Reusable utilities
- Clean code principles
- Commented complex logic

### TR-5: File Structure
```
/
├── App.tsx (Main component with routing)
├── components/
│   ├── HomePage.tsx
│   ├── AddMedicine.tsx
│   ├── Measurements.tsx
│   ├── Statistics.tsx
│   ├── Profile.tsx
│   ├── SettingsPage.tsx
│   ├── CriticalAlert.tsx
│   ├── Habits.tsx
│   └── figma/
│       └── ImageWithFallback.tsx
├── contexts/
│   └── SettingsContext.tsx
├── utils/
│   └── translations.ts
├── styles/
│   └── globals.css
└── imports/ (for Figma assets if used)
```

---

## 📈 Future Enhancements

### Phase 2 (Optional)
- [ ] Backend integration (Supabase/Firebase)
- [ ] Cloud data sync across devices
- [ ] User authentication
- [ ] Push notifications (PWA)
- [ ] Medication barcode scanner
- [ ] Drug interaction checker
- [ ] Pharmacy locator
- [ ] Doctor appointment scheduling
- [ ] Prescription upload and OCR
- [ ] Health reports export (PDF)
- [ ] Wearable device integration
- [ ] Medication refill reminders
- [ ] Insurance integration
- [ ] Telemedicine integration

### Phase 3 (Advanced)
- [ ] AI-powered health insights
- [ ] Medication adherence predictions
- [ ] Community features
- [ ] Gamification and rewards
- [ ] Multi-user real-time collaboration
- [ ] Caregiver portal
- [ ] Clinical trial matching
- [ ] Health data sharing with providers

---

## ✅ Acceptance Criteria

### Minimum Viable Product (MVP)
- ✅ Add, view, edit, delete medications
- ✅ Mark medications as taken/skipped
- ✅ Daily medication schedule view
- ✅ Track blood pressure, glucose, weight
- ✅ View measurement history and trends
- ✅ Basic statistics (daily adherence)
- ✅ Family member management
- ✅ Light/Dark mode
- ✅ Arabic/English language support
- ✅ Critical notifications for overdue medications
- ✅ Settings page
- ✅ Responsive design
- ✅ Local data persistence

### Success Metrics
- User can add a medication in <60 seconds
- User can mark medication taken in <5 seconds
- User can switch language and see immediate update
- User can record measurement in <30 seconds
- App loads in <2 seconds on 3G connection
- 100% of UI translated in both languages
- 0 accessibility errors (WCAG AA)
- Works on 95% of modern browsers

---

## 📝 Notes

### Development Priorities
1. **High Priority:** Core medication and measurement tracking
2. **Medium Priority:** Statistics, habits, family management
3. **Low Priority:** Advanced features, exports, integrations

### Known Limitations
- No real-time notifications (requires PWA/native app)
- No data backup to cloud (localStorage only)
- Limited to browser storage quota (~5-10MB)
- No offline-first architecture (requires service workers)

### Recommendations
- Implement PWA for better mobile experience
- Add data export feature early
- Consider backend integration for data sync
- Implement comprehensive error handling
- Add user onboarding/tutorial
- Regular user testing for UX improvements

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-29  
**Status:** Active Development  
**Maintained By:** Development Team
