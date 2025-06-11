import Goals from "./Goals";

export const onboardingSteps = [
  {
    id: "name",
    title: "Welcome",
    header: "First, what can we call you?",
    sub: "We'd like to get to know you.",
    label:"Preferred name",
    placeholder: "Enter your name here",
    input: true,
    field: "name",
  },
  {
    id: "goals",
    title: "Goals",
    header: "Let's start with goals",
    sub: "Select up to 3 that are important to you including one weight goal.",
    input: false,
    customComponent: Goals,
    field: "agreeToTerms",
  },
  {
    id: "goals-1",
    title: "Goals",
    header: "Hello",
    input: true,
    placeholder: "Enter something",
    // field: "email",
  },
  {
    id: "activity",
    title: "Activity Level",
    header: "How active are you?",
    sub: "Select the option that best describes your activity level.",
    input: false,
    // field: "activityLevel", // Optional: if you track this
  },
  {
    id: "health",
    title: "Health Conditions",
    header: "Do you have any health conditions?",
    sub: "This helps us tailor your experience.",
    input: false,
    // field: "healthConditions", // Optional: if you add a form
  },
  {
    id: "notifications",
    title: "Notifications",
    header: "Would you like to receive notifications?",
    sub: "Stay updated with our latest features and tips.",
    input: false,
    // field: "notificationsOptIn", // Optional
  },
  {
    id: "finish",
    title: "Finish",
    header: "You're all set!",
    sub: "Let's get started on your journey.",
    input: false,
  },
];
