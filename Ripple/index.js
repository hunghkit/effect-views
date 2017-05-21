import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, Easing, Platform } from 'react-native';

export const rippleView = (Component, args = {}) => {
  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      position: 'relative',
    },
    reset: {
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    }
  });

  class NewComponent extends PureComponent {
    static propTypes = {
      onPress: React.PropTypes.func,
      style: View.propTypes.style,
    };

    static defaultProps = {
      onPress: () => {},
    };

    constructor(props, context) {
      super(props, context);
      const color = args.color || 'black';
      const maxOpacity = args.opacity || 0.12;
      this.duration = args.duration || 200;

      this.state = {
        color,
        maxOpacity,
        layout: {},
        scaleValue: new Animated.Value(0.01),
        opacityValue: new Animated.Value(maxOpacity),
      };

      this.renderRippleView = this.renderRippleView.bind(this);
      this.onLayout = this.onLayout.bind(this);
      this.onPressedIn = this.onPressedIn.bind(this);
      this.onPressedOut = this.onPressedOut.bind(this);
    }

    onLayout(e) {
      const native = e.nativeEvent.layout;
      const { layout } = this.state;
      if (layout.width !== native.width || layout.height !== native.height) {
        this.setState({ layout: native });
      }
    }

    onPressedIn() {
      Animated.timing(this.state.scaleValue, {
        toValue: 1,
        duration: this.duration || 200,
        easing: Easing.bezier(0.0, 0.0, 0.0, 1),
        useNativeDriver: Platform.OS === 'android',
      }).start();
    }

    onPressedOut() {
      Animated.timing(this.state.opacityValue, {
        toValue: 0,
        useNativeDriver: Platform.OS === 'android',
      }).start(() => {
        this.state.scaleValue.setValue(0.01);
        this.state.opacityValue.setValue(this.state.maxOpacity);
      });
    }

    renderRippleView() {
      const { layout, color } = this.state;
      if (!layout.width || !layout.height) return null;

      const { scaleValue, opacityValue } = this.state;
      const rippleRadius = layout.width * 1.5;

      return (
        <Animated.View
          style={{
            position: 'absolute',
            opacity: opacityValue,
            top: -layout.height * 0.1,
            left: -layout.width * 0.1,
            width: layout.width * 1.2,
            height: layout.height * 1.2,
            backgroundColor: color || 'black',
            borderTopLeftRadius: rippleRadius,
            borderTopRightRadius: rippleRadius,
            borderBottomLeftRadius: rippleRadius,
            borderBottomRightRadius: rippleRadius,
            transform: [{ scale: scaleValue }],
          }}
        />
      );
    }

    render() {
      const { style, ...args } = this.props;
      const backgroundColor = { backgroundColor: 'transparent' }

      return (
        <TouchableWithoutFeedback
          onLayout={this.onLayout}
          onPress={this.props.onPress}
          onPressIn={this.onPressedIn}
          onPressOut={this.onPressedOut}
          onLongPress={this.onPressedOut}
        >
          <View style={[styles.container, style]}>
            {this.renderRippleView()}
            <Component {...args} style={[style, backgroundColor, styles.reset]} />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  return NewComponent;
};

export const RippleView = rippleView(View);
