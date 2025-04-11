// HomeScreen.js
// Home screen: Home page where expenses are listed and new expenses can be added.

import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import spacing from '../theme/spacing';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import i18n from '../locales/i18n';
import ExpenseItem from '../components/ExpenseItem';
import * as Animatable from 'react-native-animatable';
import { StackActions } from '@react-navigation/native';
import mockExpenses from '../data/mockExpenses.json';

const HomeScreen = ({ navigation, route }) => {
    const [language, setLanguage] = useState(i18n.locale);
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    // Changes the language dynamically according to the user's choice
    const changeLanguage = (lang) => {
        i18n.locale = lang;
        setLanguage(lang);
    };

    // Loads mock expenses if the expense list is empty on the first load
    useEffect(() => {
        if (expenses.length === 0) {
            setExpenses(mockExpenses);
        }
    }, []);

    // Adds a new expense to the list when coming back from the AddExpenseScreen
    useEffect(() => {
        if (route.params?.newExpense) {
            setExpenses(prev => [...prev, route.params.newExpense]);
        }
    }, [route.params?.newExpense]);
    
    // Updates categories when a new category is added in CategoryScreen
    useEffect(() => {
        if (route.params?.updatedCategories) {
            setCategories(route.params.updatedCategories);
        }
    }, [route.params?.updatedCategories]);

    // Filters expenses by selected category if category is selected
    useEffect(() => {
        const category = route.params?.filterCategory;
        if (category) {
            setFilteredExpenses(expenses.filter(exp => exp.category === category));
        } else {
            setFilteredExpenses(expenses);
        }
    }, [expenses, route.params]);

    // Navigates to ExpenseDetailScreen with the selected expense details
    const handleExpenseSelect = (expense) => {
        navigation.navigate('ExpenseDetail', { expense });
    };

    // Clears all expenses when the user confirms the delete all action
    const handleClearExpenses = () => {
        Alert.alert(
            i18n.t('clearExpenses'),
            i18n.t('confirmClearExpenses'),
            [
                {text: i18n.t('cancel'), style: 'cancel'},
                {
                    text: i18n.t('delete'),
                    style: 'destructive',
                    onPress: () => setExpenses([]),
                },
            ]
        );
    };

    // Deletes a specific expense by ID when returning from ExpenseDetailScreen
    useEffect(() => {
        if (route.params?.deleteExpenseId) {
            setExpenses(prev => prev.filter(exp => exp.id !== route.params.deleteExpenseId));
        }
    }, [route.params?.deleteExpenseId]);


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{i18n.t('expenses')}</Text>
            </View>

            <View style={styles.listContainer}>
                <TouchableOpacity
                    onPress={() => navigation.dispatch(
                        StackActions.push('Statistics', { expenses })
                    )}
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
                            contentContainerStyle={{
                                paddingBottom: 45,
                            }}
                        />
                    )}
                </Animatable.View>
            </View>

            <View style ={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: spacing.medium}}>
            <TouchableOpacity
                onPress={() => navigation.navigate('AddExpense')}
                style={[styles.addExpenseButton, {flex: 1, marginRight: 5}]}
            >
                <Text style={styles.addExpenseButtonText}>{i18n.t('addExpense')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={handleClearExpenses}
            style={[styles.clearExpensesButton, { flex: 1, marginLeft: 5 }]}
            >
                <Text style={styles.clearExpensesButtonText}>{i18n.t('clearExpenses')}</Text>
            </TouchableOpacity>
            </View>


            <View style={styles.languageContainer}>
                <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('tr')}>
                    <Text style={styles.languageButtonText}>{i18n.t('turkish')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('en')}>
                    <Text style={styles.languageButtonText}>{i18n.t('english')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    // styles buraya aynı kalabilir
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
    },
    addExpenseButtonText: {
        color: colors.background,
        fontSize: fonts.large,
        fontWeight: 'bold',
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
    clearExpensesButton: {
        backgroundColor: colors.primary,
        borderRadius: spacing.small,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearExpensesButtonText: {
        color: colors.background,
        fontSize: fonts.large,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});