import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import { View, Text, ScrollView, ThreeDotsIcon } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from 'react-native-responsive-screen';
import ScreenBody from '@/components/reusable/ScreenBody';
import FileList from '@/components/filecollection/FileList';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';

export default function FileCollectionScreen() {
    const [filter, setFilter] = useState(null);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9EE' }}>
      <ScreenBody>
        <View marginLeft={'auto'} marginRight={0}>
          <LegacyWordmark />
        </View>
        <Text
          color={'barkBrown'}
          fontFamily={'rocaOne'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
          fontSize={moderateScale(22)}
          lineHeight={verticalScale(21)}
          marginTop={h('2%')}
        >
          All Files
        </Text>
        <TaskTagGrid pressed={filter}/>
        <FileList
          files={[
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
          ]}
        />
      </ScreenBody>
    </SafeAreaView>
  );
}
