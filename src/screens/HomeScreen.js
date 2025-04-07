import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import spacing from '../theme/spacing'
import colors from '../theme/colors'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import fonts from '../theme/fonts'
import i18n from '../locales/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ExpenseItem from '../components/ExpenseItem'
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation, route }) => {
    const [language, setLanguage] = useState(i18n.locale)
    const [expenses, setExpenses] = useState([])
    const [isFirstLoad, setIsFirstLoad] = useState(true) // sadece ilk yükleme için kontrol

    const changeLanguage = (lang) => {
        i18n.locale = lang
        setLanguage(lang)
    }

    const loadExpenses = async () => {
        try {
            const storedExpenses = await AsyncStorage.getItem('expenses');
            const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];
            setExpenses(parsedExpenses);
        } catch (error) {
            console.log('Veriler yüklenirken hata oluştu:', error);
        }
    }

    useEffect(() => {
        if (isFirstLoad) {
            loadExpenses();
            setIsFirstLoad(false);
        }
    }, [isFirstLoad]);

    useFocusEffect(
        useCallback(() => {
            const handleExpenses = async () => {
                try {
                    const storedExpenses = await AsyncStorage.getItem('expenses');
                    const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];

                    if (route.params?.newExpense) {
                        const alreadyExists = parsedExpenses.some(
                            (exp) => exp.id === route.params.newExpense.id
                        );

                        if (!alreadyExists) {
                            const updatedExpenses = [...parsedExpenses, route.params.newExpense];
                            await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
                            setExpenses(updatedExpenses);
                        }

                        navigation.setParams({ newExpense: null });
                        return;
                    }

                    if (route.params?.deleteExpenseId) {
                        const updatedExpenses = parsedExpenses.filter(
                            (exp) => exp.id !== route.params.deleteExpenseId
                        );
                        await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
                        setExpenses(updatedExpenses);
                        navigation.setParams({ deleteExpenseId: null });
                        return;
                    }

                } catch (error) {
                    console.log('Veriler güncellenirken hata oluştu:', error);
                }
            };

            handleExpenses();
        }, [route.params])
    );

    const filteredCategory = route.params?.filterCategory;
    const filteredExpenses = filteredCategory
        ? expenses.filter(exp => exp.category === filteredCategory)
        : expenses;

    const handleExpenseSelect = (expense) => {
        navigation.navigate('ExpenseDetail', { expense });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{i18n.t('expenses')}</Text>
            </View>

            <View style={styles.listContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Statistics')}
                    style={styles.chartButton}
                >
                    <Text style={styles.chartButtonText}>{i18n.t('statistics')}</Text>
                </TouchableOpacity>

                <Animatable.View animation='fadeIn' duration={2000} delay={100}>
                {filteredExpenses.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: colors.text }}>
                        {i18n.t('noExpenses')}
                    </Text>
                ) : (
                    <FlatList
                        data={filteredExpenses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ExpenseItem
                                title={item.title}
                                amount={item.amount}
                                date={item.date}
                                category={item.category}
                                onPress={() => handleExpenseSelect(item)}
                            />
                        )}
                    />
                )}
                </Animatable.View>
            </View>

            <TouchableOpacity
            onPress={() => navigation.navigate('AddExpense')}
            style={styles.addExpenseButton}
            >
                <Text style={styles.addExpenseButtonText}>{i18n.t('addExpense')}</Text>
            </TouchableOpacity>

            <View style={styles.languageContainer}>
                <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('tr')}>
                    <Text style={styles.languageButtonText}>{i18n.t('turkish')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('en')}>
                    <Text style={styles.languageButtonText}>{i18n.t('english')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
        justifyContent: 'flex-start',
    },
    headerContainer: {
        marginTop: spacing.large,
        marginBottom: spacing.large,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: spacing.medium,
    },
    headerTitle: {
        fontSize: fonts.xl,
        fontWeight: '600',
        color: colors.textLight,
        opacity: 0.7,
    },
    languageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 'auto',
        paddingVertical: spacing.small,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.primary,
    },
    languageButton: {
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.small,
        borderRadius: 20,
        backgroundColor: colors.primary,
    },
    languageButtonText: {
        color: '#fff',
        fontSize: fonts.small,
        fontWeight: 'bold',
    },
    title: {
        fontSize: fonts.xl,
        fontWeight: 'bold',
        marginBottom: spacing.large,
        color: colors.text,
    },
    expenseItem: {
        backgroundColor: colors.background,
        padding: spacing.medium,
        marginBottom: spacing.small,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    expenseTitle: {
        color: colors.text,
        fontSize: fonts.large,
        fontWeight: '600',
        marginBottom: 4,
    },
    expenseAmount: {
        color: colors.primary,
        fontSize: fonts.medium,
        marginBottom: 2,
    },
    expenseDate: {
        color: colors.text,
        fontSize: fonts.small,
    },
    expenseCategory: {
        fontStyle: 'italic',
        color: colors.text,
        fontSize: fonts.small,
    },
    listContainer: {
        flex: 1,
    },
    chartButton: {
        backgroundColor: colors.primary,
        padding: 10,
        margin: 10,
        borderRadius: spacing.small,
        alignItems: 'center',
    },
    chartButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addExpenseButton: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: spacing.small,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.medium,
    },
    addExpenseButtonText: {
        color: colors.background,
        fontSize: fonts.large,
        fontWeight: 'bold',
    },
});