import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}

const Bookmark: React.FC<IconProps> = ({
  width = 25,
  height = 25,
  stroke = '#6177EE',
  strokeWidth = 1.5,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </Svg>
);

export default Bookmark;
