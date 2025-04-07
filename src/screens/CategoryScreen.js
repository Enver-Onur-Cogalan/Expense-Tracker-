import React, { useCallback, useEffect, useState } from 'react';
import spacing from '../theme/spacing';
import colors from '../theme/colors';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import fonts from '../theme/fonts';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const CategoryScreen = ({ navigation, route }) => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const mode = route.params?.mode || 'filter';

    const [prevLocale, setPrevLocale] = useState(i18n.locale);

    const defaultCategories = {
        tr: ['Gıda', 'Ulaşım', 'Eğlence', 'Kişisel Bakım', 'Sağlık'],
        en: ['Food', 'Transport', 'Entertainment', 'Personal Care', 'Health'],
    };

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const storedCategories = await AsyncStorage.getItem('categories');
                if (storedCategories) {
                    setCategories(JSON.parse(storedCategories));
                } else {
                    const defaults = defaultCategories[i18n.locale] || [];
                    await AsyncStorage.setItem('categories', JSON.stringify(defaults));
                    setCategories(defaults);
                }
            } catch (error) {
                console.log('Kategoriler yüklenirken hata oluştu:', error);
            }
        };

        loadCategories();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const fetchCategories = async () => {
                try {
                    const storedCategories = await AsyncStorage.getItem('categories');
                    if (storedCategories) {
                        setCategories(JSON.parse(storedCategories));
                    }
                } catch (error) {
                    console.log("Focus'ta kategori yüklenirken hata oluştu:", error);
                }
            };

            fetchCategories();
        }, [])
    );

    useEffect(() => {
        const updatedCategoriesForLanguageChange = async () => {
            try {
                const storedCategories = await AsyncStorage.getItem('categories');
                const currentCategories = storedCategories ? JSON.parse(storedCategories) : [];

                const allDefaults = [...defaultCategories['tr'], ...defaultCategories['en']];

                const userAddedCategories = currentCategories.filter(cat => !allDefaults.includes(cat));

                const newDefaults = defaultCategories[i18n.locale] || [];

                const updatedCategories = [...newDefaults, ...userAddedCategories];

                await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                setCategories(updatedCategories);
            } catch (error) {
                console.log('Dil değişiminde kategoriler güncellenirken hata oluştu:', error)
            }
        };
        updatedCategoriesForLanguageChange();
    }, [i18n.locale]);

    useEffect(() => {
        const saveCategories = async () => {
            try {
                await AsyncStorage.setItem('categories', JSON.stringify(categories));
            } catch (error) {
                console.log('Kategoriler kaydedilirken hata oluştu:', error);
            }
        };

        if (categories.length > 0) {
            saveCategories();
        }
    }, [categories]);


    const addCategory = async () => {
        if (newCategory.trim() === '') return;

        try {
            const storedCategories = await AsyncStorage.getItem('categories');
            const currentCategories = storedCategories ? JSON.parse(storedCategories) : [];

            if (!currentCategories.includes(newCategory.trim())) {
                const updatedCategories = [...currentCategories, newCategory.trim()];
                await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                setCategories(updatedCategories);
                setNewCategory('');
            }
        } catch (error) {
            console.log('Kategori eklerken hata oluştu:', error);
        }
    };



    const deleteCategory = (categoryToDelete) => {
        Alert.alert(
            i18n.t('deleteCategory'),
            i18n.t('confirmDeleteCategory'),
            [
                { text: i18n.t('cancel'), style: 'cancel' },
                {
                    text: i18n.t('delete'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const storedCategories = await AsyncStorage.getItem('categories');
                            const currentCategories = storedCategories ? JSON.parse(storedCategories) : [];

                            const updatedCategories = currentCategories.filter(cat => cat !== categoryToDelete);
                            await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
                            setCategories(updatedCategories);
                        } catch (error) {
                            console.log('Kategori silerken hata oluştu:', error);
                        }
                    }
                }
            ]
        );
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
                    <View style={[
                        styles.catergoryItemContainer,
                        { backgroundColor: colors[item] || colors.primary }
                    ]}>
                        <TouchableOpacity
                            onPress={() => handleCategorySelect(item)}
                            style={styles.categoryItem}
                        >
                            <Text style={styles.categoryText}>{item}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => deleteCategory(item)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteButtonText}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
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
    catergoryItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: spacing.medium,
        marginBottom: spacing.small,
    },
    deleteButton: {
        marginLeft: spacing.small,
    },
    deleteButtonText: {
        fontSize: fonts.large,
    },
});