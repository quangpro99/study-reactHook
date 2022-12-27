import clsx from "clsx";
import styles from "./Heading.module.css";

//classnames
//clsx

function Heading({primary}) {

    const classes = clsx(styles.btn,'d-flex',{
        [styles.primary]: primary
    })
  return (
    <div>
      <h1 className={styles.heading}>Hello ae F8</h1>
      <button className={styles.btn}>CLick me!</button>
      <button className={`${styles.btn} ${styles.active}`}>CLick me!</button>
      <button className={[styles.btn, styles.active].join(' ')}>CLick me!</button>
      {/* đối số thứ 2 là object */}
      <button className={clsx(styles.btn, {
            [styles.active]: true,
            'd-flex': true
        })}>CLick me!
        </button>
        <button className={classes}>CLick me!</button>
    </div>
  );
}

export default Heading;
