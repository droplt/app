import classNames from 'classnames';

const cardClass = classNames(
  'border',
  'shadow',
  'bg-white',
  'border-gray-300',
  'rounded-2xl',
  'p-4'
);

const Card: React.FC = ({ children }) => {
  return <div className={cardClass}>{children}</div>;
};

export default Card;
