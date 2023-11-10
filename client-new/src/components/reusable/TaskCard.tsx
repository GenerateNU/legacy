import { View, Text, Icon, CheckIcon } from "native-base";

type TaskProps = {
    title: String,
    description: String,
    completed: Boolean
  };

export default function TaskCard(props) {
    return (
        <View flexDirection={'row'} width={'90%'} padding='2'>
            <View width='10' height='10' borderRadius={'100'} borderWidth={'3'} backgroundColor={'#D3D3D3'} borderColor={'#D3D3D3'} justifyContent={'center'} alignItems={'center'} marginRight={'3'}>
            <CheckIcon name="" color='#FF692E' />
            </View>
            <View flexDirection={'columm'}>
                <Text fontWeight={'bold'}>
                    {props.title}
                </Text>
                <Text>
                    {props.description}
                </Text>
            </View>
        </View>

    );
};