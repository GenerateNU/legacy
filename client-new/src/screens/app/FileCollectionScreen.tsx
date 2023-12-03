import FileList from '@/components/filecollection/FileList';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import ScreenBody from '@/components/reusable/ScreenBody';
import SearchBar from '@/components/reusable/SearchBar';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';
import { useUser } from '@/contexts/UserContext';
import { IFile } from '@/interfaces/IFile';
import { ITask } from '@/interfaces/ITask';
import { fetchUserFilesList } from '@/services/FileService';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { ScrollView, Text, View } from 'native-base';

import React, { useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FileCollectionScreen() {
  const { user } = useUser();
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>([]);

  const {
    isPending,
    data: files,
    error,
    refetch
  } = useQuery({
    queryKey: ['userfiles', user?.id, selectedTags],
    queryFn: () => fetchUserFilesList(user.id, selectedTags)
    // staleTime: 6000 // TEMP, unsolved refetch when unncessary
  });
  console.log('Query Key:', ['userFiles', user?.id, selectedTags]);

  const filterFiles = (files: IFile[], keys: string[]): IFile[] => {
    if (search.length > 0) {
      const options = {
        keys: keys,
        threshold: 0.2
      };
      const fuse = new Fuse(files, options);
      const fuseResponse = fuse.search(search);
      return fuseResponse.map((item) => item.item);
    } else {
      return files;
    }
  };

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
        <SearchBar<IFile>
          isPending={isPending}
          inputSearch={search}
          keys={['file_name']}
          updateSearchValue={setSearch}
          filterItems={filterFiles}
          filteringType={files}
          updateFilteredValues={setFilteredFiles}
        />

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
          }
        >
          {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
          {error && <Text>Error: {error.message}</Text>}
          {filteredFiles && filteredFiles.length === 0 && (
            <Text>No files found</Text>
          )}
          {filteredFiles && <FileList files={filteredFiles} />}
        </ScrollView>
      </ScreenBody>
    </SafeAreaView>
  );
}
