/*Author: Vineel Boddula 
 Student Number: 101018032
*/
var user;
var totalNumOfGuess=0;
//var currentLevel = 4;
window.addEventListener('load',function(){
	//makeBoard(8);
	displayBoard();
	document.getElementById("btnGenerate").click = generateCode();
	document.getElementById("btnStringGenerator").click = stringGenerateCode();
	
});


  
 
  function displayBoard(){ 
    
	var $gameBoard = $("#gameBoard");
    //using two for loops to create row first then add that row to the table  
    for(var i =0; i < 8;i++){ 
      var $row = $("<tr>");//creating row
	  $row.addClass("row"+i);
      for(var j=0; j < 8;j++){
        var $card = $('<div>').addClass('card');
        //currentLevel = data.level;
        $card.attr("data-row",i);
        $card.attr("data-column",j);
        $card.attr("data-active","no");//is active, by default no
        $card.click(ifClickedCard);
		$card.append("<span class ='unflip'>"+0+'</span>');
        $row.append($card);
      }
    $gameBoard.append($row);      
    }
  }
  
  
function ifClickedCard(event) {
		var $target = $(event.target);
		console.log($target);
		revealTheCard($target);

}


function revealTheCard($target){ 
  console.log("revealTheCard function");
  var targetClassName = $target.attr('class');
    if( targetClassName == "card"){
      
        doAnimation($target);
        $target.attr('class', 'flippedCard');
        $target.data('active','yes');
		$target.text("");
        $target.append("<span class ='flip'>"+1+'</span>'); 
       
       
      
    }else if(targetClassName == 'unflip'){ 
		console.log($target);
		var par = $target.closest('div');
		doAnimation(par);
        par.attr('class', 'flippedCard');
        par.data('active','yes');
		par.text("");
        par.append("<span class ='flip'>"+1+'</span>'); 
       
		
	} else if (targetClassName == 'flip'){
		var par = $target.closest('div');
		par.attr('class','card');
		par.text("");
		par.append("<span class ='unflip'>"+0+'</span>'); 
       
	
	}else { 
		$target.attr('class','card');
		$target.text("");
		$target.append("<span class ='unflip'>"+0+'</span>'); 
       
	}
}


function doAnimation($target){ 
    $target.data("active","yes");
    
    $target.animate({deg: 360}, {
      duration: 500,
      //now is the deg which is 360
      step: function(now){
        $(this).css({
             transform: 'rotateX(' + now + 'deg)'
        });
      }
    });
    //doing the animation again to reset the deg value back to 0.
    $target.animate({deg: -360}, {
      duration: 1,
      step: function(now) {
        $(this).css({
            transform: 'rotateX(' + now + 'deg)'
        });
      }
    });
}
  
function generateCode(){ 
	
	var outputText = "";
	outputText ="byte sprite[] = {B";
	
	
	for(var i =0; i < 8; i++){
		
		var currRow = '.row'+i;
		var $divs = $(currRow).find('div');
		
		$.each($divs, function() {
			targetClassName = $(this).attr('class');
			if( targetClassName == "card"){
				outputText+='0';
			}else{ 
				outputText+='1';
				
			}
			
			//console.log("something"+$(this).text());
		});
		if(i <7){
			 outputText +=",B";
		}
		
	}
	outputText+='};';
	console.log(outputText);
		
	document.getElementById("txtGenerateCode").value = outputText;

}

function stringGenerateCode(){
	
	var input = document.getElementById("inputString").value.toUpperCase();
	input = input.replace(/\s+/g, '');
	
	var output = "void loop() {\n";
	output+= "\t int pulseDelay = 800;\n"          // milliseconds to wait between beats
  
	input = input.split('');
	
	for(var i =0; i < input.length;i++){
		output+="\t show(";
		output+="c"+input[i];
		output+=",2000); \n";
		output+="\t delay(100);\n";
		
	}
	output+="}";
	console.log("check everything");
	document.getElementById("txtGenerateCodeString").value = output;
	console.log(output);
	
}	
function makeBoard(size){
	//assume size%2==0
	
	items = [];
	for(var i=0;i<(size*size)/2;i++){
		items.push(i);
		items.push(i);
	}
	
	board = [];
	for(var i=0;i<size;i++){
		board[i]=[]
		for(var j=0;j<size;j++){
			var r = (Math.floor(Math.random()*items.length));
			board[i][j]= items.splice(r,1)[0];  //remove item r from the array
		}
	}
	return board;
}