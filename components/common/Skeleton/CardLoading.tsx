const CardLoading = () => {
  return (
    <div className="card relative flex h-[400px] flex-col rounded border border-slate-800 p-5">
      <div className="absolute right-2 top-2 flex items-center gap-x-2">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <div
            aria-label="loading-skeleton"
            className="h-full w-full animate-pulse bg-gray-900"
          ></div>
        </div>
      </div>
      <div className="card-ui my-5 pt-10 pb-5">
        <div
          aria-label="loading-skeleton"
          className="h-[237px] w-full animate-pulse bg-gray-900"
        ></div>
      </div>
      <div className="card-footer mt-auto flex items-center justify-between gap-x-2">
        <h3 className="card-title text-sm font-semibold text-white">
          <div
            aria-label="loading-skeleton"
            className="h-4 w-20 animate-pulse rounded-lg bg-gray-900"
          ></div>
        </h3>
        <div
          className="flex items-center gap-x-2"
          aria-label="button-combination"
        >
          <div
            aria-label="loading-skeleton"
            className="h-6 w-16 animate-pulse rounded-lg bg-gray-900"
          ></div>
          <div
            aria-label="loading-skeleton"
            className="h-6 w-16 animate-pulse rounded-lg bg-gray-900"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
