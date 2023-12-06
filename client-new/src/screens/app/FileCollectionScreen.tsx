
// import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import FileList from '@/components/filecollection/FileList';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import ScreenBody from '@/components/reusable/ScreenBody';
import SearchBar from '@/components/reusable/SearchBar';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';
import { useUser } from '@/contexts/UserContext';
import { IFile } from '@/interfaces/IFile';
import { ITask } from '@/interfaces/ITask';
import { fetchUserFilesList, uploadFile } from '@/services/FileService';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Fuse from 'fuse.js';
import { AddIcon, ArrowDownIcon, Button, ChevronDownIcon, CloseIcon, Icon, ScrollView, SearchIcon, Text, View } from 'native-base';
import FormData from 'form-data'

import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, TextInput, Animated, Easing, Pressable } from 'react-native';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNFetchBlob from 'rn-fetch-blob';
import { SvgXml } from 'react-native-svg';
import { FileSystemUploadResult } from 'expo-file-system';
import NoTaskIcon from '@/components/icons/NoTaskIcon';
import ActivityLoader from '@/components/reusable/ActivityLoader';


export default function FileCollectionScreen() {
  const { user } = useUser();
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>([]);
  const [open, setOpen] = useState(false);
  const searchBarAnimation = useRef(new Animated.Value(0)).current;

  // const toggleSearchBar = () => {
  //   setOpen(!open);
  //   Animated.timing(searchBarAnimation, {
  //     toValue: open ? 0 : 1, // Animate to 1 when opening and 0 when closing
  //     duration: 300, // Animation duration in milliseconds
  //     easing: Easing.ease,
  //     useNativeDriver: true, // Use native driver for performance
  //   }).start();
  // };

  // const searchbarWidth = searchBarAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0%', '22%'],
  // });

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

  const selectDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      });
      console.log('result', result);

      if (result.canceled === false) {
        sendFile.mutate(result.assets[0], {
          onSuccess: () => {
            console.log('File uploaded successfully!');
            refetch();
          },
          onError: (error) => {
            Alert.alert('Error uploading file', error.message);
          },
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const sendFile = useMutation({
    mutationFn: async (file: DocumentPicker.DocumentPickerAsset) => await uploadFile(file, user.id)
  });


  if (sendFile.isSuccess) {
    refetch();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9EE' }} edges={['top', 'left', 'right']}>
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
        <ScreenBody>
          <LegacyWordmark />
          <View
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            marginTop={h('2%')}
          >
            <View>
              <Text
                color={'barkBrown'}
                fontFamily={'rocaOne'}
                fontWeight={'Regular'}
                fontStyle={'normal'}
                fontSize={moderateScale(22)}
                lineHeight={verticalScale(21)}
              >
                Sort By
              </Text>
            </View>
            <View
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              flex={1}
            >
                <SearchBar
                  isPending={isPending}
                  inputSearch={search}
                  keys={['file_name']}
                  updateSearchValue={setSearch}
                  filterItems={filterFiles}
                  filteringType={files}
                  updateFilteredValues={setFilteredFiles}
                  width={h('22%')}
                  height={h('4%')}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderBottomWidth={1}
                  borderRightWidth={0}
                  borderLeftWidth={0}
                  borderTopWidth={0}
                  backgroundColor={'transparent'}
                  placeholder={'Search'}
                display={'flex'}
                // InputRightElement={
                //   <Button
                //     onPress={() => {
                //       setOpen(!open)
                //       setSearch('')
                //       setFilteredFiles([])
                //     }}
                //     backgroundColor={'transparent'}
                //     borderRadius={10}
                //     height={h('5%')}
                //     justifyContent={'space-between'}
                //     alignItems={'center'}
                //   >
                //     <CloseIcon as={Icon} color={'#000'} size={h('1.5%')} />
                //   </Button>
                // }
                />
              {/* <Button
                onPress={() => setOpen(!open)}
                backgroundColor={'transparent'}
                borderRadius={10}
                height={h('5%')}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginLeft={w('2%')}
                display={open ? 'none' : 'flex'}
              >
                <SearchIcon as={Icon} color={'#000'} size={h('2%')} />
              </Button> */}
              <Button
                onPress={selectDocument}
                backgroundColor={'transparent'}
                borderRadius={10}
                height={h('5%')}
                justifyContent={'space-between'}
                alignItems={'center'}

              >
                <AddIcon as={Icon} color={'#000'} size={h('2%')} />
              </Button>
            </View>
          </View>

          <TaskTagGrid
            selectedTags={selectedTags}
            pressfunc={setSelectedTags}
          />

          <AllFilesSelection />

          {isPending && <ActivityLoader />}
          {error && <Text>Error: {error.message}</Text>}
          {!sendFile.isPending && filteredFiles && filteredFiles.length === 0 && <NoTasks />}
          {filteredFiles && filteredFiles.length > 0 && <FileList files={filteredFiles} />}
          {sendFile.isPending && <ActivityLoader />}
        </ScreenBody>
      </ScrollView>
    </SafeAreaView>
  );
}

const AllFilesSelection = () => {
  return (
    <View
      marginTop={h('2%')}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Text
        color={'barkBrown'}
        fontFamily={'rocaOne'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        fontSize={moderateScale(22)}
        lineHeight={verticalScale(21)}
      >
        All Files
      </Text>
      <View
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-evenly'}
      >
        <Text
          color={'barkBrown'}
          fontFamily={'rocaOne'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
          fontSize={moderateScale(19)}
          lineHeight={verticalScale(21)}
          paddingRight={w('.5%')}
        >
          A - Z
        </Text>
        <ChevronDownIcon as={Icon} color={'#000'} size={h('2%')} />
      </View>
    </View>
  )
}

const NoTasks = () => {
  return (
    <View
      marginTop={h('2%')}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <NoTaskIcon />
      <Text
        color={'#00000066'}
        fontFamily={'rocaOne'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        fontSize={moderateScale(21)}
        lineHeight={verticalScale(21)}
      >
        Whoops!
      </Text>
      <Text
        color={'#00000066'}
        fontFamily={'rocaOne'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        fontSize={moderateScale(12)}
        lineHeight={verticalScale(21)}
      >
        No files found.
      </Text>
    </View>
  )
} 