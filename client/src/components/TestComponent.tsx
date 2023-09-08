import { Text, View } from 'react-native'

type TestComponentProps = {
    name: string;
}

const TestComponent =
    ({ name }: TestComponentProps) => {
        return (
            <View>
                <Text>Hello {name}</Text>
            </View>
        )
    }

export default TestComponent;