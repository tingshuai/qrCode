<template>
    <div class="loading" :style="isFixed?'position:fixed':'position:absolute'">
        <!-- <div class="loading-icon">
            <span class="loading_1"></span>
            <span class="loading_2"></span>
            <span class="loading_3"></span>
            <span class="loading_4"></span>
        </div> -->
        <div>
              <span class="el-icon-loading"></span>
              <p>正在拼命加载中</p>
        </div>
    </div>
</template>
<script>
export default {
  props:['isFixed']
}
</script>

<style lang="less">
    // @width: 40px;
    // @height: 40px;
    // @time: 1.5s;
    .loading{
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, .6);
        z-index: 1;
        text-align: center;
        div{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        color: #017eff;
        span{
          font-size: 30px;
        }
        p{
         font-size: 14px;
        }
    }
    // .loading_1,.loading_2,.loading_3,.loading_4{
    //         position: absolute;
    //         width: @width;
    //         height: @height;
    //         background-color: rebeccapurple;
    //     }
    // .loading_1{
    //     // background-color: #409EFF;
    //     left: 0;
    //     top: 0;
    //     animation: loading_1 @time ease  infinite reverse;
    // }  
    // .loading_2{
    //     // background-color: #67C23A;
    //     right: 0;
    //     top: 0;
    //     animation: loading_2 @time ease  infinite reverse;
    // } 
    // .loading_3{
    //     // background-color: #E6A23C;
    //     left: 0;
    //     bottom: 0;
    //     animation: loading_3 @time ease  infinite reverse;
    // } 
    // .loading_4{
    //     // background-color: #F56C6C;
    //     right: 0;
    //     bottom: 0;
    //     animation: loading_4 @time ease  infinite reverse;
    // }       
    // }

    // @keyframes  loading_1{
    //     0%{
    //       transform: translateX(0) rotate(0);
    //       border-radius: 0;
    //       background-color: rebeccapurple;
    //     }
    //     50%{
    //         transform: translate(-150%,20px) rotate(360deg);
    //         border-radius: 50%;
    //         background-color: #409EFF;
    //     }
    //     100%{
    //       transform: translateX(0)  rotate(0);
    //       border-radius: 0;
    //       background-color: rebeccapurple;
    //     }
    // }
    // @keyframes  loading_2{
    //     0%{
    //       transform: translateX(0) rotate(0);
    //       border-radius: 0;
    //       background-color: rebeccapurple;
    //     }
    //     50%{
    //         transform: translate(150%,20px) rotate(-360deg);
    //         border-radius: 50%;
    //         background-color: #67C23A;
    //     }
    //     100%{
    //       transform: translateX(0)  rotate(0);
    //       border-radius: 0;
    //       background-color: rebeccapurple;
    //     }
    // }
    // @keyframes  loading_3{
    //     0%{
    //       transform: translateX(0) rotate(0);
    //       border-radius: 0;
    //       background-color: rebeccapurple;
    //     }
    //     50%{
    //         transform: translate(-150%,-20px) rotate(-360deg);
    //         border-radius: 50%;
    //         background-color: #E6A23C;
    //     }
    //     100%{
    //       transform: translateX(0)  rotate(0);
    //       border-radius: 0;
    //       background-color: rebeccapurple;
    //     }
    // }
    //  @keyframes  loading_4{
    //     0%{
    //       transform: translateX(0) rotate(0);
    //       border-radius: 0;
    //       background-color: rebeccapurple;
    //     }
    //     50%{
    //         transform: translate(150%,-20px) rotate(360deg);
    //         border-radius: 50%;
    //         background-color: #F56C6C;
    //     }
    //     100%{
    //       transform: translateX(0)  rotate(0);
    //       border-radius: 0;
    //       background-color: rebeccapurple;
    //     }
    }

</style>

