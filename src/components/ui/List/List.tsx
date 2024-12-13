import React, { useState } from 'react';
import { FixedSizeList } from 'react-window';
import './List.scss';
import Loader from '@/components/ui/Loader/Loader';

type ListProps<T> = {
  items: T[];
  loadMore: () => Promise<void>;
  layout: 'grid' | 'list';
  height: number;
  width: number;
  itemSize: number;
  renderItem: (item: T, index: number) => JSX.Element;
};

const List = <T,>({
  items,
  loadMore,
  layout,
  height,
  width,
  itemSize,
  renderItem,
}: ListProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const onItemsRendered = async ({ visibleStopIndex }: { visibleStopIndex: number }) => {
    if (visibleStopIndex >= items.length - 1 && !isLoading) {
      setIsLoading(true);
      await loadMore();
      setIsLoading(false);
    }
  };

  const containerClass = layout === 'grid' ? 'grid-container' : 'list-container';

  return (
    <div className={`virtual-scroll-container ${containerClass}`}>
      <FixedSizeList
        height={height}
        width={width}
        itemCount={items && items.length ? items.length : 0}
        itemSize={itemSize}
        onItemsRendered={onItemsRendered}
        className="scroll"
      >
        {({ index, style }: { index: number; style: React.CSSProperties }) => (
          <div style={style}>{renderItem(items[index], index)}</div>
        )}
      </FixedSizeList>
      {isLoading && <Loader />}
    </div>
  );
};

export default List;
