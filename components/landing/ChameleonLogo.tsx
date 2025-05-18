'use client';

import Image from 'next/image';

const FeatherIcon = ({ size = 80 }: { size?: number }) => (
  <div className="chameleon-logo">
    <Image
      src="/camelon_logo.png"
      alt="Logo Camelon"
      width={size}
      height={size}
      priority
      style={{ transition: 'all 0.4s ease' }}
    />
    <style jsx>{`
      .chameleon-logo {
        animation: hueShift 6s infinite linear;
        display: inline-block;
      }

      @keyframes hueShift {
        0% {
          filter: hue-rotate(0deg);
        }
        50% {
          filter: hue-rotate(180deg);
        }
        100% {
          filter: hue-rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default FeatherIcon;