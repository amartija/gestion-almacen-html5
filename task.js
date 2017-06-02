/**
 * Created by Curso on 01/06/2017.
 */
this.addEventListener('message', function(e) {
    var data = e.data;
    for(var i=1;i<data;i++)
    {
        
        if(data/i == Math.round(data/i) && i!=1 && i!=data)
        {
            this.postMessage(i);

        };
    };
    this.postMessage("Final");
}, false);