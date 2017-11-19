$( ":checkbox" ).on( "click", function() {

	var filter = new Filter();
	$.each($("input[name='manufacturer']:checked"), function(){            
		filter.filterManufacturer.push($(this).val());
	});
	$.each($("input[name='storage']:checked"), function(){            
		filter.filterStorage.push(parseInt($(this).val()));
	});
	$.each($("input[name='os']:checked"), function(){            
		filter.filterOs.push($(this).val());
	});
	$.each($("input[name='camera']:checked"), function(){            
		filter.filterCamera.push(parseInt($(this).val()));
	});

	filter.getJSON(filter.filterManufacturer, filter.filterStorage, filter.filterOs, filter.filterCamera);
});

$('#btn').click(function(){
	$("input[type='checkbox']").attr("checked",false);
});

function Filter() {
	this.filterManufacturer = [];
	this.filterStorage = [];
	this.filterOs = [];
	this.filterCamera = [];


	var MatchFilter = function(filter,type)
	{
		if(filter.length === 0)
			return true;

		if( ( $.inArray(type,filter) > -1) )
			return true;

		return false;
	};


	this.getJSON = function(filterManufacturer, filterStorage, filterOs, filterCamera)
	{
		$.getJSON("products.json", function(products) {

			var output = '';

			for (i = 0; i < products.length; i++) {

				if(!MatchFilter(filterManufacturer,products[i].specs.manufacturer))
					continue;

				if(!MatchFilter(filterStorage,products[i].specs.storage))
					continue;

				if(!MatchFilter(filterOs,products[i].specs.os))
					continue;

				if(!MatchFilter(filterCamera,products[i].specs.camera))
					continue;

				output += '<li>';
				output += '<a href="#" class="product-photo">';
				output += '<img src="' + products[i].image.small + '" height="130" alt="' + products[i].name + '">';
				output += '</a>';
				output += '<h2><a href="#">' + products[i].name + '</a></h2>';
				output += '<ul class="product-description">';
				output += '<li><span>Manufacturer: </span>' + products[i].specs.manufacturer + '</li>';
				output += '<li><span>Storage: </span>' + products[i].specs.storage + ' GB</li>';
				output += '<li><span>OS: </span>'+ products[i].specs.os + '</li>';
				output += '<li><span>Camera: </span>' + products[i].specs.camera + ' Mpx</li>';
				output += '<li><span>Description: </span>' + products[i].description + '</li>';
				output += '</ul>';
				output += '<p class="product-price"> £' + products[i].price + '</p>';
				output += '</li>';
			}

			if(output.length === 0) {
				$( "#notification" ).html('<div id="notification" class="alert alert-warning "><center><strong>Sorry!</strong> There are no phones matching the filter.</center></div>');
				$( ".products-list" ).html(output);
			}
			else
			{
				$( "#notification" ).html('<div id="notification"> </div>');
				$( ".products-list" ).html(output);
			}
		});
	};

	this.getJSON(this.filterManufacturer, this.filterStorage, this.filterOs, this.filterCamera);
}

var myApp = new Filter();