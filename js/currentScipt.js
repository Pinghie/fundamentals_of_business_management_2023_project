var nodoInvCapacity;
var nodoDiffProducts;

var nodoSec2;

var nodoMaxCapacity;

var nodoEstimatedValue;
var nodoEstimatedOccupation;

var nProductsList;

function aggiornaEstimatedOccupation()
{
    maxCapacity = nodoMaxCapacity.value;
    if(maxCapacity)
        {
            result = 0;
            nProductsList = document.getElementsByName("nPiecesOfProductText");
            piecesOccupationList = document.getElementsByName("singlePieceOccupation");
            
            for(var i = 0; i < piecesOccupationList.length; i++)
                {
                    result += nProductsList[i].value*piecesOccupationList[i].value;
                }
            
            result = (result * 100)/maxCapacity;
            nodoEstimatedOccupation.innerHTML = Math.round(result*100)/100 + "%";
            
            aggiornaPredictedEstimatedInventory();
        }
}

function aggiornaEstimatedValue()
{
    var result = 0;
    nProductsList = document.getElementsByName("nPiecesOfProductText");
    //estimatedValuesList = document.getElementsByName("estimatedValueOfPieceText");
    contributionMarginList = caricaContributionMarginTable();
    
    for(var i = 0; i < nProductsList.length; i++)
        {
            result = result + nProductsList[i].value * contributionMarginList[i];
        }
    
    finalResult = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    nodoEstimatedValue.innerHTML = finalResult + "€";
    aggiornaPredictedEstimatedValue();
}

function aggiornaTesto(elem, flag = 0)
{
    elem.nextSibling.nextSibling.value = elem.value;
    if(flag == 0)
        aggiornaEstimatedValue();
    else
        aggiornaPredictedEstimatedValue();
}

function aggiornaBarra(elem, flag = 0)
{
    elem.previousSibling.previousSibling.value = elem.value;
    if(flag == 0)
        aggiornaEstimatedValue();
    else
        aggiornaPredictedEstimatedValue();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function caricaContributionMarginTable()
{
    var estimatedValuesList = Array.from(document.getElementsByName("estimatedValueOfPieceText")).map(convertsNodeListToInts);
    var prodCostList = Array.from(document.getElementsByName("productionCostInputText")).map(convertsNodeListToInts);
    var purchCostList = Array.from(document.getElementsByName("purchaseCostInputText")).map(convertsNodeListToInts);
    
    var nProducts = estimatedValuesList.length;
    var nodoTabella = document.getElementById("contributionMarginTable");
    removeAllChildNodes(nodoTabella);
    
    var tr;
    var td;
    
    tr = document.createElement("TR");
    
    for(var i = 0; i < nProducts; i++)
        {
            td = document.createElement("TD");
            textNode = document.createTextNode("Product " + String.fromCharCode(65 + i));
            td.appendChild(textNode);
            tr.appendChild(td);
        }
    nodoTabella.appendChild(tr);
    
    tr = document.createElement("TR");
    
    var result = 0;
    var contributionMarginList = [];
    
    for(var i = 0; i < nProducts; i++)
        {
            td = document.createElement("TD");
            result = Math.round(estimatedValuesList[i] - (prodCostList[i] + purchCostList[i])/2);
            contributionMarginList.push(result);
            textNode = document.createTextNode(result + "€");
            td.appendChild(textNode);
            tr.appendChild(td);
        }
    nodoTabella.appendChild(tr);
    return contributionMarginList;
}

function caricaInfoProducts(nProducts)
{
    if(nProducts>0 && nProducts<26)
        {
            if(!nodoMaxCapacity.value)
                    nodoMaxCapacity.value = nProducts*1000;
            
            var nodoTabella = document.getElementById("primaTabellaID");
            removeAllChildNodes(nodoTabella);
            nodoSec2.style.display = "block";

            var tr;
            var td;
            var td1;
            var td2;
            var td3;
            var td4;
            var textNode;
            var rangeInput1;
            var textInput1;
            var rangeInput2;
            var textInput2;
            var textInput3;
            var br;
            
        
            //PRIMA RIGA
            tr = document.createElement("TR");
            td = document.createElement("TD");
            var listaTesti = ["", "Number of pieces", "Estimated selling price", "Transactions Cost", "Space occupied by each piece"];
            for(var i = 0; i < listaTesti.length; i++)
                {
                    td = document.createElement("TD");
                    textNode = document.createTextNode(listaTesti[i]);
                    td.appendChild(textNode);
                    tr.appendChild(td);
                }
            nodoTabella.appendChild(tr);

            for(var i = 0; i < nProducts; i++)
                {
                    tr = document.createElement("TR");
                    td1 = document.createElement("TD");
                    td2 = document.createElement("TD");
                    td3 = document.createElement("TD");
                    td31 = document.createElement("TD");
                    td4 = document.createElement("TD");

                    //PRIMA CELLA
                    textNode = document.createTextNode("Product " + String.fromCharCode(65 + i));
                    td1.appendChild(textNode);

                    //SECONDA CELLA
                    name = "nPiecesOfProduct"
                    rangeInput1 = document.createElement("INPUT");
                    rangeInput1.setAttribute("type", "range");
                    rangeInput1.setAttribute("name", name);
                    rangeInput1.setAttribute("id", name + i);
                    rangeInput1.setAttribute("min", 1);
                    rangeInput1.setAttribute("max", 1000);
                    rangeInput1.setAttribute("value", 500);
                    rangeInput1.setAttribute("oninput", "aggiornaTesto(this);aggiornaEstimatedOccupation()");

                    td2.appendChild(rangeInput1);

                    br = document.createElement("BR");
                    td2.appendChild(br);

                    textInput1 = document.createElement("INPUT");
                    textInput1.setAttribute("type", "number");
                    textInput1.setAttribute("name", name + "Text");
                    textInput1.setAttribute("id", name + "Text" + i);
                    textInput1.setAttribute("value", 500);
                    textInput1.setAttribute("oninput", "aggiornaBarra(this);aggiornaEstimatedOccupation()");
                    //textInput1.classList.add("tableTextInput");

                    td2.appendChild(textInput1);

                    //TERZA CELLA
                    name = "estimatedValueOfPiece"
                    rangeInput2 = document.createElement("INPUT");
                    rangeInput2.setAttribute("type", "range");
                    rangeInput2.setAttribute("name", name);
                    rangeInput2.setAttribute("id", name + i);
                    rangeInput2.setAttribute("min", 1);
                    rangeInput2.setAttribute("max", 100);
                    rangeInput2.setAttribute("value", 30);
                    rangeInput2.setAttribute("oninput", "aggiornaTesto(this)");

                    td3.appendChild(rangeInput2);

                    br = document.createElement("BR");
                    td3.appendChild(br);

                    textInput2 = document.createElement("INPUT");
                    textInput2.setAttribute("type", "number");
                    textInput2.setAttribute("name", name + "Text");
                    textInput2.setAttribute("id", name + "Text" + i);
                    textInput2.setAttribute("value", 30);
                    textInput2.setAttribute("oninput", "aggiornaBarra(this)");
                    //textInput2.classList.add("tableTextInput");

                    td3.appendChild(textInput2);
                    
                    //TERZA CELLA
                    textNode = document.createTextNode("Production Cost");
                    label1 = document.createElement("LABEL");
                    label1.appendChild(textNode);

                    name = "productionCostInput"
                    textInput1 = document.createElement("INPUT");
                    textInput1.setAttribute("type", "number");
                    textInput1.setAttribute("name", name + "Text");
                    textInput1.setAttribute("min", 0);
                    textInput1.setAttribute("value", 0);
                    textInput1.setAttribute("oninput", "aggiornaEstimatedValue();aggiornaPredictedEstimatedValue();");

                    textNode = document.createTextNode("Purchase Cost");
                    label2 = document.createElement("LABEL");
                    label2.appendChild(textNode);

                    name = "purchaseCostInput"
                    textInput2 = document.createElement("INPUT");
                    textInput2.setAttribute("type", "number");
                    textInput2.setAttribute("name", name + "Text");
                    textInput2.setAttribute("min", 0);
                    textInput2.setAttribute("value", 0);
                    textInput2.setAttribute("oninput","aggiornaEstimatedValue();aggiornaPredictedEstimatedValue();");

                    td31.appendChild(label1);
                    td31.appendChild(document.createElement("BR"));
                    td31.appendChild(textInput1);
                    td31.appendChild(document.createElement("BR"));
                    td31.appendChild(label2);
                    td31.appendChild(document.createElement("BR"));
                    td31.appendChild(textInput2);
                    

                    //QUINTA CELLA
                    textInput3 = document.createElement("INPUT");
                    textInput3.setAttribute("type", "number");
                    textInput3.setAttribute("value", 1);
                    textInput3.setAttribute("min", 1);
                    textInput3.setAttribute("name", "singlePieceOccupation");
                    textInput3.setAttribute("oninput", "aggiornaEstimatedOccupation()");
                    //textInput3.classList.add("tableTextInput");

                    td4.appendChild(textInput3);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td31);
                    tr.appendChild(td4);

                    nodoTabella.appendChild(tr);
                }
            
            caricaContributionMarginTable(nProducts);
            caricaInfoPredictedProducts(nProducts);
            aggiornaEstimatedValue();
            aggiornaEstimatedOccupation();
        }
}

function gestoreLoad1()
{
    nodoInvCapacity = document.getElementById("inventory_capacity_ID");
    nodoDiffProducts = document.getElementById("different_products_ID");
    
    nodoSec2 =  document.getElementById("sec2ID");
    
    nodoMaxCapacity = document.getElementById("inventory_capacity_ID");
    nodoMaxCapacity.addEventListener("input", aggiornaEstimatedOccupation);
    
    nodoEstimatedValue = document.getElementById("estimatedValueID");
    nodoEstimatedOccupation = document.getElementById("estimatedOccupationID");
}