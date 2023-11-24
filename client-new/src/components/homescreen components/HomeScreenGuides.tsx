import { ScrollView, Text, View } from 'native-base';

import React from 'react';

// Import NativeBase components
import HomeScreenGuideCard from './HomeScreenGuideCard';

type GuidesProps = {
  guides: {
    title: string;
    description: string;
  }[];
};

const GuidesComponent: React.FC<GuidesProps> = ({ guides }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} mt={5}>
      {guides.map((item, index) => (
        <View key={index} marginRight={5}>
          <HomeScreenGuideCard
            title={item.title}
            description={item.description}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default GuidesComponent;
