import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

import { Input } from "galio-framework";

import { styleTheme } from "../constants";

class CustomInput extends React.Component {
  render() {
    const { shadowless, success, error } = this.props;

    const inputStyles = [
      styles.input,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,
      {...this.props.style}
    ];

    return (
      <Input
        placeholder="write something here"
        placeholderTextColor={styleTheme.COLORS.MUTED}
        style={inputStyles}
        color={styleTheme.COLORS.HEADER}
        // iconContent={
        //   <Icon
        //     size={14}
        //     color={styleTheme.COLORS.ICON}
        //     name="link"
        //     family="AntDesign"
        //   />
        // }
        {...this.props}
      />
    );
  }
}

CustomInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false
};

CustomInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: styleTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF'
  },
  success: {
    borderColor: styleTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: styleTheme.COLORS.INPUT_ERROR,
  },
  shadow: {
    shadowColor: styleTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  }
});

export default CustomInput;
