function save_options() {
    var inputs = document.querySelectorAll('.js-ui-selector');
    var selectors = [];
    for(var i=0; i<inputs.length; i++) {
        var selector = inputs[i].value;
        if(selector) {
            selectors.push(selector);
        }
    }
    
    chrome.storage.sync.set({
        selectors: selectors,
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        selectors: [],
    }, function(items) {
        if(items.selectors.length > 0) {
            document.querySelector('.js-ui-selector').value = items.selectors[0];
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
