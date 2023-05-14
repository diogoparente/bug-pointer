import styles from "./nft-card.module.css";

interface NftCardProps {
  level?: number;
  tokenId?: number;
}

const NftCard: React.FC<NftCardProps> = ({ level = "10", tokenId = "1231231283129308109238129301" }) => (
  <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles["card-inner"]}>
        <div className={styles["card-front"]}>
          <div
            className="absolute left-[40px] top-[90px]"
            style={{ width: "100%", height: "100%", backgroundImage: "url(/logo.png)", backgroundSize: "cover" }}
          ></div>
          <div className="flex h-full flex-col">
            <div className="my-6 flex justify-center text-2xl font-semibold leading-tight">Hacker Pass</div>
            <div className="max-w-[150px] truncate text-xs">id: #{tokenId}</div>
            <div className="flex flex-1 flex-col justify-end">
              <div className="mt-[-20px]">Lvl: {level}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { NftCard };
