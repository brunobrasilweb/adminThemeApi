function pages(total) {
    var pages = [];
    for (var p = 0; p < total; p++) {
        pages.push({number: p, value: p + 1});
    }

    return pages;
}