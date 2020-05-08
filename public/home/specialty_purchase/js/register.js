/*
 * @Author: hzw 
 * @Date: 2020-03-01 13:36:33 
 * @Last Modified by: hzw
 * @Last Modified time: 2020-04-15 18:10:20
 */
// 注册表单验证-----没有封装函数，就是为了自己多敲几遍代码
$(function() { //页面加载函数
    var regTel = /^1[3|4|5|7|8]\d{9}$/; //手机号正则表达式
    var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮箱正则表达式
    var regPassword = /^[a-zA-Z0-9_]{6,16}$/; //密码正则，数字字母下滑线
    var regPay_psd = /^[0-9]{6}$/ //支付密码验证规则
    $("#tel").blur(function() {
        if (regTel.test($(this).val())) {

            $(this).next().addClass("success");
            $(this).next().html('<i class="success-icon">  </i> 手机格式正确!');
        } else {
            $(this).next().addClass("error");
            $(this).next().html('<i class="error-icon">  </i> 手机格式不正确!');
        }
    });

    //邮箱格式验证
    $("#email").blur(function() {
        if (regEmail.test($(this).val())) {
            $(this).next().addClass("success");
            $(this).next().html('<i class="success-icon">  </i> 邮箱格式正确!');
        } else {
            $(this).next().addClass("error");
            $(this).next().html('<i class="error-icon">  </i> 邮箱格式不正确!');
        }
    });
    //密码格式验证
    $("#psd").blur(function() {
        if (regPassword.test($(this).val())) {
            $(this).next().addClass("success");
            $(this).next().html('<i class="success-icon">  </i> 密码格式正确!');
        } else {
            $(this).next().addClass("error");
            $(this).next().html('<i class="error-icon">  </i> 密码格式不正确!');
        }
    });
    //密码强度验证
    $("#psd").keyup(function() {
        if ($(this).val().length >= 6 && $(this).val().length <= 9) {
            $(".safe .ruo").css("opacity", 1).siblings().css("opacity", 0.4);
        } else if ($(this).val().length > 9 && $(this).val().length <= 13) {
            $(".safe .zhong").css("opacity", 1).siblings().css("opacity", 0.4);
        } else if ($(this).val().length > 13 && $(this).val().length <= 16) {
            $(".safe .qiang").css("opacity", 1).siblings().css("opacity", 0.4);
        }
    });
    //密码确认验证
    $("#cpsd").blur(function() {
        if ($(this).val() == $("#psd").val() && $(this).val() != '' && $("#psd").next().hasClass("success")) {
            $(this).next().addClass("success");
            $(this).next().html('<i class="success-icon">  </i> 恭喜密码确认通过!');
        } else {
            $(this).next().addClass("error");
            $(this).next().html('<i class="error-icon">  </i> 输入密码不一致');
        }
    });

    //支付密码验证
    $("#pay_psd").blur(function() {
        if (regPay_psd.test($(this).val())) {

            $(this).next().addClass("success");
            $(this).next().html('<i class="success-icon">  </i> 支付密码格式正确!');
        } else {
            $(this).next().addClass("error");
            $(this).next().html('<i class="error-icon">  </i> 支付密码格式不正确!');
        }
    })
});