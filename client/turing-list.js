
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

$(() => {
    
    TuringList('#list1',[1,2,3]);

    var list = new TuringList('#list2',[{age:10,name:'henry'},{age:20,name:'sam'}]);

    list.format((item) => `${item.name} <strong>${item.age}</strong>`);

    // list.line((item) => {
    //     var div = $(document.createElement('div'));
    //     if (item.age > 15){
    //         div.addClass('negative')
    //     }
    //     div.html(item.name)
    //     return div;
    // })

});
