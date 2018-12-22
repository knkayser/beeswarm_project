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
      
      buildChart1(firstState);
      buildChart2(firstState);
      buildChart3(firstState);
    });
  }


  
  function optionChanged(newState) {
    // Fetch new data each time a new sample is selected
    buildChart1(firstState);
    buildChart2(firstState);
    buildChart3(firstState);
  }
  
  // Initialize the dashboard
  init();