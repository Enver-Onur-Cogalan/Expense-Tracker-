import { Button, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import spacing from '../theme/spacing'
import colors from '../theme/colors';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const HomeScreen = ({ navigation, route }) => {
    const [expenses, setExpenses] = useState([]);
    const filteredCategory = route.params?.filterCategory;

    const filteredExpenses = filteredCategory
        ? expenses.filter(exp => exp.category === filteredCategory)
        : expenses;

    useFocusEffect(
        useCallback(() => {
            if (route.params?.newExpense) {
                setExpenses((prev) => [route.params.newExpense, ...prev]);
                navigation.setParams({ newExpense: null });
            }
            if (route.params?.deleteExpenseId) {
                setExpenses((prev) =>
                    prev.filter((exp) => exp.id !== route.params.deleteExpenseId)
                );
                navigation.setParams({ deleteExpenseId: null });
            }
        }, [route.params])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giderler</Text>

            <FlatList
                data={filteredExpenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ExpenseDetail', { expense: item })}
                    >
                        <View style={styles.expenseItem}>
                            <Text style={styles.expenseText}>{item.title}</Text>
                            <Text style={styles.expenseText}>{item.amount}</Text>
                            <Text style={styles.expenseText}>{item.date}</Text>
                            <Text style={styles.expenseCategory}>{item.category}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Button title='Gider Ekle' onPress={() => navigation.navigate('AddExpense')} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
        color: colors.text,
    },
    expenseItem: {
        backgroundColor: colors.background,
        padding: spacing.medium,
        marginBottom: spacing.small,
        borderRadius: 10,
    },
    expenseText: {
        color: 'blue',
    },
    expenseCategory: {
        fontStyle: 'italic',
        color: 'black',
    },
});