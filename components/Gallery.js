import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Gallery = ({ images }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => alert(`You selected ${item.tags}`)}>
            <Image style={styles.image} source={{ uri: item.previewURL }} />
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        margin: 5,
    },
});

export default Gallery;
