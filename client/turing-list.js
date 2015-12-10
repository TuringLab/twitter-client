
function TuringList(handle,lines,format){

    this.element = $(handle);
    this.lines = lines || [];
    this.format = format || function(item){
        var pre = $(document.createElement('pre'));
        pre.html(JSON.stringify(item,null,2))
        return pre;
    }

    console.log(this.format({a:'b'}))

    this.update = function(lines) {
        this.lines = lines;
        this.render();
    };

    this.formatter = function(format) {
        this.format = format;
        this.render();
    };

    this.render = function() {
        var _this = this;
        this.element.html('');
        var list = $(document.createElement('ul'));
        this.element.append(list);
        this.lines.map(function(item) {
            var line = $(document.createElement('li'));
            line.html(_this.format(item));
            list.append(line);
        });
        this.element.show();
    };

    this.render()

}
