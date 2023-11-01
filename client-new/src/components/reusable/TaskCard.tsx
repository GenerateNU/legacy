import { View, Text } from "react-native";

type TaskProps = {
    title: String,
    description: String,
  };

export default function TaskCard(props) {
    return (
        <View
        style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 16,
            paddingBottom: 16,
            backgroundColor: 'white',
            borderRadius: 13,
            borderWidth: 1,
            borderColor: '#EFEFEF',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row'
        }}
        >
        <View
            style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginHorizontal: 12,
            }}
        >
            <Text
            style={{
                color: '#252525',
                fontSize: 15,
                fontFamily: 'Open Sans',
                fontWeight: '600',
                lineHeight: 20,
                flexWrap: 'wrap',
            }}
            >
            {props.title}
            </Text>
            <Text
            style={{
                color: '#C1C3C7',
                fontSize: 12,
                fontFamily: 'Open Sans',
                fontWeight: '400',
                lineHeight: 20,
                flexWrap: 'wrap',
            }}
            >
            {props.description}
            </Text>
        </View>
        <View
            style={{
            width: 72,
            height: 74,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            }}
        >
        </View>
        </View>
    );
};