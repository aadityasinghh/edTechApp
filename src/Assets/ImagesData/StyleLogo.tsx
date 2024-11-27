import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface SvgProps {
  width?: number;
  height?: number;
  style?: object;
}

const GradientCircles: React.FC<SvgProps> = ({ width = 550, height = 480, style }) => (
  <Svg width={width} height={height} viewBox="0 0 375 680" fill="none" style={style}>
    <Defs>
      <LinearGradient id="paint0_linear_15_111" x1="-412.144" y1="425.211" x2="471.634" y2="-174.752" gradientUnits="userSpaceOnUse">
        <Stop offset="0%" stopColor="#C630F8" stopOpacity="0" />
        <Stop offset="100%" stopColor="#C72FF8" stopOpacity="0.919792" />
      </LinearGradient>
      <LinearGradient id="paint1_linear_15_111" x1="-533.921" y1="-346.972" x2="42.0915" y2="557.164" gradientUnits="userSpaceOnUse">
        <Stop offset="0%" stopColor="#2F56F8" stopOpacity="0" />
        <Stop offset="100%" stopColor="#2F56F8" />
      </LinearGradient>
      <LinearGradient id="paint2_linear_15_111" x1="-559.081" y1="-411.888" x2="177.401" y2="274.297" gradientUnits="userSpaceOnUse">
        <Stop offset="0%" stopColor="#2F56F8" />
        <Stop offset="100%" stopColor="#3AF9EF" />
      </LinearGradient>
    </Defs>
    <Circle cx="9.38689" cy="3.68031" r="421.531" transform="rotate(28 9.38689 3.68031)" fill="url(#paint0_linear_15_111)" />
    <Circle cx="-112.39" cy="74.5592" r="421.531" transform="rotate(28 -112.39 74.5592)" fill="url(#paint1_linear_15_111)" />
    <Circle cx="-137.55" cy="9.64253" r="421.531" transform="rotate(28 -137.55 9.64253)" fill="url(#paint2_linear_15_111)" />
  </Svg>
);

export default GradientCircles;