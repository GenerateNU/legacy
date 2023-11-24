import { IFile } from '@/interfaces/IFile';
import { Text, ThreeDotsIcon, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

import FileIcon from '../icons/FileIcon';
import FileRow from './FileRow';

type FileListProps = {
  files: IFile[];
};

export default function FileList(props: FileListProps) {
  return (
    <View paddingTop={h('2%')}>
      {props.files.map((file, index) => (
        <FileRow key={index} file={file} />
      ))}
    </View>
  );
}
