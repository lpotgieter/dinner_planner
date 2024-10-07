// script.js

// Function to select a random item based on weights
function selectRandomItem() {
  const fileInput = document.getElementById('fileInput');
  
  if (fileInput.files.length === 0) {
    document.getElementById("result").innerText = "Please upload a file!";
    return;
  }
  
  const file = fileInput.files[0];
  const reader = new FileReader();

  // Define what happens when the file is read
  reader.onload = function(event) {
    // Get the content of the file
    const content = event.target.result;
    
    // Split content into an array of lines
    const lines = content.split('\n').map(line => line.trim()).filter(line => line);

    // Check if we have valid lines
    if (lines.length === 0) {
      document.getElementById("result").innerText = "The file is empty or has no valid lines!";
      return;
    }

    // Parse the options and weights
    const optionsWithWeights = [];

    lines.forEach(line => {
      // Split the line by comma to extract the option and weight
      const [option, weight] = line.split(',').map(part => part.trim());

      // Ensure the weight is a number and defaults to 1 if not specified
      const weightValue = weight ? parseInt(weight, 10) : 1;

      // Add the option multiple times based on its weight
      for (let i = 0; i < weightValue; i++) {
        optionsWithWeights.push(option);
      }
    });

    if (optionsWithWeights.length === 0) {
      document.getElementById("result").innerText = "No valid options found!";
      return;
    }

    // Select a random item from the weighted options
    const randomIndex = Math.floor(Math.random() * optionsWithWeights.length);
    const randomItem = optionsWithWeights[randomIndex];
    
    // Display the randomly selected item
    document.getElementById("result").innerText = "Selected: " + randomItem;
  };

  // Read the file as text
  reader.readAsText(file);
}
