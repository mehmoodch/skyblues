$(document).ready(function () {

    var dynamicList = []
    $('body').on("click", "[photo-swipe]", function (e) {
        var index = $(this).attr("slide-index");
        var activeSlider;
        window[$(this).parents('[dynamic-gallery]').attr('dynamic-gallery')] = []
        InitializePhotoSwipe($(this).parents('[dynamic-gallery]').addClass('initialized').find('[photo-swipe]'), window[$(this).parents('[dynamic-gallery]').attr('dynamic-gallery')]);
        activeSlider = window[$(this).parents('[dynamic-gallery]').attr('dynamic-gallery')];
        $('body').addClass('opened-photo-swipe');
        // Define object and gallery options
        var pswp = $('.pswp')[0],
            options = {
                index: parseInt(index),
                bgOpacity: 1,
                showHideOpacity: true
            };

        // Initialize PhotoSwipe
        var gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, activeSlider, options);
        gallery.listen('gettingData', function (index, item) {
            if (item.w < 3 || item.h < 3) { // unknown size
                var img = new Image();
                img.onload = function () { // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    gallery.invalidateCurrItems(); // reinit Items
                    gallery.updateSize(true); // reinit Items
                }
                img.src = item.src; // let's download image
            }
        });
        gallery.init();
    });

    $('body').on("click", ".pswp__button--close", function () {
        $('body').removeClass('opened-photo-swipe');
    });
    

}); // end document
function InitializePhotoSwipe(swipe, arr) {
    var allItems = []
    // Loop over gallery items and push it to the array
    $(swipe).each(function () {
        var link = $(this),
            item = {
                src: link.attr('data-img'),
                w: link.data('width'),
                h: link.data('height')
                // title: "ssssssss"
            };
            allItems.push(item);
    });
    // to remove duplicates
    function uniqByKeepFirst(a, key) {
        var seen = new Set();
        return a.filter(function (item) {
            var k = key(item);
            return seen.has(k) ? false : seen.add(k);
        });
    }
    allItems = uniqByKeepFirst(allItems, function (it) {
        return it.src;
    });
    allItems.map(function(e,i){arr.push(e)})

}
