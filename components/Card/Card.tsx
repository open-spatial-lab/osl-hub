import clsx from "clsx";
import styles from "./Card.module.css";

interface CardProps {
  className?: string;
  style?: React.CSSProperties;
}
export function Card({
  className,
  children,
  style={},
}: React.PropsWithChildren<CardProps>) {
  return (
    <div className={clsx(styles.card, className && className)} style={style}>
      {children}
    </div>
  );
}
