import React from "react";
import { View, Text } from "native-base";
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
        <View width={'100%'} marginTop={5}>
            <View justifyContent={'space-between'} flexDir={'row'}>
                <Text color={'#252525'} fontFamily={"rocaOne"} fontWeight={"Regular"} fontStyle={"normal"} fontSize={24} lineHeight={26.4} >
                    Your Journey
                </Text>
                <Text color={'#909090'} fontSize={15} fontFamily={'Open Sans'} fontWeight={'400'} textDecorationLine={'underline'} lineHeight={20}>
                    See all
                </Text>
            </View>


            <View mt={5} flexDir={'column'} justifyContent={'space-between'}>
                {tasks.map((item, index) => (
                    <View key={index} mb={0}>
                        <HomeScreenTaskCard title={item.task_name} description={item.task_description} progress={item.progress} />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default YourJourneyComponent;