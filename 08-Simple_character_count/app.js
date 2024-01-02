function countCharacters() {
    var text = document.getElementById("inputText").value; // Get the text entered by the user from the textarea

    var charCount = {}; // empty object to store character counts

    // Iterate through each character in the input text 
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i);  //it retrieves the character at the current index i


        if (charCount[char] === undefined) {
            // If not, initialize its count to 1 (new character)
            charCount[char] = 1;
        }
        else {
            // If it exists, increment its count by 1
            charCount[char]++;
        }

    } //END for LOOP


    var result = "<table>";
    result += "<tr><th>Character</th><th>Count</th></tr>";
    // console.log(charCount)

    // Iterate through the charCount object (var is the index of cahrCount (character) ---> charCount[char] is the character count (Number)
    for (var char in charCount) {
        // Append character and its count to the result string
        result += "<tr><td>" + char + "</td><td>" + charCount[char] + "</td></tr>";

    }

    result += "</table>";

    // Display the final result
    document.getElementById("result").innerHTML = result;
}