$(document).ready(function() {
    var Erase_time_1, Erase_time_2, Erase_time_3, Erase_width, max_m_left, min_m_left, m_left, m_top, init_width, control_panel_obj, qingchu_obj, bg_color;
    var stop_status = false;
    setHideLogoPos();
    $("#switch_off").click(function() {
        //连续点击时增加判断
        var nowTime = new Date().getTime();
        var clickTime = $(this).attr("ctime");
        if( clickTime != 'undefined' && (nowTime - parseFloat(clickTime) < 5000)){
            alert('操作过于频繁，稍后再试');
            return false;
        }
        stop_status = false;
        $(this).attr("ctime",nowTime);
        $(this).parents('.hide_logo_buy').find(".none").removeClass("none");
        $(this).addClass("none");
    
        // 跳到底部，在需要擦掉的地方前面添加橡皮擦
        $("html,body").animate({
            scrollTop: document.documentElement.scrollHeight - document.documentElement.clientHeight
        },500);

        control_panel_obj = $("#control_panel");
        if (control_panel_obj.css("display") != "none") {
            qingchu_obj = $(".wjtext").parent();
            bg_color = $("body").css("background-color");
            if (stop_status){
                return false;
            }
            $("#next_button").unbind();
            cpx_track(qingchu_obj, 5, 0, bg_color);
        } else {
            qingchu_obj = $(".end_create_btn");
            bg_color = $("#survey_page").css("background-color");
            if (stop_status){
                return false;
            }
            cpx_track(qingchu_obj, 30, 32, bg_color);
        }
    });

    $("#switch_on").click(function(){
        stop_status = true;
        $(this).addClass("none");
        $(".buy_info, #hide_logo_buy_bt").addClass("none");
        $("#switch_off").removeClass("none");
        xpc_init();
    });

    //初始化
    function xpc_init(){
        m_left = 0;
        $(".xpc").remove();
        if (qingchu_obj.hasClass('end_create_btn')){
            qingchu_obj.css({
                "border": "1px solid #53a4f4"
            });
        }
        $(".wjtext").parent().css("visibility","visible");
        $(".end_create_btn").css("visibility","visible");
        clearInterval(Erase_time_1);
        clearInterval(Erase_time_2);
        clearInterval(Erase_time_3);
    }

    //计算橡皮擦的初始位置,及滑动轨迹
    function cpx_track(qingchu_obj, margin_top, padding_left, bg_color) {
        qingchu_obj.parent().append("<div style='visibility:hidden;width:15px;height:25px;' class='xpc xpc_div'></div><img style='display:block;visibility:hidden;' src='/static/images/plugin_center/iconfont_xiangpica_01.png' class='xpc xpc_img' alt=''/><div class='xpc_div_right xpc' style='visibility:hidden;width:11px;height:25px;'></div>");
        qingchu_obj.css({
            "display": "inline-block",
        });
        //待清除对象的属性
        var prev_width = qingchu_obj.width();
        var prev_height = qingchu_obj.height();
        var prev_left = qingchu_obj.position().left + padding_left;
        var prev_top = qingchu_obj.position().top;
        //橡皮擦属性;定义背景色及初始透明度
        var xpc_div = $(".xpc_div").css({
            "background": bg_color,
            "opacity": "0"
        });

        var xpc_img = $(".xpc_img").css("z-index", "1");
        var xpc_height = 25; //避免xpc_img.height()获取为0；
        var xpc_width = 26;  //避免xpc_img.width()获取不真实;
        //橡皮擦初始化位置
        m_top = prev_top - (xpc_height - prev_height) / 2 + margin_top;
        m_left = prev_left - xpc_width;
        $(".xpc_div,.xpc_img").css({
            'left': m_left,
            'top': m_top,
            'position': 'absolute',
            'visibility': 'visible',
            'display': 'none',
        });

        //直线运行轨迹,
        init_width = 15;
        Erase_width = prev_width + 26; //擦掉的宽度
        max_m_left = Erase_width + m_left;
        min_m_left = m_left;

        var xpc_div_right = $(".xpc_div_right").css({
            "background": bg_color,
            "position": "absolute",
            "opacity": "0",
            "top": m_top,
            "left": max_m_left + init_width,
            "visibility": "visible"
        });
        $(".xpc").fadeIn(1000);

        setTimeout(function() {
            Erase_time_1 = setInterval(function() {
                if (stop_status){
                    clearInterval(Erase_time_1);
                    xpc_init();
                    return false;
                }
                trace_fn_1(qingchu_obj, xpc_img, xpc_div, xpc_div_right);
            }, 8);
        }, 1000);
    }


    function trace_fn_1(qingchu_obj, xpc_img, xpc_div, xpc_div_right) {
        if (m_left == max_m_left) {
            clearInterval(Erase_time_1);
            Erase_time_2 = setInterval(function() {
                if (stop_status){
                    clearInterval(Erase_time_2);
                    xpc_init();
                    return false;
                }
                trace_fn_2(qingchu_obj, xpc_img, xpc_div, xpc_div_right);
            }, 10);
        }
        xpc_img.css({
            "left": m_left,
            "top": m_top,
        });
        xpc_div.css({
            "width": init_width,
            "opacity": "0.4",
        });
        init_width += 1;
        m_left += 1;
    }

    function trace_fn_2(qingchu_obj, xpc_img, xpc_div, xpc_div_right) {
        if (m_left == min_m_left) {
            clearInterval(Erase_time_2);
            // xpc_div_right.hide();
            Erase_time_3 = setInterval(function() {
                if (stop_status){
                    clearInterval(Erase_time_3);
                    xpc_init();
                    return false;
                }
                trace_fn_3(qingchu_obj, xpc_img, xpc_div);
            }, 8);
        }
        xpc_img.css({
            "left": m_left,
            "top": m_top
        });
        xpc_div.css("width", init_width);
        xpc_div_right.css({
            "opacity": "0.7",
            "left": m_left + 15,
            "top": m_top,
            "width": 11 + 15 + Erase_width - init_width,
        });
        if (qingchu_obj.hasClass('end_create_btn')){
            qingchu_obj.css({
                "border": "1px solid #BADAFB"
            });
        }
        init_width -= 1;
        m_left -= 1;
    }

    function trace_fn_3(qingchu_obj, xpc_img, xpc_div) {
        if (m_left == max_m_left) {
            clearInterval(Erase_time_3);
            qingchu_obj.css("visibility", "hidden");
            xpc_img.fadeOut(200);
            setTimeout(function() {
                $(".xpc").remove();
                if (control_panel_obj.css("display") != "none") {
                    $("#end_desc").html(project.end_desc);
                    if (typeof(get_correct_surveyresult)!="undefined"){
                        $("#end_desc").html(get_correct_surveyresult(get_score()).content);
                    }
                    $("#question_box, #begin_content, .maxtop").hide();
                    $("#survey_end").show();

                    qingchu_obj = $(".end_create_btn");
                    bg_color = $("#survey_page").css("background-color");
                    if (qingchu_obj.css("visibility") !== "hidden") {
                        if (stop_status){
                            xpc_init();
                            return false;
                        }
                        cpx_track(qingchu_obj, 30, 32, bg_color);
                    }
                } else {
                    qingchu_obj = $(".wjtext").parent();
                    bg_color = $("body").css("background-color");
                    if (qingchu_obj.css("visibility") !== "hidden") {
                        if (stop_status){
                            xpc_init();
                            return false;
                        }
                        cpx_track(qingchu_obj, 5, 0, bg_color);
                    }
                }
            }, 300);
        }
        xpc_img.css({
            "left": m_left,
            "top": m_top
        });
        xpc_div.css({
            "width": init_width,
            "opacity": "1.0"
        });
        if (qingchu_obj.hasClass('end_create_btn')) {
            qingchu_obj.css({
                "border": "1px solid #DCEDFD"
            });
        }
        init_width += 1;
        m_left += 1;
    }

    $(window).resize(function(event) {
        setHideLogoPos();
    });
    //设置隐藏logo框的位置
    function setHideLogoPos(){
        var winW = $(window).width();
        var scrollTop = $(window).scrollTop();
        if(winW < 1254){
            $(".hide_logo_buy").css({"left": "2px", "marginLeft":"0px"});
        }else{
            $(".hide_logo_buy").css({"left": "50%", "marginLeft":"-626px"});
        }
    }

    $("#hide_logo_buy_bt").on("click", function() {

        hideLogoPlugin = new pluginCenterIframe.init({
            "type": "hide_logo",
            "string": "hideLogoPlugin",
            "project_id": project._id.$oid
        });
    });

    
    //判断该项目是否展示购买窗口
    if (test_mode){
        $.ajax({
            "url":"/plugin/ajax/is_use_by_proj/",
            "type":"POST",
            "data":{'plugin_name':'hide_logo', 'project_id': project._id.$oid, '_xsrf': getCookie('_xsrf')},
            "dataType": "JSON",
            success:function(data){
                if(data.isUse || !data.is_owner){
                    //已经使用在该问卷、不是登录者打开，不显示
                    $(".hide_logo_buy").remove();
                }else if(data.isSingle){
                    //还没使用，但是有已经购买未使用的单个可用对象
                    $(".hide_logo_buy").css("display","block");
                    $("#switch_off").addClass("none");
                    $(".hide_logo_buy .none").not($("#switch_off")).removeClass("none");
                    $(".buy_info").css("color","#11CD6E");
                    $("#hide_logo_buy_bt").html("启用").css("background","#11CD6E");
                }else{
                    //让用户购买
                    $(".hide_logo_buy").css("display","block");
                }
            }
        });
    }
});