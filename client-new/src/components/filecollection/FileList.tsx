import { View, Text, ThreeDotsIcon } from 'native-base';
import React from 'react';
import FileIcon from '../icons/FileIcon';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from 'react-native-responsive-screen';
import { IFile } from '@/interfaces/IFile';
import FileRow from './FileRow';

type FileListProps = {
  files: IFile[]
}

export default function FileList(props: FileListProps) {
  return (
    <View paddingTop={h('2%')}>
      {props.files.map((file, index) => (
        <FileRow key={index} file={file}/>
      ))}
    </View>
  );
}
