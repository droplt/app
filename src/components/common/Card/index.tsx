import classNames from 'classnames';

const cardClass = classNames('border', 'border-gray-300', 'rounded-2xl', 'p-4');

const Card: React.FC = ({ children }) => {
  return <div className={cardClass}>{children}</div>;
};

export default Card;
