function SideBarTags() {
  // const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);

  // TODO
  // const tagsByArchiveStatus = useAppSelector((state) =>
  //   selectTagsByArchiveStatus(state, isArchivedView),
  // );

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <span className="text-[1rem] text-gray-500">Tags</span>

      <div className="thin-scrollbar flex h-full flex-col gap-1 overflow-y-auto pr-3 [scrollbar-gutter:stable]">
        // TODO
        {/* {isLoading
          ? [...Array(7)].map((_, i) => <SidebarTagSkeleton key={i} />)
          : tagsByArchiveStatus.map((tag) => (
              <SideBarTag key={tag} tag={tag} />
            ))} */}
      </div>
    </div>
  );
}

export default SideBarTags;
