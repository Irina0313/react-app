import { useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../store';
import styles from './AutocompleteCountry.module.css';

const AutocompleteCountry = () => {
  const countries = useAppSelector((state: RootState) => state.countries);

  return (
    <div className={styles.autocompleteContainer}>
      <datalist id="countryList">
        <div>
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </div>
      </datalist>
    </div>
  );
};

export default AutocompleteCountry;
