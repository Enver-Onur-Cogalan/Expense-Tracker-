import React, { useState } from 'react';
import spacing from '../theme/spacing';
import colors from '../theme/colors';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';


const CategoryScreen = ({ navigation }) => {
    const [categories, setCategories] = useState(['Gıda', 'Ulaşım', 'Eğlence']);
    const [newCategory, setNewCategory] = useState('');

    const addCategory = () => {
        if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };

    const goToCategoryExpence = (category) => {
        navigation.navigate('Home', { filterCategory: category });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kategoriler</Text>

            <FlatList
                data={categories}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => goToCategoryExpence(item)}
                        style={styles.categoryItem}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            <TextInput
                placeholder='Yeni kategori ekle'
                value={newCategory}
                onChangeText={setNewCategory}
                style={styles.input}
            />
            <Button title='Kategori Ekle' onPress={addCategory} />

            <View style={{ marginTop: spacing.large }}>
                <Button title='Ana Sayfaya Dön' onPress={() => navigation.navigate('Home')} />
            </View>
        </View>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
        color: colors.text,
    },
    categoryItem: {
        padding: spacing.medium,
        backgroundColor: colors.primary,
        marginBottom: spacing.small,
        borderRadius: 8,
    },
    categoryText: {
        color: '#fff',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        padding: spacing.small,
        marginBottom: spacing.small,
        borderRadius: 6,
    },
});