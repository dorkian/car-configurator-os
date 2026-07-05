import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface Props {
  messages: string[];
  onDismiss: () => void;
}

export default function RecoveryBanner({ messages, onDismiss }: Props) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const visible = messages.length > 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="recovery-toast"
          role="status"
          aria-live="polite"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="recovery-toast__content">
            <span className="recovery-toast__icon" aria-hidden>ℹ</span>
            <div className="recovery-toast__messages">
              <p className="recovery-toast__heading">{t('recovery.heading')}</p>
              <ul className="recovery-toast__list">
                {messages.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            className="recovery-toast__dismiss"
            onClick={onDismiss}
            aria-label={t('recovery.dismiss')}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
