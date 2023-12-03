import { ScrollView, Text, View } from 'native-base';

import React from 'react';

import HomeScreenGuideCard from '@/components/homescreen components/HomeScreenGuideCard';
import { IGuide } from '@/interfaces/IGuide';

type GuidesProps = {
  guides: IGuide[];
};

const GuidesComponent: React.FC<GuidesProps> = ({ guides }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} mt={5}>
      {guides.map((item, index) => (
        <View key={index} marginRight={5}>
          <HomeScreenGuideCard guide={item} />
        </View>
      ))}
    </ScrollView>
  );
};

export default GuidesComponent;
