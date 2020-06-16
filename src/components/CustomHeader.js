import React from 'react';
import { Appbar } from 'react-native-paper';

function CustomHeader({ title, subtitle, navigation, noBack }) {
  return (
    <Appbar.Header>
      {!noBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content
        title={title}
        subtitle={subtitle}
      />
    </Appbar.Header>
  )
}

export default CustomHeader