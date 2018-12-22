function buildChart1(firstState) {
    d3.json("/data").then(function(data) {
        console.log(data);
        var starting_array=data.myCollection;
        var new_array=starting_array.filter(function (elem) {
            return (elem['Current State']==firstState);
        });
        console.log(new_array);

         new_array.forEach(element => {
            console.log(element);
        });
        
        var running_total=0;


           /* 
           
           //Strip year and Current State
           for (x in elem){
               running_total = x+running_total;
           }
        year_array.push({year:running_total}); */
        

    })
}

function remove(array, element) {
    const index = array.indexOf(element);
    //array.splice(index, 1);
    console.log(index);
}