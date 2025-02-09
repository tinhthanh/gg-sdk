const sha256Gen = (value) => {
  const signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value);
  return signature
    .map(function (byte) {
      // Convert from 2's compliment
      const v = byte < 0 ? 256 + byte : byte;
      // Convert byte to hexadecimal
      return `0${v.toString(16)}`.slice(-2);
    })
    .join('');
}

const uuid = () => {
  return Utilities.getUuid();
}

const paginate = (totalItems, c = 1, pageSize = 10, maxPages = 10) => {
  // calculate total pages
  let currentPage = c;
  const totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage;
  let endPage;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

  // return object with all pager properties required by the view
  return {
    totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages, data: [],
  };
}
export const getDeploymentId = () => {
  const scriptUrl = ScriptApp.getService().getUrl();
  const regex = /\/s\/(.*?)\/exec/;
  const match = scriptUrl.match(regex);
  let deploymentId = '';
  if (match && match[1]) {
    deploymentId = match[1];
  }
  return deploymentId;
}

export {sha256Gen, uuid, paginate};
