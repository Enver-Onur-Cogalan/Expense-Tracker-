import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import i18n from '../locales/i18n';

const GoBackButton = () => {
    const navigation = useNavigation();

    return (
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
    );
};

export default GoBackButton;
