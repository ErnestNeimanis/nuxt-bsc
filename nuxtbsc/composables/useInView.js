export function useInView(element, callback, threshold) {
  const defaultThreshold = threshold ?? 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= defaultThreshold
        ) {
          callback();
        }
      });
    },
    { threshold: defaultThreshold }
  );

  observer.observe(element);
}

export function useNotInView(element, callback, threshold) {
  const defaultThreshold = threshold ?? 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          !entry.isIntersecting &&
          entry.intersectionRatio < defaultThreshold
        ) {
          callback();
        }
      });
    },
    { threshold: defaultThreshold }
  );

  observer.observe(element);
}
