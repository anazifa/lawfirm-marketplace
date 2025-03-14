declare module '@heroicons/react/20/solid' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
  }

  export const StarIcon: FC<IconProps>;
  export const MapPinIcon: FC<IconProps>;
  export const BriefcaseIcon: FC<IconProps>;
  export const ShieldCheckIcon: FC<IconProps>;
}

declare module '@heroicons/react/24/outline' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
  }

  export const StarIcon: FC<IconProps>;
  export const MapPinIcon: FC<IconProps>;
  export const BriefcaseIcon: FC<IconProps>;
  export const ShieldCheckIcon: FC<IconProps>;
  export const MagnifyingGlassIcon: FC<IconProps>;
  export const AdjustmentsHorizontalIcon: FC<IconProps>;
} 