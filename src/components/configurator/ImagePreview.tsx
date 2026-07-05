import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { Car, Color, Wheel, Interior } from '../../types/catalog';
import type { Category } from '../../pages/ConfiguratorPage';

type Angle = '3q' | 'front' | 'side' | 'rear';

const ANGLES: Angle[] = ['3q', 'front', 'side', 'rear'];

type PreviewMode = 'exterior' | 'interior' | 'wheel';

function getPreviewMode(category: Category): PreviewMode {
  if (category === 'interior') return 'interior';
  if (category === 'wheels') return 'wheel';
  return 'exterior';
}

interface Props {
  car: Car;
  activeCategory: Category;
  selectedColor: Color | undefined;
  selectedWheel: Wheel | undefined;
  selectedInterior: Interior | undefined;
}

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction * 40,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction * -40,
  }),
};

export default function ImagePreview({ car, activeCategory, selectedColor, selectedWheel, selectedInterior }: Props) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [angle, setAngle] = useState<Angle>('3q');
  const [imgError, setImgError] = useState(false);
  const [direction, setDirection] = useState(0);
  const prevAngleIndex = useRef(ANGLES.indexOf('3q'));

  const mode = getPreviewMode(activeCategory);

  let imageSrc: string;
  let badgeLabel: string | undefined;

  if (mode === 'interior' && selectedInterior) {
    imageSrc = selectedInterior.thumbnail;
    badgeLabel = selectedInterior.name;
  } else if (mode === 'wheel' && selectedWheel) {
    imageSrc = selectedWheel.image;
    badgeLabel = `${selectedWheel.name}`;
  } else {
    imageSrc = selectedColor ? `/cars/${car.slug}/angles/${selectedColor.id}-${angle}.jpg` : car.heroImage;
    badgeLabel = selectedColor?.name;
  }

  useEffect(() => {
    setImgError(false);
  }, [imageSrc]);

  const handleAngleSelect = (next: Angle) => {
    const nextIndex = ANGLES.indexOf(next);
    setDirection(nextIndex > prevAngleIndex.current ? 1 : nextIndex < prevAngleIndex.current ? -1 : 0);
    prevAngleIndex.current = nextIndex;
    setAngle(next);
  };

  const bgGradient = selectedColor
    ? `linear-gradient(160deg, #0a0a0f 0%, ${selectedColor.hex}22 60%, ${selectedColor.hex}44 100%)`
    : 'linear-gradient(160deg, #0a0a0f 0%, #111827 100%)';

  return (
    <div className="image-preview">
      {!imgError ? (
        reduceMotion ? (
          <img
            className={`image-preview__img${mode === 'wheel' ? ' image-preview__img--contain' : ''}`}
            src={imageSrc}
            alt={
              mode === 'interior'
                ? `${car.name} — ${selectedInterior?.name ?? ''}`
                : mode === 'wheel'
                  ? `${car.name} — ${selectedWheel?.name ?? ''}`
                  : `${car.name} — ${selectedColor?.name ?? ''} — ${t(`preview.angle.${angle}`)}`
            }
            onError={() => setImgError(true)}
          />
        ) : (
          <AnimatePresence mode="popLayout" custom={mode === 'exterior' ? direction : 0}>
            <motion.img
              key={imageSrc}
              className={`image-preview__img${mode === 'wheel' ? ' image-preview__img--contain' : ''}`}
              src={imageSrc}
              custom={mode === 'exterior' ? direction : 0}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              alt={
                mode === 'interior'
                  ? `${car.name} — ${selectedInterior?.name ?? ''}`
                  : mode === 'wheel'
                    ? `${car.name} — ${selectedWheel?.name ?? ''}`
                    : `${car.name} — ${selectedColor?.name ?? ''} — ${t(`preview.angle.${angle}`)}`
              }
              onError={() => setImgError(true)}
            />
          </AnimatePresence>
        )
      ) : (
        <div
          className="image-preview__placeholder"
          style={{ background: bgGradient }}
        >
          <span className="image-preview__car-name">{car.name}</span>
          {badgeLabel && (
            <span className="image-preview__color-label">{badgeLabel}</span>
          )}
        </div>
      )}
      {badgeLabel && (
        <span className="image-preview__badge">{badgeLabel}</span>
      )}
      {mode === 'exterior' && selectedColor && !imgError && (
        <div className="image-preview__angle-switcher" role="group" aria-label={t('preview.angleSwitcherLabel')}>
          {ANGLES.map((a) => (
            <button
              key={a}
              className={`angle-btn${angle === a ? ' angle-btn--active' : ''}`}
              onClick={() => handleAngleSelect(a)}
              aria-pressed={angle === a}
            >
              {t(`preview.angle.${a}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
