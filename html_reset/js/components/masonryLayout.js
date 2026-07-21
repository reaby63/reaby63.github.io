function initMasonry() {

    const grid = document.querySelector(".masonry-layout");
    if (!grid) return;

    function resizeGridItem(item) {

        const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
        const rowGap = parseInt(getComputedStyle(grid).getPropertyValue("gap"));

        const content = item.querySelector(".masonry-layout-content");

        const rowSpan = Math.ceil(
            (content.getBoundingClientRect().height + rowGap) /
            (rowHeight + rowGap)
        );

        item.style.gridRowEnd = `span ${rowSpan}`;
    }

    function resizeAllGridItems() {
        document.querySelectorAll(".masonry-layout-item").forEach(item => {
            resizeGridItem(item);
        });
    }

    resizeAllGridItems();

    window.addEventListener("resize", resizeAllGridItems);
}