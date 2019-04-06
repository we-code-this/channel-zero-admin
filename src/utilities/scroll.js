const scrollToTop = () => {
  document
    .getElementById("pageContentContainer")
    .scrollTo({ top: 0, behavior: "smooth" });
};

export { scrollToTop };
