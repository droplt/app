import classNames from 'classnames';

import { Props } from './types';

const Text: React.FC<Props> = ({
  size = 0,
  weight = 'normal',
  level = 'primary',
  children,
}) => {
  const sizes = {
    'text-xs': size === -2,
    'text-sm': size === -1,
    'text-base': size === 0,
    'text-lg': size === 1,
    'text-xl': size === 2,
    'text-2xl': size === 3,
  };
  const weights = {
    'font-light': weight === 'light',
    'font-normal': weight === 'normal',
    'font-semibold': weight === 'medium',
  };
  const levels = {
    'text-gray-900': level === 'primary',
    'text-gray-700': level === 'secondary',
    'text-gray-500': level === 'light',
  };
  const className = classNames(sizes, weights, levels);

  return <span className={className}>{children}</span>;
};

export default Text;
