import { IFile } from '@/interfaces/IFile';
import { fetchFileURL } from '@/services/FileService';
import { ConvertFileSize } from '@/utils/FileUtils';
import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'native-base';

import React from 'react';
import { Alert, Linking, Pressable } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import * as FileSystem from 'expo-file-system';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

import { RelativeTime } from '../../utils/FileUtils';
import FileIcon from '../icons/FileIcon';
import ThreeDotsIcon from '../icons/ThreeDotsIcon';
import OpenLinkButton from '../reusable/OpenLinkButton';

type FileRowProps = {
  file: IFile;
};

const FileRow: React.FC<FileRowProps> = ({ file }) => {
  const size = ConvertFileSize(file.file_size);
  const lastDotIndex = file.file_name.lastIndexOf('.');
  const fileName = file.file_name.substring(0, lastDotIndex);
  const fileExtension = file.file_name.substring(lastDotIndex + 1);

  const truncatedName =
    fileName.length > 50
      ? fileName.substring(0, 50) + '...'
      : fileName;

  const handlePress = async () => {
    const url = await fetchFileURL(file.id);

    const downloadResumable = FileSystem.createDownloadResumable(url,
      FileSystem.cacheDirectory + file.file_name,
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
      FileViewer.open(uri, {
        showOpenWithDialog: true,
        showAppsSuggestions: true,
      });
    } catch (e) {
      console.error(e);
    }

  }

  // Example of setup fileOptions
  const fileOptions = (fileId: number) => {
    Alert.alert(
      'File Options',
      'What would you like to do with this file?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'Download',
          style: 'default',
          onPress: () => {
            handlePress();
          }
        },
        {
          text: 'Open in Browser',
          style: 'default',
          onPress: async () => {
            const url = await fetchFileURL(file.id);
            Linking.openURL(url);
          }
        },
        {
          text: 'Share',
          style: 'default',
          onPress: () => console.log('Share Pressed')
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Delete Pressed')
        }
      ]
    );
  };

  return (
    <Pressable onPress={() => handlePress()}>
      <View flexDirection={'row'}>
        <View justifyContent={'center'} paddingBottom={h('1.5%')}>
          <FileIcon key={file.id} />
        </View>

        <View
          display={'flex'}
          flexGrow={1}
          marginLeft={w('5%')}
          borderBottomColor={'#4A4A4A33'}
          borderBottomWidth={1.25}
          paddingBottom={h('1.5%')}
          marginTop={h('1%')}
        >
          <Text style={{ width: w('60%') }}>{truncatedName}</Text>
          <Text>{fileExtension} ∙ {size}</Text>
        </View>
        <View
          paddingRight={0}
          justifyContent={'center'}
          paddingBottom={h('1.5%')}
        >
          <Pressable onPress={() => fileOptions(file.id)} style={{ transform: [{ rotate: '90deg' }] }} >
            <ThreeDotsIcon />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default FileRow;
