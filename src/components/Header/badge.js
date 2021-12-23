import PropTypes from 'prop-types';

const Badge = ({ amount }) => {
  return (
    <div className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-primary rounded-full flex items-center justify-center animate-pulse text-white">
      {amount}
    </div>
  );
};

export default Badge;

Badge.propTypes = {
  amount: PropTypes.string,
};
