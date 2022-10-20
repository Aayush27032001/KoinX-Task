import { createPortal } from "react-dom";
import styles from "./ModalContainer.module.scss";
export default function ModalContainer({ children }) {
  return createPortal(
    <div className={styles.modalContainer}>{children}</div>,
    document.getElementById("modal-root")
  );
}
