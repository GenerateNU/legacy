import { View, Text, Center, Modal } from 'native-base';
import Circle from './Circle';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import React from 'react';

export type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function OurModal(props: ModalProps) {
  return (
    <Center>
      <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)}>
        {props.children}
      </Modal>
    </Center>
  );
}
