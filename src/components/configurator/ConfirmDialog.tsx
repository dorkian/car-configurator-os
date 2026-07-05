import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={ref}
      className="confirm-dialog"
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
    >
      <p className="confirm-dialog__title">{title}</p>
      <p className="confirm-dialog__message">{message}</p>
      <div className="confirm-dialog__actions">
        <button className="btn-dark btn-dark-secondary" onClick={onCancel}>
          {cancelLabel ?? t('dialog.cancel')}
        </button>
        <button className="btn-dark btn-dark-primary" onClick={onConfirm}>
          {confirmLabel ?? t('dialog.continue')}
        </button>
      </div>
    </dialog>,
    document.body
  );
}
