import React from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

const SearchBar = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search images"
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginHorizontal: 10,
        flex: 1,
        marginTop: 4,
    },
});

export default SearchBar;
