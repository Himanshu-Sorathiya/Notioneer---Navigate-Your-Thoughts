import Icon from "../Icon.tsx";

function EditorPaneHeaderSkeleton() {
  return (
    <div className="border-b-surface flex flex-col gap-3 border-b pb-3">
      <div className="bg-mark h-8 w-3/4 animate-pulse rounded-sm" />

      <div className="grid grid-cols-[1fr_4fr] items-center gap-2">
        <div className="flex items-center gap-1.5">
          <Icon id="icon-tag" className="size-5"></Icon>

          <span className="text-gray-300">Tags</span>
        </div>

        <div className="bg-mark h-5 w-1/3 animate-pulse rounded-sm" />
      </div>

      <div className="grid grid-cols-[1fr_4fr] items-center gap-2">
        <div className="flex items-center gap-1.5">
          <Icon id="icon-clock" className="size-5"></Icon>

          <span className="text-gray-300">Last Edited</span>
        </div>

        <div className="bg-mark h-5 w-1/2 animate-pulse rounded-sm" />
      </div>
    </div>
  );
}

export default EditorPaneHeaderSkeleton;
