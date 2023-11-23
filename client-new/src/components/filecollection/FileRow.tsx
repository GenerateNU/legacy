import { IFile } from '@/interfaces/IFile';
import { View, Text, ThreeDotsIcon } from 'native-base';
import React from 'react';
import FileIcon from '../icons/FileIcon';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from 'react-native-responsive-screen';

type FileRowProps = {
  file: IFile;
};

export default function FileRow(props: FileRowProps) {
  return (
    <View flexDirection={'row'}>
      <View justifyContent={'center'} paddingBottom={h('1.5%')}>
        <FileIcon />
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
        <Text>{props.file.fileName}</Text>
        <Text>1 item ∙ 200 KB</Text>
      </View>
      <View
        paddingRight={0}
        justifyContent={'center'}
        paddingBottom={h('1.5%')}
      >
        <ThreeDotsIcon />
      </View>
    </View>
  );
}
