import clsx from 'clsx';

export const SkeletonCard = ({
  isLoading = true,
  className,
  type = 'card',
}: {
  isLoading?: boolean;
  className?: string;
  type?: string;
}) => {
  return (
    <div
      className={clsx('rounded-2xl bg-gray-900/80 p-4', className, {
        'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent':
          isLoading,
      })}
    >
      {type == 'card' && (
        <div className="space-y-3">
          <div className="h-[17vw] rounded-lg bg-zinc-700" />
          <div className="h-3 w-11/12 rounded-lg bg-zinc-700" />
          <div className="h-3 w-8/12 rounded-lg bg-zinc-700" />
        </div>
      )}
    </div>
  );
};
