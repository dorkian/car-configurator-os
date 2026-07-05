import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Package } from '../../types/catalog';
import { formatPrice } from '../../lib/formatters/price';
import ConfirmDialog from './ConfirmDialog';

interface Props {
  packages: Package[];
  selectedPackageIds: string[];
  onToggle: (packageId: string) => void;
}

export default function PackageSelector({ packages, selectedPackageIds, onToggle }: Props) {
  const { t, i18n } = useTranslation();
  const [pendingPackageId, setPendingPackageId] = useState<string | null>(null);

  if (packages.length === 0) return <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>{t('empty.noPackages')}</p>;

  const pendingPackage = pendingPackageId ? packages.find((p) => p.id === pendingPackageId) : undefined;
  const pendingConflictNames = pendingPackage
    ? pendingPackage.incompatibleWith
        .filter((id) => selectedPackageIds.includes(id))
        .map((id) => packages.find((p) => p.id === id)?.name ?? id)
    : [];
  const pendingConflictNamesJoined = pendingConflictNames.join(', ');

  return (
    <div className="package-grid">
      {packages.map((pkg) => {
        const isSelected = selectedPackageIds.includes(pkg.id);
        const conflictingIds = pkg.incompatibleWith.filter((id) => selectedPackageIds.includes(id));
        const hasConflict = !isSelected && conflictingIds.length > 0;
        const conflictNames = conflictingIds.map((id) => {
          const found = packages.find((p) => p.id === id);
          return found?.name ?? id;
        });

        return (
          <button
            key={pkg.id}
            className={[
              'package-card',
              isSelected ? 'package-card--selected' : '',
              hasConflict ? 'package-card--conflict' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => (hasConflict ? setPendingPackageId(pkg.id) : onToggle(pkg.id))}
            aria-pressed={isSelected}
          >
            <div className="package-card__header">
              <div className="package-card__name-row">
                <span className="package-card__checkbox" aria-hidden>
                  {isSelected && <span className="package-card__check-icon">✓</span>}
                </span>
                <span className="package-card__name">{pkg.name}</span>
              </div>
              <span className="package-card__price">+{formatPrice(pkg.priceModifier, i18n.language)}</span>
            </div>
            <p className="package-card__desc">{pkg.description}</p>
            <div className="package-card__features">
              {pkg.features.map((f) => (
                <span key={f} className="package-card__feature-pill">{f}</span>
              ))}
            </div>
            {hasConflict && (
              <p className="package-card__conflict-note">
                {t('package.conflictNote', { names: conflictNames.join(', ') })}
              </p>
            )}
          </button>
        );
      })}

      <ConfirmDialog
        open={pendingPackageId !== null}
        title={t('package.confirmTitle', { names: pendingConflictNamesJoined })}
        message={t('package.confirmMessage', {
          count: pendingConflictNames.length,
          packageName: pendingPackage?.name ?? '',
          names: pendingConflictNamesJoined,
        })}
        confirmLabel={t('package.confirmSelect', { packageName: pendingPackage?.name ?? '' })}
        cancelLabel={t('package.keepCurrent')}
        onConfirm={() => {
          if (pendingPackageId) onToggle(pendingPackageId);
          setPendingPackageId(null);
        }}
        onCancel={() => setPendingPackageId(null)}
      />
    </div>
  );
}
