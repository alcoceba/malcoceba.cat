(function () {
    var element = document.getElementById("container-about");
    if (!!element) {
        setTimeout(function () {
            element.className = element.className.concat(" animate");
        }, 1000);
    }
})();
