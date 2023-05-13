import styles from "./nft-card.module.css";

const NftCard = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles["card-inner"]}>
        <div className={styles["card-front"]}>front</div>
      </div>
    </div>
  </div>
);

export { NftCard };
