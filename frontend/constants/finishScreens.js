import InfoCollection from "../app/(onboarding)/InfoCollection";
import WeightCollection from "@/app/(onboarding)/WeightCollection";
import CreateAccount from "@/app/(onboarding)/CreateAccount";

export const onboardingSteps = [
  {
    id: "goals",
    header: "You",
    componentExists: true,
    footerExists: true,
    customComponent: InfoCollection,
  },
  {
    id: "goals-1",
    header: "You",
    componentExists: true,
    footerExists: true,
    customComponent: WeightCollection,
  },
  {
    id: "goals-2",
    header: "Create Account",
    componentExists: false,
    footerExists: false,
    customComponent: CreateAccount,
  },
];
