import React from 'react'
import { View, Text } from 'native-base'
import { moderateScale } from '@/utils/FontSizeUtils'
import { heightPercentageToDP as h, widthPercentageToDP as w } from 'react-native-responsive-screen'
import RightArrowIcon from '@/components/icons/RightArrowIcon'
import { ISubTask } from '@/interfaces/ISubTask'

type SubTasksProps = {
    subtasks: ISubTask
}

const SubTask = ({ subtasks }: SubTasksProps) => {
    return (
        <View
            paddingLeft={h('2%')}
            paddingTop={h('2%')}
            paddingBottom={h('2%')}
            bgColor={'#FFFFFF'}
            borderRadius={13}
            borderWidth={1}
            borderColor={'#0F4D3F'}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={h('2%')}
        >
            <View flexDir={'row'} alignItems={'flex-start'} justifyContent={'space-between'} width={'100%'}>
                <View
                    flexDir={'column'}
                    alignItems={'flex-start'}
                    justifyContent={'space-between'}
                    width={'100%'}
                    marginRight={w('2%')}
                    flex={1}
                >
                    <Text
                        fontSize={moderateScale(15)}
                        fontWeight={'500'}
                        marginBottom={h('.5%')}
                    >
                        {subtasks?.sub_task_name}
                    </Text>
                    <Text
                        fontSize={moderateScale(12)}
                        fontWeight={'400'}
                        color={'#2F1D12'}
                        marginBottom={h('.5%')}
                    >
                        {subtasks?.sub_task_description}
                    </Text>
                </View>
                <View alignSelf={'center'} alignItems={'center'} justifyContent={'center'}>
                    <RightArrowIcon />
                </View>
            </View>
        </View>
    )
}

export default SubTask