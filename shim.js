exports.module = global.requestAnimationFrame = cb => {
    setTimeout(cb, 0);
};
