import React from 'react';
import { Image, StyleSheet } from 'react-native';
import images from '../images/index';

const WelcomeImage = () => {
  return <Image source={images.Welcome} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
});

export default WelcomeImage;
