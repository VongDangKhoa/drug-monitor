let url = location.host;//so it works locally and online

$("table").rtResponsiveTables();//for the responsive tables plugin

$("#add_drug").submit(function(event){//on a submit event on the element with id add_drug
    alert($("#name").val() + " sent successfully!");//alert this in the browser
})



$("#update_drug").submit(function(event){// on clicking submit
    event.preventDefault();//prevent default submit behaviour

    //var unindexed_array = $("#update_drug");
    var unindexed_array = $(this).serializeArray();//grab data from form
    var data = {}

    $.map(unindexed_array, function(n, i){//assign keys and values from form data
        data[n['name']] = n['value']
    })


    var request = {//use a put API request to use data from above to replace what's on database
    "url" : `http://${url}/api/drugs/${data.id}`,
    "method" : "PUT",
    "data" : data
}

$.ajax(request).done(function(response){
    alert(data.name + " Updated Successfully!");
		window.location.href = "/manage";//redirects to index after alert is closed
    })

})

if(window.location.pathname == "/manage"){//since items are listed on manage
    $ondelete = $("table tbody td a.delete"); //select the anchor with class delete
    $ondelete.click(function(){//add click event listener
        let id = $(this).attr("data-id") // pick the value from the data-id

        let request = {//save API request in variable
            "url" : `http://${url}/api/drugs/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this drug?")){// bring out confirm box
            $.ajax(request).done(function(response){// if confirmed, send API request
                alert("Drug deleted Successfully!");//show an alert that it's done
                location.reload();//reload the page
            })
        }

    })
}

// if(window.location.pathname == "/purchase"){
// //$("#purchase_table").hide();

// $("#drug_days").submit(function(event){//on a submit event on the element with id add_drug
//     event.preventDefault();//prevent default submit behaviour
//     $("#purchase_table").show();
//     days = +$("#days").val();
//     alert("Drugs for " + days + " days!");//alert this in the browser
// })

// }
if(window.location.pathname == "/purchase"){
    $("#drug_days").submit(function(event){
        event.preventDefault();
        $("#purchase_table").show();

        let days = +$("#days").val();

        // Lấy tất cả dòng trong bảng purchase_list
        $("#purchase_list tr").each(function(){
            let perDay = parseInt($(this).find("td:nth-child(2)").text());
            let total = perDay * days;
            $(this).find("td:nth-child(3)").text(total);
        });

        alert("Drugs for " + days + " days calculated!");
    });
}

//Buy drugs
// =================== PURCHASE PAGE HANDLERS ===================
if (window.location.pathname == "/purchase") {
    let purchasedDrugs = [];

    $("#drug_days").submit(function(event){
        event.preventDefault();
        $("#purchase_table").show();

        let days = +$("#days").val();
        let drugs = window.drugsData || []; // được render từ server

        let rows = "";
        purchasedDrugs = [];

        drugs.forEach((drug, i) => {
            let pills = days * drug.perDay;
            let cards = Math.ceil(pills / drug.card);
            let packs = Math.ceil(pills / drug.pack);

            rows += `
                <tr>
                  <td>${i + 1}</td>
                  <td>${drug.name}</td>
                  <td>${cards}</td>
                  <td>${packs}</td>
                </tr>
            `;

            purchasedDrugs.push({
                name: drug.name,
                cards,
                packs
            });
        });

        $("#purchase_table tbody").html(rows);
    });

    // Khi nhấn Buy Now
    $("#btnPurchase").click(function(){
        let query = encodeURIComponent(JSON.stringify(purchasedDrugs));
        window.location.href = "/purchased?drugs=" + query;
    });

    // Nút in danh sách
    $("#btnPrint").click(function(){
        window.print();
    });
}


