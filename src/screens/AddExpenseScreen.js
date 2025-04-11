// AddExpenseScreen.js
// Form screen where the user can add a new expense.

import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import spacing from '../theme/spacing';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import i18n from '../locales/i18n';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import GoBackButton from '../components/GoBackButton';
import * as Animatable from 'react-native-animatable';
import { StackActions } from '@react-navigation/native';

const AddExpenseScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSave = async () => {
        if (!title || !amount || !date || !category) {
            Alert.alert('Alert', i18n.t('fillAllFields'));
            return;
        }

        const newExpense = {
            id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
            title,
            amount: parseFloat(amount),
            date,
            category,
        };

            navigation.dispatch(StackActions.popTo('Home', { newExpense }));
    };

    // If data comes with route params, it will automatically fill the form.
    useEffect(() => {
        if (route.params) {
            if (route.params.selectedCategory) {
                setCategory(route.params.selectedCategory);
            }
            if (route.params.title) {
                setTitle(route.params.title);
            }
            if (route.params.amount) {
                setAmount(route.params.amount);
            }
            if (route.params.date) {
                setDate(route.params.date);
            }
        }
    }, [route.params]);

    return (
        <SafeAreaView style={styles.container}>
            <GoBackButton />

            <View style={styles.headerContainer}>
                <Text style={styles.title}>{i18n.t('addExpense')}</Text>
            </View>

            <Animatable.View
            animation='zoomIn'
            duration={1000}
            style={styles.formContainer}
            >
                <TextInput
                    placeholder={i18n.t('enterTitle')}
                    value={title}
                    style={styles.input}
                    onChangeText={(text) => setTitle(text)}
                    placeholderTextColor={colors.textLight}
                />
                <TextInput
                    placeholder={i18n.t('enterAmount')}
                    value={amount}
                    keyboardType='numeric'
                    style={styles.input}
                    placeholderTextColor={colors.textLight}
                    onChangeText={(text) => setAmount(text)}
                />
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={{ color: date ? colors.text : colors.textLight }}>
                        {date || i18n.t('enterDate')}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={date ? new Date(date) : new Date()}
                        mode='date'
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(Platform.OS === 'ios');
                            if (selectedDate) {
                                const formattedDate = selectedDate.toISOString().split('T')[0];
                                setDate(formattedDate);
                            }
                        }}
                    />
                )}

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => navigation.navigate('Category', {
                        mode: 'select',
                        title,
                        amount,
                        date
                    })}
                >
                    <Text style={{ color: category ? colors.text : colors.textLight }}>
                        {category || i18n.t('selectCategory')}
                    </Text>
                </TouchableOpacity>
            </Animatable.View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>{i18n.t('save')}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default AddExpenseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.large,
        marginBottom: spacing.medium,
    },
    title: {
        fontSize: fonts.xl,
        fontWeight: 'bold',
        marginBottom: spacing.large,
        color: colors.text,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    input: {
        borderRadius: 10,
        marginBottom: spacing.medium,
        fontSize: fonts.medium,
        color: colors.text,
        backgroundColor: colors.cardBackground,
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.large,
        borderWidth: 1,
        borderColor: colors.secondary,
    },
    saveButton: {
        marginTop: spacing.large,
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: fonts.medium,
        fontWeight: 'bold',
    },
})