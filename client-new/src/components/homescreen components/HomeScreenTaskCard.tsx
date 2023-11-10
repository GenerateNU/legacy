import { View, Text } from "native-base";


type HSTCProps = {
    title: String,
    description: String,
    progress: number
};

const HomeScreenTaskCard: React.FC<HSTCProps> = (props) => {

    return (
        <View
            paddingLeft={4}
            paddingRight={4}
            // paddingTop={16}
            paddingTop={4}
            paddingBottom={4}
            bgColor={'#43A57366'}
            borderRadius={13}
            borderWidth={1}
            borderColor={'#0F4D3F'}
            flexDir={'row'}
            alignItems={'center'}
            marginBottom={4}

            // style={{
            //     paddingLeft: 20,
            //     paddingRight: 20,
            //     paddingTop: 16,
            //     paddingBottom: 16,
            //     borderRadius: 13,
            //     borderWidth: 1,
            //     flexDirection: 'row',
            //     alignItems: 'center',
            //     marginBottom: 16
            // }}
        >
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 8 }}>{props.title}</Text>
                <Text style={{ fontSize: 12, color: '#2F1D12', marginBottom: 8, }}>{props.description}</Text>
            </View>
            <View style={{ width: 72, height: 72, borderRadius: 9999, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 65.13, height: 63.43, position: 'absolute', backgroundColor: '#F7F7F8', borderRadius: 9999 }} />
                <Text style={{ fontSize: 8, fontWeight: '600', color: '#2F1D12' }}>{props.progress}%</Text>
            </View>
        </View>
    );
};

export default HomeScreenTaskCard; 