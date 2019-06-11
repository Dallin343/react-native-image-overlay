import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ViewPropTypes,
  Platform,
} from "react-native";

const { width } = Dimensions.get("window");

export default class ImageOverlay extends Component {
  render() {
    const {
      blurRadius,
      children,
      containerStyle,
      contentPosition,
      height,
      overlayAlpha,
      overlayColor,
      overlayHeight,
      rounded,
      source,
      title,
      titleStyle,
      ...props
    } = this.props;

    let justifyContent;
    let overlayPosition;
    let _height = containerStyle ? containerStyle.height : height;
    let _overlayHeight = overlayHeight ? overlayHeight : height;

    if (contentPosition == "top") {
      justifyContent = "flex-start";
      overlayPosition = 0;
    } else if (contentPosition == "bottom") {
      justifyContent = "flex-end";
      overlayPosition = typeof _overlayHeight == 'string' && _overlayHeight.search('%') !== -1 ? 
        _height - ((parseFloat(_overlayHeight) / 100.0) * _height) :
        _height - parseInt(_overlayHeight);
    } else if (contentPosition == "center") {
      justifyContent = "center";
      overlayPosition = typeof _overlayHeight == 'string' && _overlayHeight.search('%') !== -1 ? 
        _height/2 - (((parseFloat(_overlayHeight) / 100.0) * _height) / 2.0) :
        _height/2 - (parseInt(_overlayHeight)/2);
    }

    return (
      <ImageBackground
        source={source}
        style={[
          styles.image,
          {
            borderRadius: rounded,
            height: height,
            justifyContent: justifyContent
          },
          containerStyle
        ]}
        blurRadius={blurRadius}
      >
        <View style={{
          height: overlayHeight ? overlayHeight : "100%",
          position: 'absolute',
          width: '100%',
          top: overlayPosition,
          justifyContent: 'center',
          alignItems: 'center',
          flex:1,
        }}>
          <View style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: overlayColor,
            opacity: overlayAlpha,
            zIndex:1,
          }}/>
          {!children &&
            title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        </View>

        {children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width,
    overflow: "hidden",
    alignItems: "center"
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    zIndex: 2,
  },
});

ImageOverlay.propTypes = {
  rounded: PropTypes.number,
  source: Image.propTypes.source,
  height: PropTypes.number,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  overlayColor: PropTypes.string,
  overlayAlpha: PropTypes.number,
  contentPosition: PropTypes.oneOf(["top", "center", "bottom"]),
  containerStyle: ViewPropTypes.style,
  blurRadius: PropTypes.number,
  children: PropTypes.element
};

ImageOverlay.defaultProps = {
  height: 300,
  overlayColor: "#000000",
  overlayAlpha: 0.5,
  contentPosition: "center"
};