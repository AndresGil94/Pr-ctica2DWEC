let total = 0;

$(document).ready(function(){

    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = (day<10 ? '0' : '') + day + '/' + (month<10 ? '0' : '') + month + '/' + d.getFullYear();
  
    $("tfoot").append(output);
});



$("#agregarLinea").click(function() {

    var producto = $("#producto").val();
    var cantidad = $("#cantidad").val();
    var precioUnitario = $("#precio-unitario").val();
    var descuento = $("#descuento").val();
    var totalLinea = $("#total-linea").val();
   

    var dom = "<tr>" 
            + "<td class='productoArticulo'>" + producto + "</td>"
            + "<td class='cantidadArticulo'>" + cantidad + "</td>"
            + "<td class='precioUnitarioArticulo'>" + precioUnitario + "</td>"
            + "<td class='descuentoArticulo'>" + descuento + "</td>"
            + "<td class='totalLineaArticulo'>" + totalLinea + "</td>"
            + "<td><button class='borrar btn-success'> BORRAR </button> </td>"
            + "</tr>";

    $("table.table tbody").append(dom);
    total += parseInt(totalLinea);

    $(".borrar").on("click", function(e){
        e.stopImmediatePropagation();
        total -= parseInt($(this).parent().siblings(".totalLineaArticulo").html());
        $(this).closest("tr").remove();
        $("#base-imponible").html(total);
        $("#iva").html(total * 0.21);
        $("#total").html(total + parseInt($("#iva").html()));
    });

    $("#iva").html(total * 0.21);
    $("#base-imponible").html(total);
    $("#total").html(total + parseInt($("#iva").html()));
});

$("#cantidad, #precio-unitario").keyup(function() {

    var cantidad = $("#cantidad").val();
    var precioUnitario = $("#precio-unitario").val();

    $("#total-linea").val(cantidad * precioUnitario);
});

$("#descuento").mouseout(function() {

    var totalLinea = $("#total-linea").val();
    var descuento = $("#descuento").val();

    $("#total-linea").val(totalLinea - totalLinea * (descuento / 100));

});

$("#aplicarDescuento").click(function() {

    var descuentoLineas = $("#descuento-lineas").val();
    $(".descuentoArticulo").html(descuentoLineas);
    var totalLocal = 0;

    $(".totalLineaArticulo").each(function(){
        
        var totalLinea = $(this).siblings(".precioUnitarioArticulo").html() * $(this).siblings(".cantidadArticulo").html();
        var resultado = totalLinea - totalLinea * (descuentoLineas / 100);
        totalLocal += resultado;

        $(this).html(resultado);
     
    });

    total = totalLocal;
    $("#base-imponible").html(total);
    $("#iva").html(total * 0.21);
    $("#total").html(total + parseInt($("#iva").html()));
  
});



