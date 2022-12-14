import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({value, onChange}) => {
  return (
    <label className={css.filterLabel}>
      Find contacts by name
      <input className={css.filterInput} type="text" value={value} onChange={onChange}/>
    </label>

  )
}

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
