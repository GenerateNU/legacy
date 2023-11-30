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
import { ActivityIndicator, RefreshControl } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FileCollectionScreen() {

  const { user } = useUser()
  const [selectedTags, setSelectedTags] = useState([]);

  const { isPending, data: files, error, refetch } = useQuery({
    queryKey: ['userfiles', user?.id, selectedTags],
    queryFn: () => fetchUserFilesList(user.id, selectedTags),
    // staleTime: 60000 // TEMP, unsolved refetch when unncessary
  });
  console.log('Query Key:', ['userFiles', user?.id, selectedTags])

   
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
        <TaskTagGrid selectedTags={selectedTags} pressfunc={setSelectedTags} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isPending}
              onRefresh={() => {
                refetch();
              }}
              colors={['#ff0000', '#00ff00', '#0000ff']}
              tintColor={'#ff0000'}
            />
          }>
          {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
          {error && <Text>Error: {error.message}</Text>}
          {files && files.length === 0 && <Text>No files found</Text>}
          {files && <FileList files={files} />}
        </ScrollView>
      </ScreenBody>
    </SafeAreaView>
  );
}
