import { IFile } from '@/interfaces/IFile';
import { Text, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

import FileRow from './FileRow';

type FileListProps = {
  files: IFile[];
};

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <View paddingTop={h('2%')}>
      {files
        ?.filter((file) => file.file_name !== undefined)
        .map((file) => <FileRow key={file.id} file={file} />)}
    </View>
  );
};

export default FileList;
