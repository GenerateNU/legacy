import Markdown from '@ronradtke/react-native-markdown-display';
import { Box, Image, ScrollView, Text, View } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { IGuide } from '../../interfaces/IGuide';
import { getGuide } from '../../services/GuideService';
import { getMonth } from '../../utils/DateUtils';
import { moderateScale, verticalScale } from '../../utils/FontSizeUtils';

const MarkdownWrapper: React.FC<any> = ({ children }) => {
  return (
    <View px={wp('14%')} py={hp('5.5%')}>
      <Text
        fontFamily={'dmSans'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        fontSize={moderateScale(12)}
        color={'muteEggplant'}
      >
        <Markdown>{children}</Markdown>
      </Text>
    </View>
  );
};

const GuideScreen = (props) => {
  // props should include a guideName field.
  const [state, setState] = useState<IGuide>(null);

  useEffect(() => {
    const fetchGuide = async (guideName: string) => {
      try {
        const guide = await getGuide(guideName);
        setState(guide);
        console.log('initialize guide success: ', guide);
      } catch (err) {
        console.log('failed to initialize guide: ', err);
      }
    };
    fetchGuide(props.guideName);
  }, [props.guideName]);

  return (
    state && (
      <ScrollView>
        <View bg="#FFB017" w={wp('100%')}>
          <View alignItems={'center'}>
            <View pt={hp('12%')} flexDirection={'column'} w={wp('75%')}>
              <Text
                maxW={wp('90%')}
                py={hp('1.25%')}
                fontFamily={'madeDillan'}
                fontSize={moderateScale(43)}
                lineHeight={verticalScale(35)}
                bold
                color={'deepEvergreen'}
              >
                {state.title}
              </Text>
              <Text
                maxW={wp('65%')}
                fontFamily={'dmSans'}
                fontWeight={'Regular'}
                fontStyle={'normal'}
                fontSize={moderateScale(24)}
                lineHeight={verticalScale(25)}
                max-width
                color={'deepEvergreen'}
              >
                {state.sub_title}
              </Text>
              <View py={hp('2%')} flexDirection={'row'} alignItems={'center'}>
                <Image
                  size={50}
                  borderRadius={35}
                  source={{
                    uri: state.author_image_url
                  }}
                  alt="barack"
                />
                <Text
                  px={wp('1.25%')}
                  fontFamily={'dmSans'}
                  fontWeight={'Bold'}
                  fontStyle={'normal'}
                  fontSize={moderateScale(10.5)}
                  color={'deepEvergreen'}
                >
                  Written by {state.author}
                </Text>
              </View>
              <View pb={hp('4%')} flexDirection={'row'}>
                <Text
                  fontFamily={'dmSans'}
                  fontWeight={'Bold'}
                  fontStyle={'normal'}
                  fontSize={moderateScale(10.5)}
                  color={'deepEvergreen'}
                >
                  {state.mins_read.toString()} min read
                </Text>
                <Text
                  px={wp('2%')}
                  fontFamily={'dmSans'}
                  fontWeight={'Bold'}
                  fontStyle={'normal'}
                  fontSize={moderateScale(10.5)}
                  color={'deepEvergreen'}
                >
                  {getMonth(new Date(state.date).getMonth())}{' '}
                  {new Date(state.date).getDay().toString()},{' '}
                  {new Date(state.date).getFullYear().toString()}
                </Text>
              </View>
            </View>
            <View>
              <Box roundedTop={wp('17%')} bg="#FAF8F2" w={wp('100%')}>
                <MarkdownWrapper>{state.full_text}</MarkdownWrapper>
              </Box>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  );
};

export default GuideScreen;
