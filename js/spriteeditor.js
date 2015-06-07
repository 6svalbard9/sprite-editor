window.onbeforeunload = function() {
  return "Humm... Are you already done?";
};

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

		$('form  input').on('input change',function(e){
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

		$('#crop').on('click',function(){
			var x  = $('.rule-x'),
				y  = $('.rule-y'),
				xy = [x[0],x[1],y[0],y[1]];
				//console.log(xy);
				xy.forEach(function(arr,index){
					if($(arr).css('top')==='auto')
						$(arr).css({'top':'0px'});
					if($(arr).css('left')==='auto')
						$(arr).css({'left':'15px'});
				});

				console.log(xy);
				//TODO must optimize
				var top0 = parseInt($(xy[0]).css('top').replace('px','')),
					top1 = parseInt($(xy[1]).css('top').replace('px',''));

					console.log('bool',top0 > top1);
				if(top0 > top1){
					$('#height').val((top0-top1)).trigger('change');
					$('#background-position-y').val('-'+(top1)).trigger('change');
				}
				else if(top0 < top1){
					$('#height').val((top1-top0)).trigger('change');
					$('#background-position-y').val('-'+(top0)).trigger('change');
				}


				var left0 = parseInt($(xy[2]).css('left').replace('px','')),
					left1 = parseInt($(xy[3]).css('left').replace('px',''));
				if(left0 > left1){
					$('#width').val((left0-left1)).trigger('change');
					$('#background-position-x').val('-'+(left1)).trigger('change');
				}
				else if(left0 < left1){
					$('#width').val((left1-left0)).trigger('change');
					$('#background-position-x').val('-'+(left0)).trigger('change');
				}

				$('.rule-x,.rule-y').css({'top':0,'left':0}).hide();
				$('#spriteOperations > label > input[type=\'checkbox\']').prop('checked',false);
		});

		$('.rule-y').draggable({axis:'x',containment:'#spriteContainer'});
		$('.rule-x').draggable({axis:'y',containment:'#spriteContainer'});

		$('#spriteOperations > label').on('click',function(e){
			var v = e.target.value;

			switch(v){
				case 'x-1':
				case 'x-2':
				case 'y-1':
				case 'y-2':
					var queryString = $('#rule-'+v);
					queryString.toggle();
				break;
				default   :
					//alert('mind keeping your hands out of the code??');
			}
		});

		$('#newSprite').on('click',function(){
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