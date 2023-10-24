import { View, Text } from "react-native";

type HSTCProps = {
    title: String,
    description: String,
    progress: Number
  };

export default function HomeScreenTaskCard(props) {
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
            <View
            style={{
                width: 65.13,
                height: 63.43,
                position: 'absolute',
                backgroundColor: '#D9D9D9',
                borderRadius: 9999,
                transform: [{ rotate: '-96.92deg' }],
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
            <View
                style={{
                width: '100%',
                height: '100%',
                transform: [{ rotate: '-98.20deg' }],
                backgroundColor: '#F7F7F8',
                borderRadius: 9999,
                }}
            />
            </View>
            <Text
            style={{
                position: 'absolute',
                textAlign: 'center',
                color: '#252525',
                fontSize: 8,
                fontFamily: 'Open Sans',
                fontWeight: '600',
                lineHeight: 20,
            }}
            >
            {props.progress}%
            </Text>
        </View>
        </View>
    );
};

