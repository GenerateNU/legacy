
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
import { fetchUserFilesList } from '@/services/FileService';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Fuse from 'fuse.js';
import { AddIcon, ArrowDownIcon, Button, ChevronDownIcon, CloseIcon, Icon, ScrollView, SearchIcon, Text, View } from 'native-base';
import FormData from 'form-data'

import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, TextInput, Animated, Easing } from 'react-native';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNFetchBlob from 'rn-fetch-blob';
import { SvgXml } from 'react-native-svg';
import { FileSystemUploadResult } from 'expo-file-system';
// import { DocumentPicker } from 'react-native-document-picker';


export default function FileCollectionScreen() {
  const { user } = useUser();
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>([]);
  const [open, setOpen] = useState(false);
  const searchBarAnimation = useRef(new Animated.Value(0)).current;

  const toggleSearchBar = () => {
    setOpen(!open);
    Animated.timing(searchBarAnimation, {
      toValue: open ? 0 : 1, // Animate to 1 when opening and 0 when closing
      duration: 300, // Animation duration in milliseconds
      easing: Easing.ease,
      useNativeDriver: true, // Use native driver for performance
    }).start();
  };

  const searchbarWidth = searchBarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '22%'],
  });

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

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      });
      console.log('result', result);

      if (result.canceled === false) {
        uploadFile.mutate(result.assets[0], {
          onSuccess: () => {
            // Handle success scenarios if needed
            console.log('File uploaded successfully!');
            refetch(); // Or any other action you need
          },
          onError: (error) => {
            // Handle error scenarios
            console.error('Error uploading file:', error);
          },
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  const uploadFile = useMutation({
    mutationFn: async (file: DocumentPicker.DocumentPickerAsset) => {
      try {
        const uploadResumable = await FileSystem.uploadAsync(
          'http://localhost:8080/api/files/6',
          file.uri,
          {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file_data',
          }
        );
        return uploadResumable; // Return the result of the upload operation
      } catch (error) {
        throw error; // Throw an error if something went wrong
      }
    }
  });

  if (uploadFile.isPending) {
    return (
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="#FFF9EE"
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (uploadFile.error) {
    return (
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="#FFF9EE"
      >
        <Text>Error: {uploadFile.error.message}</Text>
      </View>
    );
  }

  if (uploadFile.isSuccess) {
    refetch();
  }

  const svgImage = `
  <svg xmlns="http://www.w3.org/2000/svg" width="148" height="170" viewBox="0 0 148 170" fill="none">
  <g opacity="0.4">
    <path d="M107.339 121.914C107.181 119.432 108.7 117.787 110.155 116.253C114.124 112.069 118.496 108.322 122.376 104.037C124.178 102.047 125.81 99.938 126.892 97.3862C128.533 93.5183 129 89.571 128.493 85.3467C128.123 82.2657 127.23 79.6169 125.174 77.3905C123.133 75.1797 119.479 75.234 117.25 77.2148C113.934 80.1603 112.337 84.1117 111.062 88.2806C109.613 93.0194 108.621 97.8789 107.655 102.742C106.027 110.944 103.62 118.848 99.9223 126.315C98.1527 129.888 95.8981 133.079 93.3574 136.025C88.1201 142.099 82.1516 147.161 74.6244 149.873C74.4381 149.94 74.3103 150.186 74.1553 150.348" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M51.6706 58.8708C50.7981 60.9903 51.1244 61.7291 52.7321 63.285C55.8308 66.284 59.7632 67.0526 63.6198 67.9247C67.1769 68.7291 70.8051 69.0961 74.4623 69.3173C84.4911 69.9239 94.5203 69.4429 104.548 69.5434C106.299 69.5609 108.147 69.4983 109.827 68.6353C110.413 68.3339 111.088 68.2127 111.059 67.3199C111.032 66.4831 110.302 66.3882 109.811 66.2086C107.607 65.4026 105.303 65.0122 102.995 64.7326C96.5574 63.953 90.0634 64.1704 83.6182 63.6796C73.8992 62.9395 64.1815 63.1912 54.4617 63.0986C54.0277 63.0945 53.5573 62.9874 53.2213 63.4203" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34.3037 68.6199C37.4567 69.2698 40.5868 70.1387 43.7695 70.5031C46.5114 70.817 49.2237 71.3368 51.9755 71.6051C56.4701 72.0434 60.9905 72.4093 65.4705 72.3774C68.5943 72.3552 71.8138 72.6725 74.9314 71.8743C75.0777 71.8369 75.2405 71.8736 75.3955 71.8689C78.9103 71.7614 82.4245 71.6275 85.94 71.5536C88.2235 71.5056 88.6036 71.9051 88.7253 74.3071C88.7914 75.6112 88.9353 76.9299 88.9626 78.2082C89.0137 80.6003 89.5115 82.9568 89.3601 85.3561C89.2538 87.0429 89.7761 88.6843 89.6874 90.394C89.5396 93.2462 88.8876 95.775 86.4024 97.3749C84.3668 98.6854 83.5742 100.776 83.5034 103.068C83.4042 106.277 83.0596 109.46 82.8047 112.65C82.6087 115.101 82.412 117.582 81.7246 119.955C81.552 120.551 81.6207 120.967 81.8758 121.382C85.6853 121.217 89.4338 120.592 93.2278 120.595C94.0655 120.596 94.7838 121.253 95.7317 120.833C96.2532 120.603 96.1985 121.555 96.4841 121.914" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M31.0481 66.6704C31.0481 70.8949 31.0318 75.1196 31.0524 79.344C31.0752 84.0215 31.4592 88.6875 32.0294 93.3106C32.7531 99.178 34.0819 104.939 35.3167 110.72C37.1087 119.109 40.0294 127 43.7855 134.576C46.3987 139.847 50.0456 144.186 55.0848 147.095C55.7097 147.456 56.3446 147.875 57.0987 147.424" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M33.2188 67.8074C33.8606 67.98 34.1043 68.3889 34.1673 69.1055C34.5472 73.4201 35.3024 77.6773 35.9483 81.9535C36.3775 84.7946 36.7634 87.6614 36.9985 90.5497C37.3389 94.7334 37.7916 98.9103 38.41 103.079C39.6023 111.117 42.0698 118.732 44.7524 126.278C46.0759 130 47.5524 133.685 49.0723 137.333C50.2851 140.243 52.4495 142.491 54.6343 144.643C55.4904 145.486 56.3126 146.346 57.1149 147.245C58.6109 148.921 60.6941 149.471 62.6799 150.189C66.1908 151.457 69.7735 151.311 73.3821 150.853C73.7484 150.807 73.8167 150.602 73.9229 150.348" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M76.9461 17.9252C76.8809 19.4744 76.1421 20.7135 75.0701 21.6431C71.8825 24.4071 68.2154 25.186 64.2365 24.0775C62.4859 23.5898 62.3112 22.6336 63.6146 21.3417C65.3526 19.6192 67.5462 18.8565 69.8171 18.4363C74.1124 17.6415 78.4191 17.4724 82.6838 18.7361C84.4564 19.2613 86.0797 20.0004 87.5115 21.3121C90.2063 23.781 90.1265 27.6721 87.7943 30.4306C85.5648 33.0675 82.5495 34.1928 79.4315 35.164C74.1404 36.8121 68.6934 37.832 63.4486 39.676C58.3315 41.4751 54.025 44.4412 50.5833 48.7951C49.7139 49.8949 49.1982 51.1548 48.8724 52.5321C48.2419 55.1974 49.9201 58.0295 52.4394 58.7345C53.9063 59.1449 55.2913 59.7699 56.7937 58.8816C57.703 58.344 57.8184 58.3225 57.7111 57.8978C57.5402 57.2209 56.9959 57.2494 56.4777 57.2447C55.0308 57.2316 53.5347 57.0615 52.6011 58.627" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M107.649 122.564C107.248 121.294 106.401 122.211 106.139 122.45C105.402 123.123 104.803 123.987 104.247 124.845C101.001 129.853 98.0155 135.041 94.6371 139.96C91.1117 145.093 86.7044 148.942 80.8157 150.646C78.6538 151.271 76.4138 151.7 74.1553 150.998" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M91.9873 97.2168C93.0677 99.5577 94.7097 101.496 96.1922 103.539C97.9198 105.92 98.3523 108.473 97.7427 111.357C97.0939 114.425 96.5875 117.527 96.0189 120.614" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M51.826 62.7703C51.3917 63.0243 50.9332 63.1227 50.4303 63.1005C44.2008 62.8252 38.2773 64.6798 32.3059 66.1019C31.5439 66.2834 30.8317 66.17 30.1172 66.3449" stroke="black" stroke-width="1.16776" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M76.3262 15.0007C76.7018 15.8853 76.9718 16.8025 77.1015 17.7629" stroke="black" stroke-width="2.06075" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9EE' }}>
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
              {open && (
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
                  InputRightElement={
                    <Button
                      onPress={() => setOpen(!open)}
                      backgroundColor={'transparent'}
                      borderRadius={10}
                      height={h('5%')}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <CloseIcon as={Icon} color={'#000'} size={h('1.5%')} />
                    </Button>
                  }
                />
              )}

              <Button
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
              </Button>
              <Button
                onPress={pickDocument}
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
                fontSize={moderateScale(22)}
                lineHeight={verticalScale(21)}
                paddingRight={w('.5%')}
              >
                A - Z
              </Text>
              <ChevronDownIcon as={Icon} color={'#000'} size={h('2%')} />
            </View>
          </View>

          {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
          {error && <Text>Error: {error.message}</Text>}
          {files && files.length === 0 && (
            <View
              marginTop={h('2%')}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <SvgXml xml={svgImage} width={w('50%')} height={h('30%')} />
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
          )}
          {files && (
            <FileList
              files={filteredFiles.length > 0 ? filteredFiles : files}
            />
          )}
        </ScreenBody>
      </ScrollView>
    </SafeAreaView>
  );
}  