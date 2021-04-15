import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-elements';


const MealtItem = (props) => {
  const { pk, title } = props;
    return (
     
        <View style={styles.item_container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
              <Text style={{ marginRight: 10, color: '#FFF', flex: 1, textAlign: 'right' }}>{title}</Text>
              <Icon color='#21303f' name='set-meal' size={18} type='MaterialIcons' />
            </View>
          <View style={{ marginRight: 5 }}>
            <Icon color='#21303f' name='left' size={17} type='antdesign' />
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  item_container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 12,
    backgroundColor:"rgba(161, 50, 157,0.6)",
    marginBottom:10,
    borderRadius: 6,
    flex: 1
  },

});
export default MealtItem;