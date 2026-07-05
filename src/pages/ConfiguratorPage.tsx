import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useBuildStore } from '../app/store/useBuildStore';
import { getCarBySlug, getTrims } from '../services/catalog.service';
import { decodeBuild, encodeBuild } from '../lib/url-state/codec';
import { formatPrice } from '../lib/formatters/price';
import { useMediaQuery } from '../hooks/useMediaQuery';
import ImagePreview from '../components/configurator/ImagePreview';
import TrimSelector from '../components/configurator/TrimSelector';
import ColorSelector from '../components/configurator/ColorSelector';
import WheelSelector from '../components/configurator/WheelSelector';
import InteriorSelector from '../components/configurator/InteriorSelector';
import PackageSelector from '../components/configurator/PackageSelector';
import PriceRoll from '../components/configurator/PriceRoll';
import RecoveryBanner from '../components/configurator/RecoveryBanner';
import ThemeToggle from '../components/configurator/ThemeToggle';
import LanguageToggle from '../components/configurator/LanguageToggle';
import '../styles/configurator.css';

const WIDE_QUERY = '(min-width: 1200px)';

export type Category = 'trim' | 'color' | 'wheels' | 'interior' | 'packages';

const CATEGORY_IDS: Category[] = ['trim', 'color', 'wheels', 'interior', 'packages'];

export default function ConfiguratorPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>('trim');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isWide = useMediaQuery(WIDE_QUERY);
  const reduceMotion = useReducedMotion();

  const {
    build,
    hydrate,
    resetBuild,
    setTrim,
    setColor,
    setWheel,
    setInterior,
    togglePackage,
    availableColors,
    availableWheels,
    availableInteriors,
    availablePackages,
    priceSummary,
    recoveryMessages,
    clearRecoveryMessages,
  } = useBuildStore();

  const car = slug ? getCarBySlug(slug) : undefined;

  useEffect(() => {
    if (!car) {
      navigate('/404', { replace: true });
      return;
    }
    const param = searchParams.get('b');
    if (param) {
      const decoded = decodeBuild(param);
      if (decoded && decoded.carId === car.id) {
        hydrate(decoded);
        return;
      }
    }
    resetBuild(car.slug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car?.id]);

  // Close the drawer on Escape or on outside click.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [drawerOpen]);

  if (!car) return null;

  const colors = availableColors();
  const wheels = availableWheels();
  const interiors = availableInteriors();
  const packages = availablePackages();
  const summary = priceSummary();
  const selectedColor = colors.find((c) => c.id === build.colorId);
  const selectedWheel = wheels.find((w) => w.id === build.wheelId);
  const selectedInterior = interiors.find((i) => i.id === build.interiorId);
  const trims = getTrims(car.id);
  const activeTrim = trims.find((tr) => tr.id === build.trimId);

  const categoryLabels: Record<Category, string> = {
    trim: t('categories.trim'),
    color: t('categories.color'),
    wheels: t('categories.wheels'),
    interior: t('categories.interior'),
    packages: t('categories.packages'),
  };

  const currentSelectionLabel: Record<Category, string> = {
    trim: activeTrim?.name ?? '—',
    color: selectedColor?.name ?? '—',
    wheels: selectedWheel?.name ?? '—',
    interior: selectedInterior?.name ?? '—',
    packages: build.packageIds.length === 0
      ? t('categories.packagesNone')
      : t('categories.packagesSelected', { count: build.packageIds.length }),
  };

  const handleCategoryClick = (catId: Category) => {
    if (activeCategory === catId && drawerOpen) {
      setDrawerOpen(false);
    } else {
      setActiveCategory(catId);
      setDrawerOpen(true);
    }
  };

  if (!summary) {
    return (
      <div className="configurator-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: 'var(--color-neutral-500)' }}>{t('common.loading')}</p>
      </div>
    );
  }

  const stageStyle = selectedColor
    ? ({ '--stage-tint': `${selectedColor.hex}1a` } as React.CSSProperties)
    : undefined;

  return (
    <div className="stage-shell" style={stageStyle}>
      <div className="stage-spotlight-layer" aria-hidden />

      <nav className="config-nav config-nav--floating">
        <Link to="/" className="config-nav__wordmark">{car.name}</Link>
        <span className="config-nav__model">{t('nav.configuratorLabel')}</span>
        <div className="toggle-group">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>

      <div className="stage-car">
        <ImagePreview
          car={car}
          activeCategory={activeCategory}
          selectedColor={selectedColor}
          selectedWheel={selectedWheel}
          selectedInterior={selectedInterior}
        />
      </div>

      <p className="stage-disclaimer">{t('disclaimer.short')}</p>

      <RecoveryBanner messages={recoveryMessages} onDismiss={clearRecoveryMessages} />

      {/* Bottom dock */}
      <div className="stage-dock">
        <div className="stage-dock__categories" aria-label={t('nav.categoryNavLabel')}>
          {CATEGORY_IDS.map((catId) => (
            <button
              key={catId}
              className={`dock-tab${activeCategory === catId && drawerOpen ? ' dock-tab--active' : ''}`}
              onClick={() => handleCategoryClick(catId)}
              aria-pressed={activeCategory === catId && drawerOpen}
            >
              <span className="dock-tab__label">{categoryLabels[catId]}</span>
              <span className="dock-tab__current">{currentSelectionLabel[catId]}</span>
            </button>
          ))}
        </div>

        {activeCategory === 'color' && (
          <div className="stage-dock__swatches" aria-hidden={drawerOpen}>
            {colors.map((c) => (
              <button
                key={c.id}
                className={`dock-swatch${build.colorId === c.id ? ' dock-swatch--active' : ''}`}
                style={{ background: c.hex }}
                onClick={() => setColor(c.id)}
                aria-label={c.name}
                aria-pressed={build.colorId === c.id}
              />
            ))}
          </div>
        )}

        <div className="stage-dock__price">
          <span className="stage-dock__price-label">{t('common.total')}</span>
          <PriceRoll className="stage-dock__price-value" value={formatPrice(summary.totalPrice, i18n.language)} />
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            ref={drawerRef}
            className="stage-drawer stage-drawer--open"
            role="dialog"
            aria-modal="false"
            aria-label={categoryLabels[activeCategory]}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : isWide
                  ? { x: '100%', opacity: 0.8 }
                  : { y: '100%', opacity: 0.8 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : isWide
                  ? { x: '100%', opacity: 0.8 }
                  : { y: '100%', opacity: 0.8 }
            }
            transition={{ duration: reduceMotion ? 0.15 : 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stage-drawer__header">
              <span className="stage-drawer__title">{categoryLabels[activeCategory]}</span>
              <button className="stage-drawer__close" onClick={() => setDrawerOpen(false)} aria-label={t('drawer.close')}>
                ✕
              </button>
            </div>
            <div className="stage-drawer__content">
              {activeCategory === 'trim' && (
                <TrimSelector trims={trims} selectedTrimId={build.trimId} onSelect={setTrim} />
              )}
              {activeCategory === 'color' && (
                <ColorSelector colors={colors} selectedColorId={build.colorId} onSelect={setColor} />
              )}
              {activeCategory === 'wheels' && (
                <WheelSelector wheels={wheels} selectedWheelId={build.wheelId} onSelect={setWheel} />
              )}
              {activeCategory === 'interior' && (
                <InteriorSelector interiors={interiors} selectedInteriorId={build.interiorId} onSelect={setInterior} />
              )}
              {activeCategory === 'packages' && (
                <PackageSelector
                  packages={packages}
                  selectedPackageIds={build.packageIds}
                  onToggle={togglePackage}
                />
              )}
            </div>
            <DrawerFooter carSlug={car.slug} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DrawerFooter({ carSlug }: { carSlug: string }) {
  const { t } = useTranslation();
  const build = useBuildStore((s) => s.build);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const encoded = encodeBuild(build);
    const url = `${window.location.origin}/configure/${carSlug}?b=${encoded}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="stage-drawer__footer">
      <Link to={`/summary?b=${encodeBuild(build)}`} className="btn-dark btn-dark-secondary">
        {t('priceFooter.viewBreakdown')}
      </Link>
      <button className="btn-dark btn-dark-primary" onClick={handleShare}>
        {copied ? t('priceFooter.linkCopied') : t('priceFooter.shareBuild')}
      </button>
    </div>
  );
}
