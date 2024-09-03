import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import images from '../images';
const CheckBox = ({ checked, onPress, borderColor, backgroundColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.checkboxContainer,
      { borderColor: borderColor, backgroundColor: checked ? backgroundColor : 'transparent' },
    ]}
  >
    {checked && (
      <Image
        source={images.Tick} 
        style={styles.tickImage}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 28,
    height: 28,
    borderRadius: 9,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickImage: {
    width: 15,
    height: 15,
  },
});

export default CheckBox;
