import React from "react";
import { View, Text } from "native-base"; // Import NativeBase components
import HomeScreenTaskCard from "./HomeScreenTaskCard";

type YourJourneyProps = {
    tasks: {
      task_name: string;
      task_description: string;
      progress: number;
    }[];
  };

const YourJourneyComponent: React.FC<YourJourneyProps> = ({ tasks }) => {
    return (
        <View style={{ width: '100%', marginTop: 20 }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={{ color: '#252525', fontSize: 15, fontFamily: 'Open Sans', fontWeight: '700', lineHeight: 20 }}>
                    Your Journey
                </Text>
                <Text style={{ color: '#909090', fontSize: 15, fontFamily: 'Open Sans', fontWeight: '400', textDecorationLine: 'underline', lineHeight: 20 }}>
                    See all
                </Text>
            </View>


            <View style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
                {tasks.map((item, index) => (
                    <View key={index} style={{ marginBottom: 0 }}>
                        <HomeScreenTaskCard title={item.task_name} description={item.task_description} progress={item.progress} />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default YourJourneyComponent;
