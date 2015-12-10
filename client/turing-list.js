
function TuringList(handle,lines,line){

    this.element = $(handle);
    this.lines = lines || [];
    this.line = line || JSON.stringify;

    this.update = (lines) => {
        this.lines = lines;
        this.render();
    };

    this.format = (line) => {
        this.line = line;
        this.render();
    };

    this.render = () => {
        this.element.html('');
        var list = $(document.createElement('ul'));
        this.element.append(list);
        this.lines.map((item) => {
            var line = $(document.createElement('li'));
            line.html(this.line(item));
            list.append(line);
        });
    };

    this.render()

}
