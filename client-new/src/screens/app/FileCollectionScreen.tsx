import FileList from '@/components/filecollection/FileList';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import ScreenBody from '@/components/reusable/ScreenBody';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import { ScrollView, Text, ThreeDotsIcon, View } from 'native-base';

import React, { useState } from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <TaskTagGrid pressed={filter} />
        <FileList
          files={[
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] },
            { fileName: 'test', userId: 1, tags: [] }
          ]}
        />
      </ScreenBody>
    </SafeAreaView>
  );
}
