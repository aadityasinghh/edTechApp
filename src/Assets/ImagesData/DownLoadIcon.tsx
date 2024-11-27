import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

interface IconProps {
  stroke?: string;
}

const NavbarDownloadIcon: React.FC<IconProps> = ({stroke = '#6177EE'}) => (
  <Svg width="25px" height="25px" viewBox="0 0 24 24" id="downloads">
    <Rect
      id="Rectangle_3"
      data-name="Rectangle 3"
      width="24"
      height="24"
      fill="none"
    />
    <Path
      id="Rectangle"
      d="M6,0V6H0"
      transform="translate(12 13.757) rotate(45)"
      fill="none"
      stroke={stroke}
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <Path
      id="Line"
      d="M1,8V0"
      transform="translate(11 12.5)"
      fill="none"
      stroke={stroke}
      strokeLinecap="square"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <Path
      id="Combined_Shape"
      data-name="Combined Shape"
      d="M12.994,12H16a4,4,0,0,0,0-8h0a3,3,0,0,0-4.957-2.274A4.5,4.5,0,0,0,3.256,6H3a3,3,0,0,0,0,6H6.494"
      transform="translate(2 3)"
      fill="none"
      stroke={stroke}
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </Svg>
);

export default NavbarDownloadIcon;
