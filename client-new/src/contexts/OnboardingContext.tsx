import { createContext, useContext, useState } from "react";
import { IOnboardingFlowState } from "../interfaces/IOnboardingFlowState";

type OnboardingContextData = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onboardingState: IOnboardingFlowState;
  setOnboardingState: React.Dispatch<React.SetStateAction<any>>;
  onboardingFlow: Object;
  handleChange: (name: string, value: any) => void;
};

type OnboardingProviderProps = {
  children?: React.ReactNode;
};

const OnboardingContext = createContext<OnboardingContextData>(
  {} as OnboardingContextData
);

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState(0);
  const [onboardingState, setOnboardingState] = useState<IOnboardingFlowState>(
    {}
  );

  const onboardingFlow = {};

  const handleChange = (name: string, value: any) => {
    setOnboardingState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        page,
        setPage,
        onboardingState,
        setOnboardingState,
        onboardingFlow,
        handleChange,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextData => {
    const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used within an AuthProvider');
  }

  return context;
}
