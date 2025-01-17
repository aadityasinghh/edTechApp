import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

const EyeIcon: React.FC<SvgProps> = ({ width = 20, height = 20 }) => (
  <Svg
    fill="#6CB4EE"
    width={width}
    height={height}
    viewBox="-3.5 0 32 32"
  >
    <Path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></Path>
  </Svg>
);

export default EyeIcon;