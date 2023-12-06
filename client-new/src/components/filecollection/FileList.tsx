import { IFile } from '@/interfaces/IFile';
import { Text, View } from 'native-base';
import React from 'react';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';
import FileRow from './FileRow';
import NoTaskIcon from '../icons/NoTaskIcon';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';

type FileListProps = {
  files: IFile[];
  orderBy?: string;
  reverse?: boolean;
};

const FileList: React.FC<FileListProps> = ({ files, orderBy, reverse }: FileListProps) => {
  console.log('FileListProps', { orderBy, reverse });
  let sortedFiles = [...files];

  if (orderBy === 'name') {
    sortedFiles = sortedFiles.sort((a, b) => a.file_name.localeCompare(b.file_name));
  } else if (orderBy === 'date') {
    sortedFiles = sortedFiles.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  } else if (orderBy === 'size') {
    sortedFiles = sortedFiles.sort((a, b) => (a.file_size > b.file_size ? -1 : 1));
  }

  if (reverse) {
    sortedFiles.reverse();
  }

  return (
    <View paddingTop={h('2%')}>
      {sortedFiles.length === 0 && <NoTasks />}
      {sortedFiles.map((file) => (
        <FileRow key={file.id} file={file} />
      ))}
    </View>
  );
};

export default FileList;

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