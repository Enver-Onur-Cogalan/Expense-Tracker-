import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import spacing from '../theme/spacing'
import colors from '../theme/colors'

const AddExpenseScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    const handleSave = () => {
        if (!title || !amount || !date || !category) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
            return;
        }

        const newExpense = {
            id: Date.now().toString(),
            title,
            amount: parseFloat(amount),
            date,
            category,
        };

        console.log('Yeni Gider:', newExpense);

        navigation.navigate('Home', { newExpense });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gider Ekle</Text>

            <TextInput
                placeholder='Başlık'
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder='Miktar'
                value={amount}
                onChangeText={setAmount}
                keyboardType='numeric'
                style={styles.input}
            />
            <TextInput
                placeholder='Tarih (YYYY-AA-GG)'
                value={date}
                onChangeText={setDate}
                style={styles.input}
            />
            <TextInput
                placeholder='Kategori'
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />

            <Button title='Kaydet' onPress={handleSave} />
        </View>
    );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
        color: colors.text,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 6,
        padding: spacing.small,
        marginBottom: spacing.small,
    },
});