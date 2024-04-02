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

export function useInView_v2(element, callback, threshold) {
  const defaultThreshold = threshold ?? 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= defaultThreshold
        ) {
          await callback();
        }
      });
    },
    { threshold: defaultThreshold }
  );

  observer.observe(element);
}


export function useNotInView(element, callback, threshold) {
  const defaultThreshold = threshold ?? 1;

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
