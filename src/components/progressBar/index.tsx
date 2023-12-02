import styles from './progressBar.module.css';

interface IProgressBarProps {
  strength: number;
}

const ProgressBar = ({ strength }: IProgressBarProps) => {
  console.log(strength);
  let style = '';

  if (strength >= 0 && strength <= 0.25) {
    style = styles.tooWeak;
  }

  if (strength > 0.25 && strength <= 0.5) {
    style = styles.weak;
  }

  if (strength > 0.5 && strength <= 0.75) {
    style = styles.medium;
  }

  if (strength > 0.75) {
    style = styles.strong;
  }

  return (
    <div
      className={`${styles.line} ${strength >= 0 && styles.visible} ${
        strength >= 0 && style
      }`}
    ></div>
  );
};

export default ProgressBar;
