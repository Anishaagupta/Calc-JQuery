window.onload = function() {
    var inputToDisplay = [];
    var result = 0;
    var currResult = 0;
    var currValue = [];
    var currOperator = "+";
  
    //handle digits 
    $(".digit").each(function(index, button) {
      var digit = $(this).text();
      $(this).click(function(e) {
        if (currValue.length < 8) {
          if (inputToDisplay.length === 0) {
            $("#all-input").text("0");
            result = 0;
          }
          if (!(currValue.length === 0 && digit == "0")) {
            currValue.push(digit);
            $("#result").text(currValue.join(""));
          }
        }
      });
    });
    
    //handle dot
    $(".dot").click(function(e) {
      var dot = $(this).text();
      if (currValue.length === 0) {
        currValue.push("0");
      }
      if (currValue.length <8 && !currValue.includes(".")) {
        currValue.push(dot);
        $("#result").text(currValue.join(""));
      }
    })
  
    // handle math operators
    $(".operator").each(function(index, button) {
      var operator = $(this).text();
      $(this).click(function(e) {
        if (inputToDisplay.length < 17) {
          if (checkLastCharIsOperator(inputToDisplay) && currValue.length === 0) {
            inputToDisplay.pop();
            inputToDisplay.push(operator);
          }
          if (currValue.length !== 0) {
            if (currValue[currValue.length-1] === ".") {
              currValue.pop();
            }
            inputToDisplay.push(currValue.join(""));
            inputToDisplay.push(operator);
            currResult = calculate(currValue, currOperator, currResult);
          }
          if (currValue.length === 0 && result !== 0) {
            inputToDisplay.push(result);
            inputToDisplay.push(operator);
            currValue = [result];
            currResult = calculate(currValue, currOperator, currResult);
            result = 0;
          }
            currValue = [];
            currOperator = operator;
            $("#all-input").text(inputToDisplay.join(""));
            $("#result").text("0");
        }
      });
    });
  
    // clear all input
    $("#clear-all").click(function(e) {
      $("#all-input").text("0");
      $("#result").text("0");
      result = 0;
      currResult = 0;
      inputToDisplay = [];
      currValue = [];
    });
  
    // clear last number
    $("#clear-last").click (function (e) {
      if (currValue.length !== 0) {
        $("#result").text("0");
        currValue = [];
      }
      if (result !== 0) {
        result = 0;
        $("#result").text("0");
        $("#all-input").text("0");
      }
    });
  
  function calculate (value, currOperator, currResult) {
    if (currOperator === "+") {
      currResult += parseFloat(value.join(""));
    }
    else if (currOperator === "-") {
      currResult -= parseFloat(value.join(""));
    }
    else if (currOperator === "\xF7") {
      currResult /= parseFloat(value.join(""));
    }
    else if (currOperator === "\xD7") {
      currResult *= parseFloat(value.join(""));
    }
    return currResult;
  }
  
    // handle equal input
    $("#equal").click(function(e) {
      if (inputToDisplay.length !== 0 && currValue.length !== 0) {
        if (currValue[currValue.length-1] === ".") {
          currValue.pop();
        }
        inputToDisplay.push(currValue.join(""));
        inputToDisplay.push($(this).text());
        $("#all-input").text(inputToDisplay.join(""));
        currResult = calculate(currValue, currOperator, currResult);
        result = formatResult(currResult);
        $("#result").text(result);
        currValue = [];
        currOperator = "+";
        inputToDisplay = [];
        currResult = 0;
      }
    });
  }
  
  var operators =["-", "+", "\xD7", "\xF7"];
  
  // returns true if last input char is operator, if digit - false
  function checkLastCharIsOperator(input) {
    if (operators.includes(input[input.length - 1])) {
      return true;
    }
    else {
      return false;
    }
  }
  
  //format the result to fit in display
  function formatResult(result) {
    var result_string = result.toString();
    if (result_string.length > 8) {
      if (result_string.indexOf(".") !== -1 && result_string.indexOf(".") < 8) {
        result = result.toFixed(7-result_string.indexOf("."));
        while (result.endsWith("0")) {
          result = result.substring(0, result.length-1);
        }
      }
      else {
        result = "too big";
      }
    }
    return result;
  }