$(function () { 
    // 获取md数据
    $.get("../life/life.md", function parsMd(data){
        // 从##划分
        var md = window.markdownit({
                     html:         true,        // 在源码中启用 HTML 标签
                     xhtmlOut:     false,        // 使用 '/' 来闭合单标签 （比如 <br />）。
                                                 // 这个选项只对完全的 CommonMark 模式兼容。
                     breaks:        true,        // 转换段落里的 '\n' 到 <br>。
                     langPrefix:   'language-',  // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
                     linkify:      true,        // 将类似 URL 的文本自动转换为链接。

                     // 启用一些语言中立的替换 + 引号美化
                     typographer:  false,

                     // 双 + 单引号替换对，当 typographer 启用时。
                     // 或者智能引号等，可以是 String 或 Array。
                     //
                     // 比方说，你可以支持 '«»„“' 给俄罗斯人使用， '„“‚‘'  给德国人使用。
                     // 还有 ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] 给法国人使用（包括 nbsp）。
                     quotes: '“”‘’',

                     // 高亮函数，会返回转义的HTML。
                     // 或 '' 如果源字符串未更改，则应在外部进行转义。
                     // 如果结果以 <pre ... 开头，内部包装器则会跳过。
                     highlight: function (/*str, lang*/) { return ''; }
});
        data=data.split(/##/);
        data.pop();
        data.shift();
        $.each(data, (i,e) => {
            //console.log(data);
            var re=/.+/g;
            var rows=e.match(re);
            var time = rows[0];//.match(/[\d-]{4,}/);
            rows.splice(0,1);
            var text=rows.join('\n');
            
            //console.log(marked(rows.join('')));
            //var text=rows.map((x)=>{marked(x)});
            //console.log(rows);
            var html = '<li class="time-axis-item">' +
                '<div class="time-axis-date">' + time + '<span></span></div>' +
                '<div class="time-axis-text">' + md.render(text) + '</div>' +
                '</li>';
            $('.time-axis').append(html);

        })
    })
});
