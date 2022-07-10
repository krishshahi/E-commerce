let products = [
    {
        title: "Product 1",
        price: 100,
        discount: 10,
        after_discount: 90
    }
];

showData();

function addProduct(){
    // variable re-initialize
    let title = prompt("Enter the product Title: ");    
    // title = "Test"
    let price = Number(prompt("Enter the product price: "));
    let discount = Number(prompt("Enter the product Discount: "));
    // populate these values in that products 
    let after_discount = price - price * discount /100;

    let prod = {
        title: title,
        price: price,
        discount: discount,
        after_discount: after_discount
    }

    products.push(prod);

    showData();
    
}
// 

let tab_col = ["S.N.", "Title", "Price", "Discount","After Discount"];

let col_header = "";
for(let i = 0; i< tab_col.length; i++){
    col_header += "<th>"+tab_col[i]+"</th>";
}
document.getElementById('tab_header').innerHTML = col_header

function showData(){
    let table_html = "";

    for(let i =0; i < products.length; i++){
        table_html += "<tr id='row_"+i+"'>";
        table_html += `<td>${i+1}</td>`;      // template literals
        let values = Object.values(products[i]);
        
        for(let j = 0; j < values.length; j++){
            table_html += "<td>"+values[j]+"</td>";     
        }
        table_html += "</tr>";
    }
    document.getElementById('content').innerHTML = table_html;

}