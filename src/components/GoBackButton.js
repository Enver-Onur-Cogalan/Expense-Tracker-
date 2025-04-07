import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import i18n from '../locales/i18n';
import * as Animatable from 'react-native-animatable';


// Button component that allows going back between screens
const GoBackButton = () => {
    const navigation = useNavigation();

    return (
        <Animatable.View animation='bounceIn' duration={1500}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
                padding: spacing.small,
                margin: spacing.small,
                backgroundColor: colors.primary,
                borderRadius: spacing.small,
                alignSelf: 'flex-start',
            }}
        >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                ⏎ {i18n.t('back')}
            </Text>
        </TouchableOpacity>
        </Animatable.View>
    );
};

export default GoBackButton;
