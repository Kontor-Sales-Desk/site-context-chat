import React, { useEffect, useId, useRef, useState } from 'react';
import ChatBubbleIcon from './ChatBubbleIcon';

const ORBIT_LABEL = 'LAUNCH YOUR PROJECT';
const TYPE_INTERVAL_MS = 38;
const DRAG_THRESHOLD_PX = 6;

/** Keep in sync with `.scc-chat-fab` / `.scc-chat-fab__orbit` in styles.css */
const BUTTON_REM = 3.75;
const ORBIT_REM = 7.75;
const ORBIT_GAP_REM = 0.32;
const VIEWBOX = 100;
const CENTER = VIEWBOX / 2;

const buttonRadiusVb = CENTER * (BUTTON_REM / ORBIT_REM);
const orbitRadiusVb = buttonRadiusVb + (ORBIT_GAP_REM / ORBIT_REM) * VIEWBOX;
const ORBIT_PATH_D = `M ${CENTER},${CENTER - orbitRadiusVb} a ${orbitRadiusVb},${orbitRadiusVb} 0 1,1 -0.01,0`;
/** 9 o'clock on a clockwise path from the top */
const ORBIT_START_OFFSET = '75%';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return reduced;
}

function useOrbitTypewriter(active, text, reducedMotion) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!active) {
      setTyped('');
      return undefined;
    }

    if (reducedMotion) {
      setTyped(text);
      return undefined;
    }

    let index = 0;
    setTyped('');

    const timer = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, TYPE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [active, text, reducedMotion]);

  return typed;
}

function clampFabPosition(position, wrapEl) {
  const width = wrapEl?.offsetWidth ?? 0;
  const height = wrapEl?.offsetHeight ?? 0;
  const maxX = Math.max(0, window.innerWidth - width);
  const maxY = Math.max(0, window.innerHeight - height);
  return {
    x: Math.max(0, Math.min(maxX, position.x)),
    y: Math.max(0, Math.min(maxY, position.y)),
  };
}

export default function ChatFab({
  onClick,
  accent = '#5DA399',
  label = 'Open chat',
  orbitLabel = ORBIT_LABEL,
  iconSrc,
  fabVariant = 'default',
  showOrbit,
  position,
  onPositionChange,
  draggable = false,
  zIndex,
}) {
  const pathId = useId().replace(/:/g, '');
  const wrapRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);
  const didDragRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();
  const orbitEnabled = showOrbit ?? (fabVariant === 'default' && !iconSrc);
  const typed = useOrbitTypewriter(hovered && !dragging && orbitEnabled, orbitLabel, reducedMotion);
  const isTyping = hovered && !dragging && orbitEnabled && typed.length < orbitLabel.length;
  const orbitText = isTyping ? `${typed}▍` : typed;
  const isPositioned = draggable && position && onPositionChange;

  useEffect(() => {
    if (!isPositioned || !position) return undefined;

    const onResize = () => {
      onPositionChange(clampFabPosition(position, wrapRef.current));
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isPositioned, onPositionChange, position]);

  const handlePointerDown = (event) => {
    if (!isPositioned || event.button !== 0) return;

    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startLeft: position.x,
      startTop: position.y,
    };
    didDragRef.current = false;

    const onMove = (moveEvent) => {
      if (!dragRef.current) return;
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      if (!didDragRef.current && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;

      didDragRef.current = true;
      setDragging(true);
      onPositionChange(
        clampFabPosition(
          {
            x: dragRef.current.startLeft + dx,
            y: dragRef.current.startTop + dy,
          },
          wrapRef.current,
        ),
      );
    };

    const onUp = () => {
      dragRef.current = null;
      setDragging(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
    };

    document.body.style.userSelect = 'none';
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
  };

  const handleClick = () => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    onClick?.();
  };

  const wrapClassName = [
    'scc-chat-fab-wrap',
    isPositioned ? 'scc-chat-fab-wrap--positioned' : '',
    isPositioned ? 'scc-chat-fab-wrap--draggable' : '',
    dragging ? 'scc-chat-fab-wrap--dragging' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapStyle = {
    '--scc-fab-accent': accent,
    ...(isPositioned ? { left: `${position.x}px`, top: `${position.y}px` } : {}),
    ...(zIndex != null ? { zIndex } : {}),
  };

  return (
    <div
      ref={wrapRef}
      className={wrapClassName}
      style={wrapStyle}
      data-sales-desktop-hit={isPositioned ? '' : undefined}
      onPointerDown={isPositioned ? handlePointerDown : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHovered(false);
        }
      }}
    >
      {orbitEnabled ? (
        <svg
          className={`scc-chat-fab__orbit${hovered && !dragging ? ' scc-chat-fab__orbit--visible' : ''}`}
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          aria-hidden
        >
          <defs>
            <path id={pathId} d={ORBIT_PATH_D} fill="none" />
          </defs>
          <text className="scc-chat-fab__orbit-text" style={{ '--scc-fab-accent': accent }}>
            <textPath href={`#${pathId}`} startOffset={ORBIT_START_OFFSET} side="left">
              {orbitText}
            </textPath>
          </text>
        </svg>
      ) : null}

      <button
        type="button"
        onClick={handleClick}
        className={[
          'scc-chat-fab',
          iconSrc && fabVariant !== 'pipeline' ? ' scc-chat-fab--avatar' : '',
          fabVariant === 'pipeline' ? ' scc-chat-fab--pipeline' : '',
        ]
          .join('')
          .trim()}
        style={{ '--scc-fab-accent': accent }}
        title={isPositioned ? `${label} — drag to move` : label}
        aria-label={label}
      >
        {fabVariant !== 'pipeline' ? <span className="scc-chat-fab__ring" aria-hidden /> : null}
        {!iconSrc && fabVariant !== 'pipeline' ? (
          <span className="scc-chat-fab__glow" aria-hidden />
        ) : null}
        {iconSrc ? (
          <img
            src={iconSrc}
            alt=""
            className={`scc-chat-fab__avatar${
              fabVariant === 'pipeline' ? ' scc-chat-fab__avatar--icon' : ''
            }`}
            draggable={false}
          />
        ) : (
          <ChatBubbleIcon className="scc-chat-fab__icon" />
        )}
      </button>
    </div>
  );
}
