$(function(){
    $('.callme').fancybox({
        maxWidth: 425,
        padding: [35, 40, 30, 40]
    });
    $('.cab').fancybox({
        wrapCSS: 'enter'
    });
    $('#callback .cancel').click(function(e){
        e.preventDefault();
        console.log($(this).parents('#callback').find('.close'));
        $(this).parents('.fancybox-skin').find('.fancybox-close').click();
    });
    $('#review .fancybox-close, #review .cancel').click(function(e){
        e.preventDefault();
        $(this).parents('#review').fadeOut(200);
    })
    $('.product-about .vcarousel-preview').fancybox({
        wrapCSS: 'opened-slider',
        padding: [20, 35, 20, 35]
    });
    $('.header-basket').fancybox({
        wrapCSS: 'basket',
        padding: [0, 0, 0, 0], 
        margin: [0, 0, 0, 0]
    });
    // HEADER TEL

    $('.header-tel-open').click(function(){
        if($(this).next().hasClass('active')){
            $('.header-tel').removeClass('active');
        } else {
            $('.header-tel').addClass('active');
        }
    })

    // SLIDER

    $(".slider").each(function () { // обрабатываем каждый слайдер
        var obj = $(this);
        $(obj).append("<div class='nav'></div>");
        $(obj).find("li").each(function(){
            $(obj).find(".nav").append("<span rel='"+$(this).index()+"'></span>"); // добавляем блок навигации
            $(this).addClass("slider"+$(this).index());
        });
        $(obj).find("span").first().addClass("on"); // делаем активным первый элемент меню
    });

    function sliderJS (obj, sl) { // slider function
        var ul = $(sl).find("ul"); // находим блок
        var bl = $(sl).find("li.slider"+obj); // находим любой из элементов блока
        var step = $(bl).width(); // ширина объекта
        $(ul).animate({marginLeft: "-"+step*obj}, 500); // 500 это скорость перемотки
    }
    $('.slider').on("click", ".nav span", function() { // slider click navigate
        var sl = $(this).closest(".slider"); // находим, в каком блоке был клик
        $(sl).find("span").removeClass("on"); // убираем активный элемент
        $(this).addClass("on"); // делаем активным текущий
        var obj = $(this).attr("rel"); // узнаем его номер
        sliderJS(obj, sl); // слайдим
        return false;
    });

    //BLOG SLIDER

    //Обработка клика на стрелку вправо
    $(document).on('click', ".carousel-nav .next", function(){ 
        var carusel = $(this).parents('.carousel');
        right_carusel(carusel);
        return false;
    });
    //Обработка клика на стрелку влево
    $(document).on('click',".carousel-nav .prev", function(){ 
        var carusel = $(this).parents('.carousel');
        left_carusel(carusel);
        return false;
    });
    function left_carusel(carusel){
        if($('body').width()<1580){
             var block_width = $(carusel).find('.carousel-block').outerWidth() + 9;
        } else {
             var block_width = $(carusel).find('.carousel-block').outerWidth() + 17;
        }
       //console.log(block_width);
       $(carusel).find(".carousel-wrapper .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-wrapper")); 
       $(carusel).find(".carousel-wrapper").css({"left":"-"+block_width+"px"});
       $(carusel).find(".carousel-wrapper .carousel-block").eq(-1).remove();    
       $(carusel).find(".carousel-wrapper").animate({left: "0px"}, 200); 
       
    }
    function right_carusel(carusel){
       if($('body').width()<1580){
             var block_width = $(carusel).find('.carousel-block').outerWidth() + 9;
        } else {
             var block_width = $(carusel).find('.carousel-block').outerWidth() + 17;
        }
       $(carusel).find(".carousel-wrapper").animate({left: "-"+ block_width+"px"}, 200, function(){
          $(carusel).find(".carousel-wrapper .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-wrapper")); 
          $(carusel).find(".carousel-wrapper .carousel-block").eq(0).remove(); 
          $(carusel).find(".carousel-wrapper").css({"left":"0px"}); 
       }); 
    }
    // MOBILE
        $('.main-content .slider li, .main-content .carousel figure, .rent .slider li').each(function(i, item){
            $(item).css({"background-image":"url("+ $(item).attr('data-src')+")"});
        })
        if($('body').width()<768){
            height = $('.blog-post').outerHeight();
            $('.blog-ad-aside').css('top', height + 273);
            $('.blog-ad-middle').css('top', height*2 + 292);
        }
    // RATING
    var oldRating = $('#review i.active').length; 
    $('#review i').on('mouseover', function(){
        var index = $(this).index();
        $('.rating i').removeClass('active');
        $(this).prevAll().andSelf().addClass('hover');
    }).on('mouseleave', function(){
        $('.rating i').removeClass('hover');
        if(oldRating == 0){
            return;
        }
        $('#review i').eq(oldRating - 1).prevAll().andSelf().addClass('active');
    }).on('click', function(){
        var index = $(this).index();
        $('.rating i').removeClass('hover');
        $(this).prevAll().andSelf().addClass('active');
        oldRating = $('#review i.active').length;
    })
    // NAVIGATION
    $('.header-nav ul .close').click(function(){
        if(!$(this).parents('ul').hasClass('active')){
            $('.header-nav ul').addClass('active');
        } else {
            $('.header-nav ul').removeClass('active');
        }
    })
    $('.main-navigation .close').click(function(){
        $('.main-navigation').toggleClass('active');
        $('.main-content').toggleClass('add-margin');
        $('.filter').toggleClass('add-margin');
    })
    $('.catalog h2').click(function(){
        if($(this).parents('.catalog').hasClass('active')){
            $(this).parents('.catalog').removeClass('active');
        } else {
            $(this).parents('.catalog').addClass('active');
        }
    })
    // RANGE
    $( '[id*="range"]' ).each(function(i){
        var $this = $('[id="range-'+i+'"]'),
            $max = $this.parent().find('.max'),
            $min = $this.parent().find('.min'),
            minCost = $this.parent().find('.min').val(),
            maxCost = $max.val();
        $this.slider({
            min: 0,
            max: maxCost,
            range: true,
            values: [ 0, maxCost ],
            stop: function(event, ui) {
                jQuery($min).val(jQuery($(this)).slider("values",0));
                jQuery($max).val(jQuery($(this)).slider("values",1));
            },
            slide: function(event, ui){
                jQuery($min).val(jQuery($(this)).slider("values",0));
                jQuery($max).val(jQuery($(this)).slider("values",1));
            }
        });  
    });
    jQuery("input.min").change(function(){
        var $this = $(this),
            $parent = $this.parent(),
            $range = $this.parent().find('[id*="range"]'),
            value1=$parent.find('.min').val(),
            value2=$parent.find('.max').val();

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            jQuery($range).val(value1);
        }
        jQuery($range).slider("values",0,value1);  
    });
    jQuery("input.max").change(function(){
        var $this = $(this),
            $parent = $this.parent(),
            $range = $this.parent().find('[id*="range"]'),
            value1=$parent.find('.min').val(),
            value2=$parent.find('.max').val(),
            maxVal=$parent.find('.max').attr('value');
            
        if (value2 > maxVal) { value2 = maxVal; jQuery($this).val(maxVal)}

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            jQuery($range).val(value2);
        }
        jQuery($range).slider("values",1,value2);
    });
    $('input.num').keypress(function(event){
        var key, keyChar;
        if(!event) var event = window.event;
        
        if (event.keyCode) key = event.keyCode;
        else if(event.which) key = event.which;
    
        if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
        keyChar=String.fromCharCode(key);
        
        if(!/\d/.test(keyChar)) return false;
    });
    // FILTER
    $('.filter-block.dropdown').click(function(){
        if($(this).hasClass('opened')){
            $(this).removeClass('opened').addClass('closed');
        } else {
            $(this).removeClass('closed').addClass('opened');
        }
    })
    $('.filter .head').click(function(){
        if(!$(this).parent().hasClass('active')){
            $(this).parent().addClass('active');
        }
    })
    $('.filter .close').click(function(){
        if($(this).parent().hasClass('active')){
            $(this).parent().removeClass('active');
        }
    })
    //DROPDOWN
    $('.dropdown-list span').click(function(){
        $(this).parents('.dropdown-list').toggleClass('opened');
    })
    $('.dropdown-list li').click(function(){
        var $this = $(this);
        $this.parents('.dropdown-list').find('span').text($this.text()).addClass('chosen');
        $this.parents('.dropdown-list').removeClass('opened');
    })
    $('.goods-layout #layout-1').click(function(){
        $(this).parents('.content-goods').removeClass('list');
    })
    $('.goods-layout #layout-2').click(function(){
        $(this).parents('.content-goods').addClass('list');
    })

    //VERTICAL SLIDER

    //Обработка клика на стрелку вверх
    $(document).on('click', ".vcarousel-nav .next", function(){ 
        $('.vcarousel').each(function(i, item){
           bottom_carusel(item);
        })
        return false;
    });
    //Обработка клика на стрелку вниз
    $(document).on('click',".vcarousel-nav .prev", function(){ 
        $('.vcarousel').each(function(i, item){
           top_carusel(item);
        })
        return false;
    });
    //Обработка клика на большую картинку
    $(document).on('click', ".vcarousel .vcarousel-block", function(e){
        e.preventDefault();
        var index = $(this).index();
        $('.vcarousel-block').removeClass('active');
        $('.vcarousel').each(function(i, item){
            $(item).find('.vcarousel-block').eq(index).addClass('active');
            $(item).find('.vcarousel-preview img').attr('src', $(item).find('.active').attr('href'));
        })
    })
    $('.vcarousel-preview').click(function(e){
        e.preventDefault();
    })
    function bottom_carusel(carusel){
        var block_height = $(carusel).find('.vcarousel-block').outerHeight() + 10;
        $(carusel).find(".vcarousel-wrapper .vcarousel-block").eq(-1).clone().prependTo($(carusel).find(".vcarousel-wrapper")); 
        $(carusel).find(".vcarousel-wrapper").css({"top":"-"+block_height+"px"});
        $(carusel).find(".vcarousel-wrapper .vcarousel-block").eq(-1).remove();    
        $(carusel).find(".vcarousel-wrapper").animate({top: "0px"}, 200); 
    }
    function top_carusel(carusel){
        var block_height = $(carusel).find('.vcarousel-block').outerHeight() + 10;
        $(carusel).find(".vcarousel-wrapper").animate({top: "-"+ block_height+"px"}, 200, function(){
          $(carusel).find(".vcarousel-wrapper .vcarousel-block").eq(0).clone().appendTo($(carusel).find(".vcarousel-wrapper")); 
          $(carusel).find(".vcarousel-wrapper .vcarousel-block").eq(0).remove(); 
          $(carusel).find(".vcarousel-wrapper").css({"top":"0px"});
        }); 
    }
    // LIKELIST

    $('.likelist').on('click', '.close', function(){
        var $block = $(this).parents('.carousel-block');
        $block.animate({opacity: 0, width: 0, height: 0}, 300);
        setTimeout(function(){
            $block.remove();
        }, 300);
    })
    // NUMBER
    $('.basket-number .plus').click(function(){
        $parent = $(this).parents('.basket-number');
        $parent.find('.num').val(+$parent.find('.num').val() + 1);
    })
    $('.basket-number .minus').click(function(){
        $parent = $(this).parents('.basket-number');
        $parent.find('.num').val(+$parent.find('.num').val() - 1);
        if($parent.find('.num').val() < 1){
            $parent.find('.num').val(1);
        }
    })
})
