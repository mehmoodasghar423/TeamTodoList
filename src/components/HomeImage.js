import React from 'react';
import { Image, StyleSheet } from 'react-native';
import images from '../images/index';

const HomeImage = () => {
  return <Image source={images.MemberHome} style={styles.image} />;
};

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
      },
});

export default HomeImage;
