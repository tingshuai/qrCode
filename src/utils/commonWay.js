/*
=====================
      导出excel
用法：outFile(id),
     downloadFile('表格数据')
     downloadExl(json, downName, type) //导出到excel
=====================
*/
export const output = {
  outFile: function (id) {
    return document.getElementById(id);
  },
  downloadFile: function (rs) { // 点击导出按钮
    let data = [{}]
    for (let k in rs[0]) {
      if (this.downName[k]) {
        data[0][k] = this.downName[k];
      }
    }
    data = data.concat(rs)
    // this.downloadExl(data, '菜单')
  },
  downloadExl: function (json, downName, type) { // 导出到excel
    let keyMap = [] // 获取键
    for (let k in json[0]) {
      keyMap.push(k)
    }
    let tmpdata = [] // 用来保存转换好的json
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
      tmpdata[v.position] = {
        v: v.v
      }
    })
    let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
    let tmpWB = {
      SheetNames: ['mySheet'], // 保存的表标题
      Sheets: {
        'mySheet': Object.assign({},
          tmpdata, // 内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
          })
      }
    }
    let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, {
        bookType: (type === undefined ? 'xlsx' : type),
        bookSST: false,
        type: 'binary'
      } // 这里的数据是用来定义导出的格式类型
    ))], {
      type: ''
    }) // 创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown) // 创建对象超链接
    this.outFile.download = downName + '.xlsx' // 下载名称
    this.outFile.href = href // 绑定a标签
    this.outFile.click() // 模拟点击实现下载
    setTimeout(function () { // 延时释放
      URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
    }, 100)
  },

  s2ab: function (s) { // 字符串转字符流
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  },
  getCharCol: function (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    let s = ''
    let m = 0
    while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
    }
    return s
  },
}

/*
=====================
      打印excel
用法： 
=====================
安装C-Lodop (Print)
地址：http://www.lodop.net/download.html---下载Lodop综合版；安装.exe文件、然后运行即可。
加入LodopFuncs.js
print.EXCEL(css,dom);
dom全页：document.documentElement.innerHTML
*/

export const PRINT = {
  // 打印excel
  EXCEL: function (css, dom) {
    LODOP = getLodop();
    var strBodyStyle = css ? css : ""; //添加样式
    var strFormHtml = strBodyStyle + "<body>" + dom.innerHTML + "</body>";
    LODOP.PRINT_INIT();
    LODOP.ADD_PRINT_HTM(50, 0, "100%", "100%", strFormHtml);
    // LODOP.ADD_PRINT_TABLE(50, 0, "100%", "100%",dom);//另一种表格打印
    LODOP.PREVIEW(); //打印预览
  },
  // 打印指定路径图片
  IMG: function (src) {
    LODOP = getLodop();
    LODOP.PRINT_INIT();
    LODOP.ADD_PRINT_IMAGE(30, 150, 400, 400, "<img border='0' src=" + src + " />");
    LODOP.PREVIEW();
  },
  //打印条形码
  BARCODE: function (type, content) {
    // type支持如下26种
    // 128A,128B,128C,128Auto,EAN8,EAN13,EAN128A,EAN128B,EAN128C,Code39,39Extended,2_5interleaved	2_5industrial,2_5matrix
    // UPC_A,UPC_E0,UPC_E1,UPCsupp2,UPCsupp5,Code93,93Extended,MSI,PostNet,Codabar,QRCode,PDF417
    LODOP = getLodop();
    LODOP.PRINT_INIT();
    LODOP.ADD_PRINT_BARCODE(179, 42, 130, 47, type, content);
    LODOP.PREVIEW();
  },
  // 打印指定网址的内容
  URL: function (url) {
    LODOP = getLodop();
    LODOP.PRINT_INIT();
    LODOP.ADD_PRINT_URL(30, 20, 746, "95%", url);
    //		LODOP.SET_SHOW_MODE("MESSAGE_GETING_URL",""); //该语句隐藏进度条或修改提示信息
    //		LODOP.SET_SHOW_MODE("MESSAGE_PARSING_URL","");//该语句隐藏进度条或修改提示信息
    LODOP.PREVIEW();
  },

  // 导出指定dom的表格内容成excel
  outputExcel(dom, newName) {
    LODOP = getLodop();
    LODOP.PRINT_INIT("");
    LODOP.ADD_PRINT_TABLE(100, 20, 500, 80, dom);
    LODOP.SET_SAVE_MODE("Orientation", 2); //Excel文件的页面设置：横向打印   1-纵向,2-横向;
    LODOP.SET_SAVE_MODE("PaperSize", 9); //Excel文件的页面设置：纸张大小   9-对应A4
    LODOP.SET_SAVE_MODE("Zoom", 90); //Excel文件的页面设置：缩放比例
    LODOP.SET_SAVE_MODE("CenterHorizontally", true); //Excel文件的页面设置：页面水平居中
    LODOP.SET_SAVE_MODE("CenterVertically", true); //Excel文件的页面设置：页面垂直居中
    //		LODOP.SET_SAVE_MODE("QUICK_SAVE",true);//快速生成（无表格样式,数据量较大时或许用到） 
    LODOP.SAVE_TO_FILE(newName + ".xls");
  }
  /* 附
  ====================
     2种样式添加方式：

     1、css="<style>table,td { font-size:11px }</style>";
     2、LODOP.SET_PRINT_STYLE("FontSize",11);
        LODOP.SET_PRINT_STYLEA(0,"TextNeatRow",true); // 文本内容行左右对齐（允许标点溢出，且英文单词拆开）
        LODOP.SET_PRINT_STYLEA(0,"Angle",90); //普通文本旋转
     ====================     
     几种常用方法：

     LODOP.ADD_PRINT_RECT(10,55,360,220,0,1);  //画一个名片大小的矩形边框
     
     边框离纸张顶端10px(px是绝对值长度，等于1/96英寸,下同)距左边55px、宽360px、高220px、 框为实线(0-实线 1-破折线 2-点线 3-点划线 4-双点划线)、线宽为1px
     
     ***************

     LODOP.PRINTA(); //直接打印	

     ***************
    
     LODOP.ADD_PRINT_TEXT(53,187,75,20,"科学家"); //在制定位置添加指定文本
     
     ***************

     LODOP.PRINT_DESIGN();	//打印设计  

     用于自定义设计打印内容（如打印单据、发票）

      ***************

      LODOP.SET_PRINT_PAGESIZE(1,document.getElementById('W1').value,document.getElementById('H1').value,"A4");

      打印一张指定宽高的A4纸

      LODOP.ADD_PRINT_SETUP_BKIMG("<img border='0' src='http://s1.sinaimg.cn/middle/721e77e5t99431b026bd0&690'>");

      设置打印背景图片
     
      =================
       其他：

      LODOP.SET_PRINT_MODE("PRINT_DUPLEX",2);0-不控制 1-不双面 2-双面(长边装订) 3-小册子双面(短边装订_长边水平)
      LODOP.SET_PRINT_MODE("PRINT_DEFAULTSOURCE",1);1-纸盒 4-手动 7-自动 0-不控制
      LODOP.GET_PRINTER_COUNT;获得打印机个数
      LODOP.GET_PRINTER_NAME(intPrinterIndex);用序号获得打印机名，一般序号从0开始，-1特指默认打印机；
      LODOP.SET_PRINTER_INDEX(oIndexOrName);按序号或名称指定打印机，选定后禁止手工重选；
      LODOP.SET_PRINTER_INDEXA(IndexorName);按序号或名称指定打印机，选定后允许手工重选；
      LODOP.SELECT_PRINTER;弹出界面选打印机并返回其序号，序号从0开始,返回-1表示放弃
      LODOP.SET_PRINT_COPIES(intCopies);指定每次打印份数，缺省为1
      LODOP.SET_SHOW_MODE("SKIN_TYPE",皮肤编号); R0~R20
      LODOP.SET_SHOW_MODE("SKIN_CUSTOM_COLOR",皮肤底色值); 颜色值
      */

}
