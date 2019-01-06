function buildChart(firstState) {
    d3.json("/data").then(function(data) {
        //console.log(data);
        //console.log(firstState);
        var starting_array=data.myCollection;
        var new_array=starting_array.filter(function (elem) {
            return (elem['Current State']==firstState);
        });
        // console.log(new_array);
        var dateArray = [];
        var totalNum = [];
        
        // console.log(dateArray);
        new_array.forEach(element => {
            //console.log(element);
            delete element["Current State"];
            dateArray.push(element.Year);
            delete element["Year"];
            var newObj = Object.values(element); 
            // console.log(newObj)
            // console.log(newObj);
            var sum = 0;
            newObj.forEach(elem => {
                // console.log(elem)
                sum = sum + elem;
                // console.log(sum);
            })
            
            totalNum.push(sum);
            
        });
        //console.log(totalNum);
        
        var data = [
            {
              x: dateArray,
              y: totalNum,
              type: 'bar'
            }
          ];
        var layout = {
            title: {
              text:'Selected State Net Migration',
              font: {
                family: 'Courier New, monospace',
                size: 24
              },
              xref: 'paper',
              x: 0.05,
            },
            xaxis: {
              title: {
                text: 'Year',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              },
            },
            yaxis: {
              title: {
                text: 'Migration (thousands of people)',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              }
            }
          };

        Plotly.newPlot('myDiv', data, layout);
        //console.log(data)
    })

};


// var ctx = document.getElementById("myChart");
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });