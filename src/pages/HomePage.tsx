import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion/react';
import { getCars } from '../services/catalog.service';
import { formatPrice } from '../lib/formatters/price';
import ThemeToggle from '../components/configurator/ThemeToggle';
import LanguageToggle from '../components/configurator/LanguageToggle';
import '../styles/configurator.css';

const CLAIM_KEYS = ['liveConfigurator', 'shareableBuilds', 'conflictAware'] as const;

const CLAIM_CROPS: Record<(typeof CLAIM_KEYS)[number], { src: string; position: string }> = {
  liveConfigurator: { src: '/cars/falcon-x/angles/midnight-black-front.jpg', position: 'center 55%' },
  shareableBuilds: { src: '/cars/aureon-s/interior/cognac-nappa.jpg', position: 'center 60%' },
  conflictAware: { src: '/cars/falcon-x/wheels/19-performance.png', position: 'center' },
};

const STACK = [
  'React 18', 'TypeScript', 'Vite', 'Zustand', 'React Router v6', 'react-i18next', 'Vitest', 'CSS Custom Properties',
];

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const cars = getCars();
  const [hoveredCarId, setHoveredCarId] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setEntered(true);
      return;
    }
    const timer = setTimeout(() => setEntered(true), 1200);
    const skip = () => setEntered(true);
    window.addEventListener('pointerdown', skip, { once: true });
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('wheel', skip, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
    };
  }, [reduceMotion]);

  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing-hero">
        <motion.div
          className="landing-hero__bg"
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="landing-toggle-bar toggle-group">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="landing-hero__eyebrow">{t('home.eyebrow')}</p>

          <h1 className="landing-hero__title">
            {t('home.titleLine1')}<br />
            <em>{t('home.titleEm')}</em> {t('home.titleLine2')}
          </h1>

          <p className="landing-hero__tagline">
            {t('home.tagline')}
          </p>
        </motion.div>

        <p className="car-select-heading">{t('home.chooseCar')}</p>
        <motion.div
          className="car-pair"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={entered ? { opacity: 1, scale: 1 } : (reduceMotion ? { opacity: 1 } : {})}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {cars.map((car) => (
            <Link
              key={car.id}
              to={`/configure/${car.slug}`}
              className={[
                'car-pair__card',
                hoveredCarId && hoveredCarId !== car.id ? 'car-pair__card--dimmed' : '',
                hoveredCarId === car.id ? 'car-pair__card--focused' : '',
              ].filter(Boolean).join(' ')}
              onMouseEnter={() => setHoveredCarId(car.id)}
              onMouseLeave={() => setHoveredCarId(null)}
              onFocus={() => setHoveredCarId(car.id)}
              onBlur={() => setHoveredCarId(null)}
            >
              <img className="car-pair__thumb" src={car.heroImage} alt={car.name} />
              <span className="car-pair__name">{car.name}</span>
              <span className="car-pair__tagline">{car.tagline}</span>
              <span className="car-pair__price">{t('home.fromPrice', { price: formatPrice(car.basePrice, i18n.language) })}</span>
            </Link>
          ))}
        </motion.div>

        <div className="landing-hero__cta-group">
          <a
            href="https://github.com/your-username/car-configurator-os"
            className="btn-dark btn-dark-secondary"
            style={{ padding: 'var(--space-4) var(--space-8)', fontSize: 'var(--font-size-base)', borderRadius: 'var(--radius-lg)' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('home.viewGithub')}
          </a>
        </div>

        <p className="landing-hero__badge">{t('home.badge')}</p>
      </section>

      {/* Engineering claim strip */}
      <section className="claim-strip">
        <p className="claim-strip__heading">{t('home.featuresHeading')}</p>
        <div className="claim-strip__track">
          {CLAIM_KEYS.map((key, index) => (
            <motion.div
              key={key}
              className="claim-strip__item"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="claim-strip__crop">
                <img
                  src={CLAIM_CROPS[key].src}
                  alt=""
                  aria-hidden
                  style={{ objectPosition: CLAIM_CROPS[key].position }}
                />
              </div>
              <div className="claim-strip__body">
                <h3 className="claim-strip__title">{t(`home.features.${key}.title`)}</h3>
                <p className="claim-strip__desc">{t(`home.features.${key}.desc`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Screenshots placeholder */}
      <section className="screenshots">
        <p className="screenshots__heading">{t('home.screenshotsHeading')}</p>
        <div className="screenshots__placeholder">
          <span style={{ fontSize: '2rem' }}>📸</span>
          <span>{t('home.screenshotsPlaceholder')}</span>
        </div>
      </section>

      {/* Tech stack */}
      <section className="landing-stack">
        <p className="landing-stack__heading">{t('home.stackHeading')}</p>
        <div className="landing-stack__pills">
          {STACK.map((s) => (
            <span key={s} className="stack-pill">{s}</span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>{t('home.footer')}</p>
        <p className="landing-footer__disclaimer">{t('home.footerDisclaimer')}</p>
      </footer>
    </div>
  );
}
