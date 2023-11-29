import FileList from '@/components/filecollection/FileList';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import ScreenBody from '@/components/reusable/ScreenBody';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';
import { useUser } from '@/contexts/UserContext';
import { fetchUserFilesList } from '@/services/FileService';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import { useQuery } from '@tanstack/react-query';
import { ScrollView, Text, ThreeDotsIcon, View } from 'native-base';

import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FileCollectionScreen() {

  const {user} = useUser()
  const [filter, setFilter] = useState(null);

  const { isPending, data: files, error } = useQuery({
    queryKey: ['userFiles', user.id, filter],
    queryFn: () => fetchUserFilesList(user.id, filter),
    staleTime: 60000 // TEMP, unsolved refetch when unncessary
  });
  console.log('Query Key:', ['userFiles', user.id, filter]);

  if (isPending) {
    return (
      < View
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'#FFF9EE'}
      >
        <ActivityIndicator size="large" />
      </View>

    );
  }

  if (error) {
    return (
      < View
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'#FFF9EE'}
      >
        <Text>Error!</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

   
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
        <TaskTagGrid pressed={filter} pressfunc={setFilter}/>
        <ScrollView>
          <FileList
            files={files}
          />
        </ScrollView>
      </ScreenBody>
    </SafeAreaView>
  );
}
