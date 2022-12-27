import clsx from "clsx";
import styles from "./Paragraph.module.scss";

console.log(styles);

function Paragraph(primary, disable) {
  const classes = clsx(styles.btn, "d-flex", {
    [styles.primary]: primary,
    [styles.disable]: disable,
  });
  return (
    <>
      <h1 className={styles.paragraph}>My name is Quang</h1>
      <button className={classes}>CLick me!</button>
    </>
  );
}

export default Paragraph;
