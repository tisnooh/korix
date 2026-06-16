import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Overline = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase font-semibold text-[#4d8bff] ${className}`}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-[#0057FF] shadow-[0_0_10px_2px_rgba(0,87,255,0.8)]" />
    {children}
  </span>
);
