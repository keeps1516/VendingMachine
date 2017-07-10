$(document) .ready(function (){
    loadItems();
    hidebutton();
    
   
    $('#makePurchasebutton').click(function(){
        $('#changebutton2').show();
        $('#changebutton').hide();
    });
    
});

function loadItems() {
    var contentboxes = $('#itemsDiv');

    $.ajax({
        type: 'GET',
        url:'http://localhost:8080/items',
        success: function(itemarray){
            $.each(itemarray, function(index, item){
                var id = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                var box = '<div class= "container col-sm-4"> <div class= "well" id="candy'+ item.id+'">';

                box += '<p> Item # ' + id + '</p>';
                box += '<center><p>' + name + '</p>';
                box += '<p>$ ' + price.toFixed(2) + '</p>';
                box += '<p> Quantity Available: ' + quantity + '</p></center>';

                box += '</div> </div>'
                contentboxes.append(box);

                $('#candy' + item.id + "").on("click", function(){
                    $("#itemDisplay").text(id);
                })

            });
        },
        error: function(){

        }
    });
}

function hidebutton(){
     $('#changebutton2').hide();
}

$('#changebutton2').click(function(){
    $('#totalDisplay').text('0.00');
    $('#itemDisplay').text('');
    $('#messagesPanel').text('');
    $('#itemsDiv').text('');
    $('#changeDisplay').text('0.00');
    $('#changebutton2').hide();
    $('#changebutton').show();
    loadItems();
    
});

$('.addMoneyButton').click(function(){
   var input=$(this).val();
   var money = parseFloat($('#totalDisplay').text()); 
   var quarters;
   switch(input){
       case "1":
       money+=1;
       break;
       case ".25":
       money+=.25;
       break;
       case ".1":
       money+=.1;
       break;
       case ".05":
       money+=.05;
       break;
   }
$('#totalDisplay').text(money.toFixed(2).toString());
});

$('.addMoneyButton').click(function(){
    var input=$(this).val();
    var quartercounter =parseFloat($('#changeDisplay2').text());
    switch(input){
        case ".25":
        quartercounter++;
        break;
    }
$('#changeDisplay2').text(quartercounter);
});



$('#makePurchasebutton').click(function(){
    var amount = $('#totalDisplay').text();
    var id = $('#itemDisplay').text();

    $.ajax({
        type: 'GET',
        url:'http://localhost:8080/money/' + amount + '/item/' + id,
        success: function(change){
           var quarters = change.quarters;
            var dimes = change.dimes;
            var nickels = change.nickels;
            var pennies = change.pennies;
            $('#changeDisplay').text(quarters.toString() + ':Quarters '+ dimes.toString() + ':Dimes ' +nickels.toString() + ':Nickels ' + pennies.toString() + ':Pennies');
            $('#messagesPanel').text('Thank You');
            
        },
        error: function(errorMessage){
        $("#messagesPanel").text(errorMessage.responseJSON.message);
                
        }
    })
});

$('#changebutton').click(function(){
    $('#changeDisplay').text('');
    var input = $('#totalDisplay').text();
    var total = (input *100).toFixed(2);
    var change = Math.floor(total);
        var quarters =0;
        var dimes = 0;
        var nickels = 0;
        var pennies = 0;
        var changestring;
    quarters = Math.floor(change/ 25);
    dimes = Math.floor((change - (25*quarters))/10);
    nickels = Math.floor(((change - ((25*quarters)+ (10 * dimes)))/5 )); 
    pennies = Math.floor((change - ((25 * quarters)+ (10 * dimes) + (5 * nickels))) );
    if(quarters > 0){
        $('#changeDisplay').append('<center><h3>'+ quarters + ' Quarter(s)</h3></center>');
    }
    if(dimes > 0){
        $('#changeDisplay').append('<center><h3>'+ dimes + ' Dime(s)</h3></center>');
    }
    if(nickels > 0){
        $('#changeDisplay').append('<center><h3>'+ nickels + ' Nickel(s)</h3></center>');
    }
    if(pennies > 0){
        $('#changeDisplay').append('<center><h3>'+ pennies + ' Pennies</h3></center>');
    }
    $('#totalDisplay').text('0.00');
    $('#itemDisplay').text('');
    $('#messagesPanel').text('');
    $('#itemsDiv').text('');
    loadItems();
});