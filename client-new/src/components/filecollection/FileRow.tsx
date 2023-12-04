import { IFile } from '@/interfaces/IFile';
import { Text, ThreeDotsIcon, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

import FileIcon from '../icons/FileIcon';
import { ConvertFileSize } from '@/utils/FileUtils';
import { RelativeTime } from '../../utils/FileUtils';
import { Linking, Pressable } from 'react-native';
import OpenLinkButton from '../reusable/OpenLinkButton';
import { useQuery } from '@tanstack/react-query';
import { fetchFileURL } from '@/services/FileService';
import FileViewer from "react-native-file-viewer";
import RNFS from 'react-native-fs';

type FileRowProps = {
  file: IFile;
};

const FileRow: React.FC<FileRowProps> = ({ file }) => {
  const size = ConvertFileSize(file.file_size);
  const { 0: fileName, 1: fileEnding } = file.file_name.split('.');
  const truncatedName =
    fileName.length > 50 ? fileName.substring(0, 50) + '...' : fileName + '.' + fileEnding;

  const handlePress = async () => {
    const url = await fetchFileURL(file.id);

    const downloadOptions: RNFS.DownloadFileOptions = {
      fromUrl: url,
      toFile: `${RNFS.DocumentDirectoryPath}/${file.file_name}`,
      progress: (res) => {
        console.log('Progress', res);
      },
    };

    try {
      const downloadResult = RNFS.downloadFile(downloadOptions);
      const res = await downloadResult.promise;
      console.log('File downloaded', res);
      FileViewer.open(`${RNFS.DocumentDirectoryPath}/${file.file_name}`, { showOpenWithDialog: true, showAppsSuggestions: true })
    } catch (e) {
      console.log('Error', e);
    }
  }

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
          <Text>1 item ∙ {size}</Text>
          {/* <Text>Created {date.toString()}</Text> */}
        </View>
        <View
          paddingRight={0}
          justifyContent={'center'}
          paddingBottom={h('1.5%')}
        >
          <ThreeDotsIcon /> 
          {/* TODO: change this to a button since it is an image now. */}
        </View>
      </View>
    </Pressable>
  );
}

export default FileRow;