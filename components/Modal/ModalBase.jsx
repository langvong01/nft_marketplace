import React, { useEffect, useRef, useState } from 'react';
import Style from './Modal.module.css';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
const ModalBase = ({ selector, children, className }) => {
  const ref = useRef();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector); // body

    setMounted(true);
  }, [selector]);

  return mounted
    ? ReactDOM.createPortal(
        <motion.div
          className={className ? className : Style.modal_container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>,
        ref.current
      )
    : null;
};

export default ModalBase;
