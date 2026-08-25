import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const logoMark = "/assets/logo-mark.png";

interface LoadingScreenProps {
  /** Called once the exit animation has fully finished. */
  onFinish?: () => void;
  /** Minimum time the loader stays visible, in ms. */
  minDuration?: number;
}

export default function LoadingScreen({ onFinish, minDuration = 1800 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(pct);

      if (elapsed < minDuration) {
        raf = requestAnimationFrame(tick);
      } else {
        setIsVisible(false);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [minDuration]);

  return (
    <AnimatePresence {...(onFinish ? { onExitComplete: onFinish } : {})}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            <motion.img
              src={logoMark}
              alt="Logo"
              className="h-16 w-16 select-none sm:h-20 sm:w-20"
              draggable={false}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />

            <div className="mt-6 h-[2px] w-40 overflow-hidden rounded-full bg-white/10 sm:w-56">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #C99A4A 0%, #F4D999 100%)",
                  width: `${progress}%`,
                }}
                transition={{ ease: "linear" }}
              />
            </div>

            <p className="mt-3 text-[11px] font-medium tabular-nums text-[#D7E2EA]/50 sm:text-xs">
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
