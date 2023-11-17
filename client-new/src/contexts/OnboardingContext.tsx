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
  const [onboardingState, setOnboardingState] = useState<IOnboardingFlowState>({
    worldviewQ1: 3,
    worldviewQ2: 3,
    worldviewQ3: 3,
    worldviewQ4: 3,
    worldviewQ5: 3,
    worldviewQ6: 3,
    emotionalPatternQ1: 3,
    emotionalPatternQ2: 3,
    emotionalPatternQ3: 3,
    workstyleQ1: 3,
    workstyleQ2: 3,
    workstyleQ3: 3,
    workstyleQ4: 3,
    socialInclinationQ1: 3,
    socialInclinationQ2: 3,
    socialInclinationQ3: 3,
    funnelActivitiesQ1: 3,
    funnelActivitiesQ2: 3,
  });

  const onboardingFlow = [
    {
      page: "Sign Up Transition Screen",
      props: {},
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "worldviewQ1",
        totalCircles: 6,
        completedCircles: 0,
        questionNumber: "1",
        question:
          'When it comes to the future, are you the ultimate planner or more of a "let\'s see what happens" kind of person?',
      },
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "worldviewQ2",
        totalCircles: 6,
        completedCircles: 1,
        questionNumber: "2",
        question:
          'Would you describe yourself as more of a perfectionist or someone who is content with "good enough"?',
      },
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "worldviewQ3",
        totalCircles: 6,
        completedCircles: 2,
        questionNumber: "3",
        question:
          "Are you a firm believer in self-improvement, no matter your age?",
      },
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "worldviewQ4",
        totalCircles: 6,
        completedCircles: 3,
        questionNumber: "4",
        question:
          "How open are you to learning and stepping out of your comfort zone?",
      },
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "worldviewQ5",
        totalCircles: 6,
        completedCircles: 4,
        questionNumber: "5",
        question:
          "Do you tend to focus on what you lack or on what you can provide for your loved ones?",
      },
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "worldviewQ6",
        totalCircles: 6,
        completedCircles: 5,
        questionNumber: "6",
        question:
          "Do you take the initiative to plan ahead, or do you wait until circumstances force you to react?",
      },
    },
    {
      page: "Quiz Section Intro Screen",
      props: {
        totalCircles: 3,
        title: "Emotional Patterns",
      },
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "emotionalPatternQ1",
        totalCircles: 3,
        completedCircles: 0,
        questionNumber: "1",
        question: "On a typical day, how anxious or calm do you tend to feel?",
      },
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "emotionalPatternQ2",
        totalCircles: 3,
        completedCircles: 1,
        questionNumber: "2",
        question:
          "Is your glass usually half full, or do you tend to see it as half empty?",
      },
    },
    {
      page: "Questionaire Screen",
      props: {
        inputName: "emotionalPatternQ3",
        totalCircles: 3,
        completedCircles: 2,
        questionNumber: "3",
        question:
          "When making decisions, how often do you consider the emotional burden it might place on those close to you?",
      },
    },
    // {
    //   page: "Quiz Section Intro Screen",
    //   props: {
    //     totalCircles: 4,
    //     title: "Workstyle",
    //   },
    // },
    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "workstyleQ1",
    //     totalCircles: 4,
    //     completedCircles: 0,
    //     questionNumber: "1",
    //     question:
    //       "Are you a laser-focused, 'I get things done' dynamo, or more of a 'why stick to one thing when I can multitask' explorer?",
    //   },
    // },
    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "workstyleQ2",
    //     totalCircles: 4,
    //     completedCircles: 1,
    //     questionNumber: "2",
    //     question:
    //       "Are you more internally motivated to accomplish tasks, or do you rely on external notifications and reminders?",
    //   },
    // },
    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "workstyleQ3",
    //     totalCircles: 4,
    //     completedCircles: 2,
    //     questionNumber: "3",
    //     question:
    //       "Do you prefer to tackle tasks iteratively over time, or do you prefer to do everything all at once?",
    //   },
    // },
    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "workstyleQ4",
    //     totalCircles: 4,
    //     completedCircles: 3,
    //     questionNumber: "4",
    //     question:
    //       "Do you prefer in-depth, detailed information when making important decisions, or do you gravitate towards concise, action-oriented advice?",
    //   },
    // },

    // {
    //   page: "Quiz Section Intro Screen",
    //   props: {
    //     totalCircles: 3,
    //     title: "Social Inclinations",
    //   },
    // },

    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "socialInclinationQ1",
    //     totalCircles: 3,
    //     completedCircles: 0,
    //     questionNumber: "1",
    //     question:
    //       "Is talking about death as easy as chatting about the weather, or do you tend to avoid the topic?",
    //   },
    // },
    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "socialInclinationQ2",
    //     totalCircles: 3,
    //     completedCircles: 1,
    //     questionNumber: "2",
    //     question:
    //       "Are you the go-to person to help friends and family with tricky decisions, or do you prefer someone else to do the heavy lifting?",
    //   },
    // },
    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "socialInclinationQ3",
    //     totalCircles: 3,
    //     completedCircles: 2,
    //     questionNumber: "3",
    //     question:
    //       "Are you more inclined to focus on your issues, or do you often help others with theirs?",
    //   },
    // },

    // {
    //   page: "Quiz Section Intro Screen",
    //   props: {
    //     totalCircles: 2,
    //     title: "Funnel Activities",
    //   },
    // },
    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "funnelActivitiesQ1",
    //     totalCircles: 2,
    //     completedCircles: 0,
    //     questionNumber: "1",
    //     question:
    //       "Are you a walking encyclopedia on end-of-life planning, or do you feel like you're navigating uncharted waters?",
    //   },
    // },
    // {
    //   page: "Questionaire Screen",
    //   props: {
    //     inputName: "funnelActivitiesQ2",
    //     totalCircles: 2,
    //     completedCircles: 1,
    //     questionNumber: "2",
    //     question:
    //       'Is your end-of-life planning a "when I get around to it" affair, or are you sprinting towards getting it done?',
    //   },
    // },
    {
      page: "Persona Screen",
      props: {},
    },
    {
      page: "Landing Screen",
      props: {},
    },
  ];

  const handleChange = (name: string, value: any) => {
    console.log(value);
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
    throw new Error("useOnboarding must be used within an AuthProvider");
  }

  return context;
};
