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

type FileRowProps = {
  file: IFile;
};

const FileRow: React.FC<FileRowProps> = ({ file }) => {
  const size = ConvertFileSize(file.file_size);
  const { 0: fileName, 1: fileEnding } = file.file_name.split('.');
  const truncatedName = fileName.length > 40 ? fileName.substring(0, 40) + '...' : fileName + '.' + fileEnding;
  // const date = RelativeTime(new Date(file.created_at));

  const handlePress = async () => {
    const url = await fetchFileURL(file.id);
    console.log('URL', url);
    // open file
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("Can't open URL:", url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
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
          <Text>1 item ∙ {size}</Text>
          {/* <Text>Created {date.toString()}</Text> */}
        </View>
        <View
          paddingRight={0}
          justifyContent={'center'}
          paddingBottom={h('1.5%')}
        >
          <ThreeDotsIcon />
        </View>
      </View>
    </Pressable>
  );
}

export default FileRow;