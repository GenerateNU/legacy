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
import axios from 'axios';
import Fuse from 'fuse.js';
import { AddIcon, Button, CloseIcon, Icon, ScrollView, SearchIcon, Text, View } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
import FormData from 'form-data'

import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, TextInput, Animated, Easing } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse
} from 'react-native-document-picker';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
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

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        // DocumentPicker.types.pdf,
        // DocumentPicker.types.docx,
        // DocumentPicker.types.doc,
        // DocumentPicker.types.ppt,
        // DocumentPicker.types.pptx,
        // DocumentPicker.types.xls,
        // DocumentPicker.types.xlsx,
        // DocumentPicker.types.csv,
        // DocumentPicker.types.plainText,
        // DocumentPicker.types.images
        // ],
        allowMultiSelection: false
        // copyTo: 'cachesDirectory',
        // mode: 'import',
      });

      // Now you have the selected file, and you can proceed with the upload
      console.log('result', result);
      await uploadFile(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        // Alert.alert('Canceled');
        console.log('Canceled');
      } else {
        // Error occurred in picking the file
        Alert.alert('Error', 'Something went wrong while picking the file.');
      }
    }
  };

  const uploadFile = async (selectedFile: DocumentPickerResponse) => {
    try {
      const strippedUri = selectedFile.uri.replace('file://', '');
      const data = await RNFetchBlob.fs.readFile(strippedUri, 'base64');
      const formData = new FormData();
      formData.append('file_data', data, selectedFile.name);

      const response = await axios.post('http://localhost:8080/api/files/6', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload file.');
    }
  };


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
            <View style={{ marginRight: 10 }}>
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
            </View>
            <View
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              flex={1}>
              <SearchBar
                isPending={isPending}
                inputSearch={search}
                keys={['file_name']}
                updateSearchValue={setSearch}
                filterItems={filterFiles}
                filteringType={files}
                updateFilteredValues={setFilteredFiles}
                width={h('20%')}
                height={h('4%')}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={10}
                backgroundColor={'transparent'}
              />
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

          {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
          {error && <Text>Error: {error.message}</Text>}
          {filteredFiles && filteredFiles.length === 0 && <Text>No files found</Text>}
          {filteredFiles && <FileList files={filteredFiles} />}
        </ScreenBody>
      </ScrollView>
    </SafeAreaView>
  );
}  