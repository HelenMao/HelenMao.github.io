const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    }
  },
  {
    threshold: 0.14,
  }
);

document.querySelectorAll(".reveal").forEach((node) => {
  observer.observe(node);
});

const filters = document.querySelectorAll(".pub-filter");
const groups = document.querySelectorAll(".publication-year-group");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((node) => {
      node.classList.toggle("is-active", node === button);
    });

    groups.forEach((group) => {
      let visibleCount = 0;
      const items = group.querySelectorAll(".publication-item");

      items.forEach((item) => {
        const itemType = item.dataset.type;
        const visible = filter === "all" || itemType === filter;
        item.hidden = !visible;
        if (visible) {
          visibleCount += 1;
        }
      });

      group.hidden = visibleCount === 0;
    });
  });
});
