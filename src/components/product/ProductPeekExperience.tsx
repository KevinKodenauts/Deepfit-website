"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ProductDetailContent from "@/components/product/ProductDetailContent";
import { mapToProductDetail } from "@/lib/api/mappers";
import { getProductDetails } from "@/lib/api/products";
import { buildProductHref } from "@/lib/productNavigation";
import {
  getCachedProductDetail,
  setCachedProductDetail,
} from "@/lib/product/productDetailCache";
import peekStyles from "@/components/product/productPeek.module.css";
import { useCatalogSync } from "@/hooks/useCatalogSync";

type ProductPeekExperienceProps = {
  initialId: number;
  productIds: number[];
};

type TouchAxis = "horizontal" | "vertical" | null;

const SWIPE_RATIO = 0.28;
const AXIS_LOCK_PX = 12;
const TRANSITION_MS = 400;
const SLIDE_GAP_PX = 10;
const TRACK_PADDING_X_RATIO = 0.06;
const PEEK_SLIDE_RATIO = 0.9;

function getSlideMetrics(trackWidth: number, slideWidthRatio: number) {
  const slideWidth = trackWidth * slideWidthRatio;
  const paddingLeft = trackWidth * TRACK_PADDING_X_RATIO;
  const step = slideWidth + SLIDE_GAP_PX;
  return { slideWidth, paddingLeft, step };
}

function getCenteredOffset(trackWidth: number, slideWidthRatio: number) {
  const { slideWidth, paddingLeft, step } = getSlideMetrics(
    trackWidth,
    slideWidthRatio,
  );
  const middleSlideCenter = paddingLeft + step + slideWidth / 2;
  return trackWidth / 2 - middleSlideCenter;
}

function getInitialIndex(initialId: number, productIds: number[]) {
  const index = productIds.indexOf(initialId);
  return index >= 0 ? index : 0;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      'button, a, input, select, textarea, label, [role="button"], [data-no-swipe]',
    ),
  );
}

function prefetchProductDetails(productIds: number[]) {
  productIds.forEach((id) => {
    if (!id || getCachedProductDetail(id)) return;

    getProductDetails(id)
      .then((data) => {
        if (!data) return;
        setCachedProductDetail(id, mapToProductDetail(data));
      })
      .catch(() => undefined);
  });
}

export default function ProductPeekExperience({
  initialId,
  productIds,
}: ProductPeekExperienceProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(getInitialIndex(initialId, productIds));
  const slideStepRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const usePeekCarousel = productIds.length > 1;

  const slideWidthRatio = PEEK_SLIDE_RATIO;

  const [isExpanded, setIsExpanded] = useState(() => productIds.length <= 1);
  const [activeIndex, setActiveIndex] = useState(() =>
    getInitialIndex(initialId, productIds),
  );
  const [offsetX, setOffsetX] = useState(0);
  const [baseOffset, setBaseOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const canSwipe = usePeekCarousel && !isExpanded;

  activeIndexRef.current = activeIndex;

  const measureTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { slideWidth, step } = getSlideMetrics(
      track.clientWidth,
      slideWidthRatio,
    );
    track.style.setProperty("--slide-width", `${slideWidth}px`);
    slideStepRef.current = step;
    setBaseOffset(getCenteredOffset(track.clientWidth, slideWidthRatio));
  }, [slideWidthRatio]);

  const updateUrl = useCallback(
    (index: number) => {
      const href = buildProductHref(productIds[index], productIds);
      window.history.replaceState(window.history.state, "", href);
    },
    [productIds],
  );

  const commitIndex = useCallback(
    (nextIndex: number, animated: boolean) => {
      const clamped = Math.max(0, Math.min(productIds.length - 1, nextIndex));
      if (clamped === activeIndexRef.current) {
        setOffsetX(0);
        setIsDragging(false);
        setIsTransitioning(false);
        isAnimatingRef.current = false;
        return;
      }

      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
      setOffsetX(0);
      setIsDragging(false);
      setIsTransitioning(animated);
      isAnimatingRef.current = animated;
      updateUrl(clamped);

      if (animated) {
        window.setTimeout(() => {
          setIsTransitioning(false);
          isAnimatingRef.current = false;
        }, TRANSITION_MS);
      } else {
        isAnimatingRef.current = false;
      }
    },
    [productIds.length, updateUrl],
  );

  const settleAfterDrag = useCallback(
    (totalDeltaX: number) => {
      const step = slideStepRef.current;
      if (!step) return;

      const threshold = step * SWIPE_RATIO;
      const current = activeIndexRef.current;

      if (totalDeltaX < -threshold && current < productIds.length - 1) {
        setIsTransitioning(true);
        isAnimatingRef.current = true;
        setOffsetX(-step);

        window.setTimeout(() => {
          commitIndex(current + 1, false);
        }, TRANSITION_MS);
        return;
      }

      if (totalDeltaX > threshold && current > 0) {
        setIsTransitioning(true);
        isAnimatingRef.current = true;
        setOffsetX(step);

        window.setTimeout(() => {
          commitIndex(current - 1, false);
        }, TRANSITION_MS);
        return;
      }

      setIsTransitioning(true);
      setOffsetX(0);
      window.setTimeout(() => {
        setIsTransitioning(false);
        isAnimatingRef.current = false;
      }, TRANSITION_MS);
    },
    [commitIndex, productIds.length],
  );

  const handleExpand = useCallback(() => {
    setOffsetX(0);
    setIsDragging(false);
    setIsTransitioning(false);
    setIsExpanded(true);
  }, []);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
    window.setTimeout(() => {
      measureTrack();
    }, TRANSITION_MS);
  }, [measureTrack]);

  useEffect(() => {
    if (!usePeekCarousel) {
      setIsExpanded(true);
      return;
    }

    setIsExpanded(false);
  }, [usePeekCarousel]);

  useLayoutEffect(() => {
    const index = getInitialIndex(initialId, productIds);
    activeIndexRef.current = index;
    setActiveIndex(index);
    setOffsetX(0);
    setIsDragging(false);
    setIsTransitioning(false);
    isAnimatingRef.current = false;
    measureTrack();
  }, [initialId, productIds, measureTrack]);

  useEffect(() => {
    if (isExpanded || !usePeekCarousel) return;

    measureTrack();
    const onResize = () => measureTrack();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isExpanded, measureTrack, usePeekCarousel]);

  useEffect(() => {
    const currentId = productIds[activeIndex];
    const neighborIds = [
      productIds[activeIndex - 1],
      productIds[activeIndex + 1],
      ...productIds.filter((id) => id !== currentId),
    ].filter((id): id is number => Boolean(id));

    prefetchProductDetails([currentId, ...neighborIds]);
  }, [activeIndex, productIds]);

  useCatalogSync(() => {
    prefetchProductDetails(productIds);
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !canSwipe) return;

    let startX = 0;
    let startY = 0;
    let axis: TouchAxis = null;
    let gestureEnded = false;
    let activePointerId: number | null = null;

    const resetGesture = () => {
      axis = null;
      gestureEnded = false;
      activePointerId = null;
    };

    const beginGesture = (clientX: number, clientY: number) => {
      if (isAnimatingRef.current) return false;
      gestureEnded = false;
      startX = clientX;
      startY = clientY;
      axis = null;
      setIsDragging(true);
      setIsTransitioning(false);
      setOffsetX(0);
      return true;
    };

    const moveGesture = (
      clientX: number,
      clientY: number,
      preventDefault?: () => void,
    ) => {
      if (isAnimatingRef.current || gestureEnded) return;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      if (!axis) {
        if (
          Math.abs(deltaX) < AXIS_LOCK_PX &&
          Math.abs(deltaY) < AXIS_LOCK_PX
        ) {
          return;
        }
        axis =
          Math.abs(deltaX) > Math.abs(deltaY) * 1.5 ? "horizontal" : "vertical";
      }

      if (axis !== "horizontal") {
        setIsDragging(false);
        return;
      }

      preventDefault?.();

      const step = slideStepRef.current || track.clientWidth * slideWidthRatio;
      const maxDrag = step * 0.72;
      const current = activeIndexRef.current;
      let clamped = deltaX;

      if (current === 0 && deltaX > 0) {
        clamped = deltaX * 0.18;
      } else if (current === productIds.length - 1 && deltaX < 0) {
        clamped = deltaX * 0.18;
      } else {
        clamped = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
      }

      setOffsetX(clamped);
    };

    const endGesture = (clientX: number) => {
      if (gestureEnded) return;
      gestureEnded = true;

      if (axis !== "horizontal" || isAnimatingRef.current) {
        setIsDragging(false);
        resetGesture();
        return;
      }

      settleAfterDrag(clientX - startX);
      resetGesture();
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      if (isInteractiveTarget(event.target)) return;
      beginGesture(event.touches[0].clientX, event.touches[0].clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      moveGesture(event.touches[0].clientX, event.touches[0].clientY, () =>
        event.preventDefault(),
      );
    };

    const onTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0]?.clientX ?? startX;
      endGesture(endX);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || activePointerId != null) return;
      if (isInteractiveTarget(event.target)) return;
      activePointerId = event.pointerId;
      if (!beginGesture(event.clientX, event.clientY)) return;
      track.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      moveGesture(event.clientX, event.clientY, () => event.preventDefault());
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
      endGesture(event.clientX);
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerEnd);
    track.addEventListener("pointercancel", onPointerEnd);

    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove, true);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerEnd);
      track.removeEventListener("pointercancel", onPointerEnd);
    };
  }, [canSwipe, productIds.length, settleAfterDrag, slideWidthRatio]);

  const currentProductId = productIds[activeIndex] ?? initialId;

  if (!usePeekCarousel) {
    return (
      <ProductDetailContent
        productId={currentProductId}
        isExpanded
        isPeekMode={false}
        siblingProductIds={productIds}
        onScrollExpand={() => {}}
      />
    );
  }

  const visibleSlots = [-1, 0, 1].map((offset) => activeIndex + offset);

  return (
    <div
      className={`${peekStyles.shell} ${isExpanded ? peekStyles.shellExpanded : ""}`}
    >
      <div className={peekStyles.shellInner}>
        <div ref={trackRef} className={peekStyles.track}>
          <div
            className={`${peekStyles.row} ${isExpanded ? peekStyles.rowExpanded : ""}`}
            style={
              isExpanded
                ? undefined
                : {
                    transform: `translateX(${baseOffset + offsetX}px)`,
                    transition:
                      isDragging || !isTransitioning
                        ? "none"
                        : `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  }
            }
          >
            {visibleSlots.map((productIndex) => {
              if (productIndex < 0 || productIndex >= productIds.length) {
                return (
                  <div
                    key={`empty-${productIndex}`}
                    className={`${peekStyles.slide} ${peekStyles.slideEmpty} ${isExpanded ? peekStyles.slideHidden : ""}`}
                    aria-hidden
                  />
                );
              }

              const id = productIds[productIndex];
              const isActive = productIndex === activeIndex;

              return (
                <div
                  key={`${id}-${productIndex}`}
                  className={`${peekStyles.slide} ${isActive ? peekStyles.slideActive : ""} ${isExpanded && isActive ? peekStyles.slideExpanded : ""} ${isExpanded && !isActive ? peekStyles.slideHidden : ""}`}
                >
                  <div
                    className={`${peekStyles.card} ${isExpanded && isActive ? peekStyles.cardExpanded : ""}`}
                  >
                    <ProductDetailContent
                      productId={id}
                      isExpanded={isExpanded && isActive}
                      isPeekMode
                      siblingProductIds={productIds}
                      onScrollExpand={
                        isActive && !isExpanded ? handleExpand : () => {}
                      }
                      onScrollCollapse={
                        isActive && isExpanded ? handleCollapse : undefined
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
