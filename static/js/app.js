function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/states").then((stateNames) => {
        stateNames.forEach((state) => {
        selector
          .append("option")
          .text(state)
          .property("value", state);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstState = stateNames[0];
      buildChart(firstState);
    });
  }
  
//  function optionChanged(newState) {
//    // Fetch new data each time a new sample is selected
function optionChanged(firstState) {
	year = d3.select('#slider').property('value')
  buildChart(firstState);
  update_map(year, firstState, update = true)
};

//  }
  
  // Initialize the dashboard
  init();