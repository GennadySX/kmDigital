$(document).ready(function () {
    console.log('data test 1000');

    $(".block-1").mousemove(function (e) {
        var y = e.pageY,
            x = e.pageX,
            top = 50,
            left = 50;
        $('.background').css({
            'left': left - (x / 150) + "%",
            'top': top - (y / 150) + "%",
        })

    });


    if (window.innerWidth > 430) {
        $('#pagepiling').pagepiling({
            menu: '#menu',
            anchors: ['page1', 'page2', 'page3', 'page4'],
            navigation: false,
            afterRender: function () {
                $('#pp-nav').addClass('custom');
            },
            afterLoad: function (anchorLink, index) {
                if (index > 1) {
                    $('.d1').addClass('active');
                    $('.d0').removeClass('active');
                } else {
                    $('.d0').addClass('active');
                    $('.d1').removeClass('active');
                }
            }
        });
    } else $('body').css('overflow', 'auto')


    $('.dot').click(function () {
        var section = $(this).data('id')
        console.log('section', section)
        $.fn.pagepiling.moveTo(section);
    });
});
