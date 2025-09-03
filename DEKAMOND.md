# 🧾 Authentication System Project Checklist

**Goal:** Build a simple client-side authentication system (Next.js + TypeScript + Tailwind + shadcn)

## 🏗️ Project Setup

- [x] Initialize Next.js project with TypeScript
- [x] Set up Tailwind CSS
- [x] Install and configure shadcn/ui library
- [x] Create clean, modular folder structure
  - [x] UI components directory
  - [x] lib directory for utils

## 🔑 Login Page Implementation

- [ ] Create login page component
- [ ] Implement form with single mobile number input
- [ ] Add input label and styling
- [ ] Implement client-side validation for Iranian mobile numbers
  - [ ] Support format: `09xxxxxxxxx`
  - [ ] Support format: `+989xxxxxxxxx`
  - [ ] Support format: `00989xxxxxxxxx`
- [ ] Show validation error states
- [ ] Add "Login" button with proper states
- [ ] Implement login button click handler:
  - [ ] Send GET request to `https://randomuser.me/api/?results=1&nat=us`
  - [ ] Retrieve user data (name, email, picture)
  - [ ] Store user data in localStorage
  - [ ] Redirect to Dashboard page

## 🖥️ Dashboard Page Implementation

- [ ] Create dashboard page component
- [ ] Show welcome message with user's name
- [ ] Add logout button
- [ ] Implement logout functionality:
  - [ ] Clear localStorage
  - [ ] Redirect to Login page
- [ ] Add authentication guard:
  - [ ] Check for user data in localStorage
  - [ ] Redirect to Login page if no user data

## 🎨 UI Components (Tailwind)

- [ ] **Input Component:**
  - [ ] Label styling
  - [ ] Error state styling
  - [ ] Focus style
  - [ ] Validation feedback
- [ ] **Button Component:**
  - [ ] Primary button style
  - [ ] Disabled state
  - [ ] Loading state
- [ ] Ensure all components are responsive

## ⚙️ Technical Requirements

- [ ] Use Next.js App Router
- [ ] Implement with TypeScript (strong types, no `any`)
- [ ] Style with Tailwind CSS only
- [ ] Follow Next.js best practices:
  - [ ] Proper layout structure
  - [ ] Appropriate metadata
  - [ ] Client components where needed
- [ ] Handle user state/session with localStorage

## 🌟 Quality Standards

- [ ] **Code Quality:**
  - [ ] Clean and readable code
  - [ ] Clear and consistent naming conventions
  - [ ] Modular and maintainable structure
- [ ] **Accessibility:**
  - [ ] ARIA attributes
  - [ ] Focus-visible states
  - [ ] Keyboard navigation support
- [ ] **Documentation:**
  - [ ] Concise comments where needed
  - [ ] Create README with setup instructions
  - [ ] Create README with run instructions

## 🔄 User Flow Testing

- [ ] **Login Flow:**
  - [ ] User opens Login page
  - [ ] User enters valid Iranian phone number
  - [ ] User clicks Login button
  - [ ] API is called successfully
  - [ ] Data is saved in localStorage
  - [ ] User is redirected to Dashboard
- [ ] **Dashboard Flow:**
  - [ ] Dashboard shows welcome message with user's name
  - [ ] Logout button works correctly
  - [ ] localStorage is cleared on logout
  - [ ] User is redirected back to Login page
- [ ] **Authentication Guard:**
  - [ ] Accessing Dashboard without login redirects to Login page

## 📦 Deliverables

- [ ] Create GitHub repository
- [ ] Push complete codebase to GitHub
- [ ] Deploy to Vercel
- [ ] Verify live preview works correctly
- [ ] **Final Submission:**
  - [ ] GitHub repo link ready
  - [ ] Vercel deployed link ready

## 📋 Pre-Submission Checklist

- [ ] All TypeScript compilation errors resolved
- [ ] All components are responsive on mobile and desktop
- [ ] Phone number validation works for all required formats
- [ ] API integration works correctly
- [ ] localStorage persistence works
- [ ] Authentication flow is complete
- [ ] UI matches quality expectations
- [ ] Code is clean and well-commented
- [ ] README is complete and accurate

---

**⏰ Deadline:** Complete within 48 hours

**🎯 Success Criteria:**

- ✨ Code Quality → clean, modular, maintainable
- 🧑‍💻 TypeScript Usage → strong types, no any
- 🎨 UI/UX → responsive, clean Tailwind design
- 🔧 Logic → validation, API handling, redirect, auth state
- 📈 Scalability → reusable components & structure
