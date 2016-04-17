// From http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
function isHidden(el) {
    return (el.offsetParent === null)
}

var alreadySeen = [];

function handleVisibleElement(el) {
    alreadySeen.push(el);
    var elapsed = Date.now() - performance.timing.fetchStart;
    console.log("ElementTimer: ", el, " appeared in " + elapsed + "ms");
}

function waitForVisible(el) {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(alreadySeen.indexOf(mutation.target) >= 0) {
                return;
            }
            if(!isHidden(mutation.target)) {
                handleVisibleElement(mutation.target);
            }
        });    
    });

    var config = { attributes: true, childList: false, characterData: true };
    observer.observe(el, config);
}


(function() {
    var alreadySeen = [];
    chrome.storage.sync.get({
        selectors: [],
    }, function(items) {
        var selectors = items.selectors;
        for(var i=0; i<selectors.length; i++) {
            console.log("Watching for items matching the selector '" + selectors[i] + "'");
            document.arrive(selectors[i], {existing: true}, function() {
                if(!isHidden(this)) {
                    handleVisibleElement(this);
                } else {
                    waitForVisible(this);
                }
            });
        }
    });
})();