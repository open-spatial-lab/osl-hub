import React from "react";
import clsx from "clsx";
import styles from './CardGrid.module.css'

interface CardProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export function CardGrid({
    children,
    className="",
    style={},
}: CardProps){
    return <div className={clsx(styles.cardGrid, className)} style={style}>{children}</div>
}