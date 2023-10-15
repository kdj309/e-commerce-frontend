import ShimmerCard from "./ShimmerCard";
import styles from "../css/ShimmerContainer.module.css";

const ShimmerCardContainer = () => {
    return (
      <div className={`${styles.itemscontainer}`}>
        {new Array(12).fill(1).map((item, index) => {
          return <ShimmerCard key={`${item}${index}`} />;
        })}
      </div>
    );
  };
export default ShimmerCardContainer