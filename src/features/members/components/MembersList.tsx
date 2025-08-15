import * as RN from "react-native";
import { memo, useCallback } from "react";
import MemberCard from "./MemberCard";
import { IMember } from "../domain/entities/Member";
import { FLATLIST_CONFIG } from "../constants";

interface MembersListProps {
  data: IMember[];
  onMemberPress: (id: string) => void;
  flatListRef: React.RefObject<RN.FlatList | null>;
  onScroll: (event: RN.NativeSyntheticEvent<RN.NativeScrollEvent>) => void;
}

const MembersList: React.FC<MembersListProps> = memo(
  ({ data, onMemberPress, flatListRef, onScroll }) => {
    const renderItem = useCallback(
      ({ item }: { item: IMember }) => (
        <MemberCard member={item} onPress={() => onMemberPress(item.id)} />
      ),
      [onMemberPress]
    );

    const keyExtractor = useCallback((item: IMember) => item.id, []);

    const getItemLayout = useCallback(
      (data: any, index: number) => ({
        length: FLATLIST_CONFIG.ITEM_HEIGHT,
        offset: FLATLIST_CONFIG.ITEM_HEIGHT * index,
        index,
      }),
      []
    );

    return (
      <RN.FlatList
        data={data}
        ref={flatListRef}
        onScroll={onScroll}
        scrollEventThrottle={FLATLIST_CONFIG.SCROLL_EVENT_THROTTLE}
        keyExtractor={keyExtractor}
        initialNumToRender={FLATLIST_CONFIG.INITIAL_NUM_TO_RENDER}
        maxToRenderPerBatch={FLATLIST_CONFIG.MAX_TO_RENDER_PER_BATCH}
        windowSize={FLATLIST_CONFIG.WINDOW_SIZE}
        removeClippedSubviews
        contentContainerClassName="gap-2.5 pb-16 px-6 mt-2"
        keyboardShouldPersistTaps="handled"
        decelerationRate={FLATLIST_CONFIG.DECELERATION_RATE}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
      />
    );
  }
);

MembersList.displayName = "MembersList";

export default MembersList;
