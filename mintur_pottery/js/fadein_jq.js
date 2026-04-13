function fadein_setting(div,cssname,offset){  
    var a,b,c,d;  
    d=$(div).offset().top;  
    a=eval(d + offset);  
    b=$(window).scrollTop();   
    c=$(window).height();  
    if(b+c>a){  
        $((div)).addClass((cssname));  
        }  
    }  
$(document).ready(function(e) {  
    $(window).scroll(function(){  
            fadein_setting("#index_01",'fadein_index_01',200);
            fadein_setting("#index_02",'fadein_index_02',200);
            fadein_setting("#index_03",'fadein_index_03',200);
            fadein_setting("#index_04",'fadein_index_04',200);
            fadein_setting("#product",'fadein_product',200);
            fadein_setting("#traffic",'fadein_traffic',200);
            fadein_setting("#footer",'fadein_footer',200);
        }  
    /*var a,b,c;  
    a=$("#dh").offset().top;//元素相對於視窗的距離  
    b=$(window).scrollTop(); //監控視窗已滾動的距離;  
    c=$(document).height();//整個文件的高度  
    d=$(window).height();//瀏覽器視窗的高度*/  
    /*if(d+b>a+100){  
        $("#dh").addClass("xz");  
        }  
    */  
    );  
});  