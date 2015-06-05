// window.onbeforeunload = function() {
//   return "Humm... Are you already done?";
// };

var fileReader = new FileReader();
		fileReader.onload = function(e){
			$('#hinaExample').css('background', 'url(\''+e.target.result+'\') no-repeat');
		}

		$('input[type=\'file\']').on('change',function(e){
 				var	files = event.target.files;
 			 	fileReader.readAsDataURL(files[0]);
		});

		$('#imageUrl').on('change',function(e){
			$('#hinaExample').css('background','url(\''+e.target.value+'\') no-repeat');
		});

		$('form  input').on('input',function(e){
			'use strict';

			var inputName = $(e.target).attr('id'),
				hina      = $('#hinaExample');

			switch(inputName){
				case 'width'                 :
				case 'height'                :
				case 'background-position-x' :
				case 'background-position-y' :
				case 'margin-left'    :
				case 'margin-top'     :
				case 'margin-right'   :
				case 'margin-bottom'  :
					hina.css(inputName, $('#'+inputName).val()+'px');
					break;
				case 'className' :
					console.log(inputName+' <-- ill do it later');
					break;
				default :
					alert('thanks for playing with the code =(');
			}
		});

		$('#spriteOperations > label').on('click',function(e){
			var v = e.target.value;

			switch(v){
				case 'x-1':
				case 'x-2':
				case 'y-1':
				case 'y-2':
					$('#rule-'+v).toggle();
				break;
				default   :
					alert('mind keeping your hands out of the code??');
			}
		});

		$('button').on('click',function(){
			'use strict';

			var vals = $('#spriteValues').serializeArray(),
				results = '.'+vals[0].value+'{';

			//vals 0 is className
			

			vals.shift();
			vals.forEach(function(obj){
				results += '<br><span class=\'tab\'></span>'+obj.name+' : '+obj.value+';';
			});

			results += '<br>}'
			console.log(results);
			$('code').html($('code').html()+'<br><br>'+results);
		});