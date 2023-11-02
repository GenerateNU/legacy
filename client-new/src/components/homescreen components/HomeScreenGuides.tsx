import React from "react";
import { View, Text, ScrollView } from "native-base"; // Import NativeBase components
import HomeScreenGuideCard from "./HomeScreenGuideCard";

type GuidesProps = {
    guides: {
      title: string;
      description: string;
    }[];
  };

const GuidesComponent: React.FC<GuidesProps> = ({ guides }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
                                {guides.map((item, index) => (
                                    <View key={index} style={{ marginRight: 20 }}>
                                        <HomeScreenGuideCard title={item.title} description={item.description}/>
                                    </View>
                                ))}
                            </ScrollView>
    );
};

export default GuidesComponent;
