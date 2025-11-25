$(document).ready(function(){
    // 這段是用來確保瀏覽器在載入JQ後(讓你的網頁有JQ的功能)，才執行裡面的內容，JQ一定要寫在這裡面喔!!
    /* $('').hide(); */
    
});

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
    fadein_setting("#work_title",'fadein_r_l',100);
    fadein_setting("#app_left",'fadein_bot_top',200);
    fadein_setting("#app_right",'fadein_bot_top',500);
    fadein_setting("#illus",'fadein_bot_top',200);
    fadein_setting("#footer",'fadein_bot_top',200);
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