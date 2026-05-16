const LoaderOverlay = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 transition-opacity duration-300">
      <div className="loader"></div>
    </div>
  );
};

export default LoaderOverlay;
