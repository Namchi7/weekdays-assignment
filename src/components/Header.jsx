import styles from "./styles/header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.logo}>WeekdayJobs</div>

        <div className={styles.dummyLink}>Dummy Link</div>
      </div>
    </div>
  );
}

export default Header;
