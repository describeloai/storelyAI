// components/FeatherIcon.tsx
'use client';

import Image from 'next/image';

const FeatherIcon = ({ size = 80 }: { size?: number }) => (
  <Image
    src="/camelon_logo.png"
    alt="Logo Camelon"
    width={size}
    height={size}
    priority
    style={{ transition: 'all 0.4s ease' }}
  />
);

export default FeatherIcon;
