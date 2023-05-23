import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import Api from "./components/Api";
import {SafeAreaView} from "react-native-safe-area-context";
import LoadingPlaceholder from "./components/LoadingPlaceholder";

const API_KEY = '23798924-17f42c690434b5dec74a9c318';
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=`;
const getHits = async (query) => {
  const response = await fetch(`${API_URL}${query}`);
  const json = await response.json();
  return json.hits;
}

const useFetching = (asyncCallback) => {
  const [isHitsLoading, setIsHitsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchHits = async (...params) => {
    try {
      setIsHitsLoading(true);
      await asyncCallback(...params);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("error" + error)
    } finally {
      setIsHitsLoading(false);
    }
  };

  return [fetchHits, isHitsLoading, errorMessage];
};


export default function App() {
  const [query, setQuery] = useState('weather');
  const [hits, setHits] = useState([]);
  const [fetchHits, isHitsLoading, errorMessage] = useFetching(async () => {
    const hits = await getHits(query);
    setHits(hits)
  })

  useEffect(() => {
    fetchHits();
  }, [query]);


    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.containerSearch}>
            <Text style={styles.title}>Pixabay Gallery</Text>
          </View>
          <View style={styles.containerGallery}>
            <SearchBar value={query} onChange={(text) => {setQuery(text)}} />
            {errorMessage ?
                <Text>hitError</Text>
                :
                isHitsLoading
                    ?
                    <LoadingPlaceholder/>
                    :
                    <Gallery images={hits} />
            }

          </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSearch: {
    marginTop: 7,
    flex: 0.5,
    alignItems: "center",
  },
  containerGallery: {
    flex: 9
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
