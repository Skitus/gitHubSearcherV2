export function createPages(pages: any, pagesCount: any, currentPage: any) {
  if (pagesCount > 5) {
    if (currentPage > 3) {
      // eslint-disable-next-line no-plusplus
      for (let i = currentPage - 3; i <= currentPage + 3; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    } else {
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}
