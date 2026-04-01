import type React from 'react';

type DotLottieWCProps = React.HTMLAttributes<HTMLElement> & {
  src?: string;
  autoplay?: boolean | string;
  loop?: boolean | string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': DotLottieWCProps;
    }
  }
}
