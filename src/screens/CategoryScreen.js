import React, { useEffect, useState } from 'react';
import spacing from '../theme/spacing';
import colors from '../theme/colors';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native';
import fonts from '../theme/fonts';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CategoryScreen = ({ navigation, route }) => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const mode = route.params?.mode || 'filter';

    const defaultCategories = {
        tr: ['Gıda', 'Ulaşım', 'Eğlence', 'Kişisel Bakım', 'Sağlık'],
        en: ['Food', 'Transport', 'Entertainment', 'Personal Care', 'Health'],
    };

    const loadCategories = async () => {
        try {
            const storedCategories = await AsyncStorage.getItem('categories');
            if (storedCategories) {
                setCategories(JSON.parse(storedCategories));
            } else {
                setCategories(defaultCategories[i18n.locale] || []);
            }
        } catch (error) {
            console.log('Kategoriler yüklenirken hata oluştu:', error);
            setCategories(defaultCategories[i18n.locale] || []);
        }
    };

    const saveCategories = async (updatedCategories) => {
        try {
            await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
        } catch (error) {
            console.log('Kategoriler kaydedilirken hata oluştu', error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, [i18n.locale]);

    const addCategory = () => {
        if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory.trim()];
            setCategories(updatedCategories);
            saveCategories(updatedCategories);
            setNewCategory('');
        }
    };

    const handleCategorySelect = (category) => {
        if (mode === 'select') {
            navigation.navigate('AddExpense', {
                selectedCategory: category,
                title: route.params?.title,
                amount: route.params?.amount,
                date: route.params?.date,
            });
        } else {
            navigation.navigate('Home', { filterCategory: category });
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{i18n.t('category')}</Text>
            </View>

            <View style={styles.listContainer}>
                {categories.length === 0 && (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: colors.text }}>
                        {i18n.t('noCategories')}
                    </Text>
                )}
            </View>

            <FlatList
                data={categories}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleCategorySelect(item)}
                        style={[
                            styles.categoryItem,
                            { backgroundColor: colors[item] || colors.primary },
                        ]}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            <TextInput
                placeholder={i18n.t('addCategory')}
                value={newCategory}
                onChangeText={setNewCategory}
                style={styles.input}
                placeholderTextColor={colors.text}
            />
            <View style={styles.buttonContainer}>
                <Button title={i18n.t('addExpense')} onPress={addCategory} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title={i18n.t('backHome')} onPress={() => navigation.navigate('Home')} />
            </View>
        </SafeAreaView>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: fonts.xl,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
        color: colors.text,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.large,
        marginBottom: spacing.medium,
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
    categoryItem: {
        padding: spacing.medium,
        backgroundColor: colors.primary,
        marginBottom: spacing.small,
        borderRadius: 8,
    },
    categoryText: {
        color: '#fff',
        fontSize: fonts.large,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        padding: spacing.small,
        marginBottom: spacing.small,
        borderRadius: 6,
        color: colors.text,
    },
    buttonContainer: {
        marginTop: spacing.small,
    },
});