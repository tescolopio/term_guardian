// Define a simple linear regression model
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Function to summarize text and provide a grading scale
function summarizeAndGradeText(text) {
// Summarize the text
const summarizedText = text.substring(0, 100) + '...'; // Just an example summary

// Grade the text based on specific criteria
let grade;
 if (text.length < 500) {
 grade = 'Low Complexity';
 } else if (text.length >= 500 && text.length < 1000) {
 grade = 'Medium Complexity';
 } else {
 grade = 'High Complexity';
 }
 return { summary: summarizedText, complexity: grade };
}

// Event listener for the button click
 document.getElementById('runModelButton').addEventListener('click', async () => {
 console.log("RunModelButtonClicked");
 const inputValue = document.getElementById('inputValue').value;
 const inputNumber = inputValue.charCodeAt(0);
 document.getElementById('status').innerText = 'Running TensorFlow Model...';

 const inputTensor = tf.tensor2d([inputNumber], [1, 1]);
 const output = model.predict(inputTensor);
 const outputValue = output.dataSync()[0];

 document.getElementById('output').innerHTML = `Model Prediction: <br><strong> ${outputValue}</strong>`;
 document.getElementById('status').innerHTML = '<strong> Model prediction complete. </strong>';

 // Summarize and grade the input text
 const { summary, complexity } = summarizeAndGradeText(inputValue);
 document.getElementById('textSummary').innerHTML = `Text Summary: <br><strong>${summary}</strong>`;
 document.getElementById('textComplexity').innerHTML = `Text Complexity: <br><strong>${complexity}</strong>`;

});