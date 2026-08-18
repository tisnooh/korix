"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram, Menu, X } from "lucide-react";
import { Brand } from "@/components/Brand";
import { instagramUrl, navigation } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => openButtonRef.current?.focus({ preventScroll: true }));
    }
  }, []);

  const openMenu = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    // Let the click sequence complete before moving focus into the dialog.
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus({ preventScroll: true }), 50);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
      if (event.key === "Tab" && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
        );
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, open]);

  return (
    <header className="site-header" data-testid="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="header-instagram"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de KORIX"
          >
            <Instagram aria-hidden="true" size={19} />
          </a>
          <Link className="button button--outline header-cta" href="/contact" data-track="cta_header">
            Démarrer un projet
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <button
            ref={openButtonRef}
            className="menu-trigger"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Ouvrir le menu"
            onClick={openMenu}
            data-testid="menu-open"
          >
            <Menu aria-hidden="true" size={21} />
          </button>
        </div>
      </div>

      <div className={`menu-layer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <button className="menu-backdrop" aria-label="Fermer le menu" onClick={() => closeMenu()} />
        <div ref={panelRef} className="menu-panel" id="site-menu" role="dialog" aria-modal="true" aria-label="Menu principal">
          <div className="menu-panel-head">
            <Brand compact />
            <button
              ref={closeButtonRef}
              className="menu-trigger"
              type="button"
              aria-label="Fermer le menu"
              onClick={() => closeMenu()}
              data-testid="menu-close"
            >
              <X aria-hidden="true" size={21} />
            </button>
          </div>
          <nav className="mobile-nav" aria-label="Navigation mobile">
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => closeMenu(false)}>
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight aria-hidden="true" size={20} />
              </Link>
            ))}
          </nav>
          <a
            className="menu-instagram"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de KORIX"
          >
            <Instagram aria-hidden="true" size={19} />
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <Link className="button button--primary menu-cta" href="/contact" onClick={() => closeMenu(false)} data-track="cta_menu">
            Parler de votre projet
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
