import { useCallback, useRef, useState } from "react";
import * as RN from "react-native";
import { SCROLL_THRESHOLD } from "../constants";

export const useScrollToTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const flatListRef = useRef<RN.FlatList>(null);
  const scrollYRef = useRef(0);

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    scrollYRef.current = 0;
    setShowScrollToTop(false);
  }, []);

  const handleScroll = useCallback(
    (event: RN.NativeSyntheticEvent<RN.NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      scrollYRef.current = currentScrollY;

      const shouldShowButton = currentScrollY > SCROLL_THRESHOLD;
      setShowScrollToTop(shouldShowButton);
    },
    []
  );

  const resetScrollPosition = useCallback(() => {
    if (scrollYRef.current !== 0) {
      scrollToTop();
    }
  }, [scrollToTop]);

  const forceScrollToTop = useCallback(() => {
    scrollToTop();
  }, [scrollToTop]);

  return {
    showScrollToTop,
    flatListRef,
    scrollYRef,
    scrollToTop,
    handleScroll,
    resetScrollPosition,
    forceScrollToTop,
  };
};
