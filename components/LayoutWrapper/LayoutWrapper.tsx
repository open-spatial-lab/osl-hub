import React from "react";
import styles from './LayoutWrapper.module.css';

interface LayoutWrapperProps {
    children: React.ReactNode;
}
export function LayoutWrapper({children}: LayoutWrapperProps) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
}