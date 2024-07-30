var nodoPredictedValue;
var nodoProfitPredictedValue;
var nodoPredictedInventory;
var nodoProfitPredictedInventory;

var nodoTransactionCost;

function aggiornaPredictedEstimatedInventory()
{
    var result = 0;
    
    var actualInv = parseFloat(document.getElementById("estimatedOccupationID").innerHTML);
    
    nPiecesSoldList = document.getElementsByName("nPiecesSoldPredictedText");
    nPiecesProducedList = document.getElementsByName("nPiecesProducedPredictedText");
    nPiecesPurchasedList = document.getElementsByName("nPiecesPurchasedPredictedText");
    
    singlePieceOccupationList = document.getElementsByName("singlePieceOccupation");
    
    for(var i = 0; i < nPiecesSoldList.length; i++)
        {
            result -= nPiecesSoldList[i].value * singlePieceOccupationList[i].value;
            result += nPiecesProducedList[i].value * singlePieceOccupationList[i].value;
            result += nPiecesPurchasedList[i].value * singlePieceOccupationList[i].value;
        }

    finalResult = (result * 100)/maxCapacity + actualInv;
    
    nodoPredictedInventory.innerHTML = Math.round(finalResult*100)/100 + "%";
    
    var sign = "+";
    if(result >= 0)
        {
            sign = "+";
            nodoProfitPredictedInventory.style.color = "#00ff00";
        }
    else
        {
            sign = "-";
            nodoProfitPredictedInventory.style.color = "red";
        }

    result = (result * 100)/maxCapacity;
    nodoProfitPredictedInventory.innerHTML = "(" + sign + Math.round(result*100)/100 + "%)";
}

function convertsNodeListToInts(node)
{
    return parseInt(node.value);
}

function aggiornaPredictedEstimatedValue()
{
    var result = 0;
    var depreciationImpact = 0;
    var cost_profit = 0;
    
    nProductsList = Array.from(document.getElementsByName("nPiecesOfProductText")).map(convertsNodeListToInts);
    
    estimatedValuesList = Array.from(document.getElementsByName("estimatedValueOfPieceText")).map(convertsNodeListToInts);
    contributionMarginList = caricaContributionMarginTable();
    
    estimatedValuesVariationList = Array.from(document.getElementsByName("valueVariationRange")).map(convertsNodeListToInts);
    
    nPiecesSoldList = Array.from(document.getElementsByName("nPiecesSoldPredictedText")).map(convertsNodeListToInts);
    nPiecesProducedList = Array.from(document.getElementsByName("nPiecesProducedPredictedText")).map(convertsNodeListToInts);
    nPiecesPurchasedList = Array.from(document.getElementsByName("nPiecesPurchasedPredictedText")).map(convertsNodeListToInts);
    
    prodCostList = Array.from(document.getElementsByName("productionCostInputText")).map(convertsNodeListToInts);
    purchCostList = Array.from(document.getElementsByName("purchaseCostInputText")).map(convertsNodeListToInts);
    
    for(var i = 0; i<nProductsList.length; i++)
        {
            depreciationImpact += nProductsList[i] * (estimatedValuesVariationList[i]);
            result -= nPiecesSoldList[i] * (contributionMarginList[i] + estimatedValuesVariationList[i]);
            if(nPiecesProducedList[i])
                result += nPiecesProducedList[i] * (contributionMarginList[i] + estimatedValuesVariationList[i]);
            if(nPiecesPurchasedList[i])
                result += nPiecesPurchasedList[i] * (contributionMarginList[i] + estimatedValuesVariationList[i]);
            
            cost_profit += nPiecesSoldList[i] * (estimatedValuesList[i] + estimatedValuesVariationList[i]);
            cost_profit -= nPiecesProducedList[i] * prodCostList[i];
            cost_profit -= nPiecesPurchasedList[i] * purchCostList[i];
        }
    
    var estInvValue = parseInt(document.getElementById("estimatedValueID").innerHTML.replace(".", ""));
    finalResult = result + estInvValue + depreciationImpact; 
    finalResult = finalResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    nodoPredictedValue.innerHTML = finalResult + "€";
    
    var nodoDepreciation = document.getElementById("depreciationCostID");
    
    var sign = "+";
    if(depreciationImpact >= 0)
        {
            sign = "+";
            nodoDepreciation.style.color = "#00ff00";
        }
    else
        {
            sign = "-";
            nodoDepreciation.style.color = "red";
        }
    
    var depreciationImpactText = depreciationImpact.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    nodoDepreciation.innerHTML = depreciationImpactText + "€";
    
    
    result += depreciationImpact;
    
    sign = "+";
    if(result >= 0)
        {
            sign = "+";
            nodoProfitPredictedValue.style.color = "#00ff00";
        }
    else
        {
            sign = "-";
            nodoProfitPredictedValue.style.color = "red";
        }
    
    result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    nodoProfitPredictedValue.innerHTML = "(" + sign +result + "€)";
    

    if(cost_profit >= 0)
        nodoTransactionCost.style.color = "#00ff00";
    else
        nodoTransactionCost.style.color = "red";

    cost_profit = cost_profit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    nodoTransactionCost.innerHTML = cost_profit + "€";
}

/*
function sbloccaRange(elem, c)
{
    if (c == "production")
        {
            var elemNameToCheck = "productionCostInputText";
            var rangeNameToCheck = "nPiecesProducedPredictedRange";
            var textNameToCheck = "nPiecesProducedPredictedText";
        }
    else
        {
            var elemNameToCheck = "purchaseCostInputText";
            var rangeNameToCheck = "nPiecesPurchasedPredictedRange";
            var textNameToCheck = "nPiecesPurchasedPredictedText";
        }
    var nextTDchildren = elem.parentNode.nextSibling.childNodes;
    for(var i = 0; i < nextTDchildren.length; i++)
        {
            if(elem.name == elemNameToCheck)
                {
                    if(nextTDchildren[i].name == rangeNameToCheck || nextTDchildren[i].name == textNameToCheck)
                        {
                            nextTDchildren[i].disabled = false;
                        }
                }
        }
}
*/

function caricaInfoPredictedProducts(nProducts, nProductsList)
{
    var nodoTabella2 = document.getElementById("secondaTabellaID");
    removeAllChildNodes(nodoTabella2);
    
    //PRIMA RIGA
    tr = document.createElement("TR");
    td = document.createElement("TD");
    var listaTesti = ["", "Selling price variation", "Transactions"];
    for(var i = 0; i < listaTesti.length; i++)
        {
            td = document.createElement("TD");
            textNode = document.createTextNode(listaTesti[i]);
            td.appendChild(textNode);
            tr.appendChild(td);
        }
    nodoTabella2.appendChild(tr);
    
    for(var i = 0; i < nProducts; i++)
        {
            tr = document.createElement("TR");
            td1 = document.createElement("TD");
            td12 = document.createElement("TD");
            td2 = document.createElement("TD");
            td3 = document.createElement("TD");
            
            //PRIMA CELLA
            textNode = document.createTextNode("Product " +String.fromCharCode(65 + i));
            td1.appendChild(textNode);
            
            //SECONDA CELLA
            textNode = document.createTextNode("Depreciation / Apreciation entity");
            label1 = document.createElement("LABEL");
            label1.appendChild(textNode);
            
            name = "valueVariation"
            rangeInput1 = document.createElement("INPUT");
            rangeInput1.setAttribute("type", "range");
            rangeInput1.setAttribute("name", name + "Range");
            rangeInput1.setAttribute("min", -50);
            rangeInput1.setAttribute("max", 50);
            rangeInput1.setAttribute("value", 0);
            rangeInput1.setAttribute("oninput","aggiornaTesto(this, 1);aggiornaPredictedEstimatedValue()");
            
            textInput1 = document.createElement("INPUT");
            textInput1.setAttribute("type", "number");
            textInput1.setAttribute("name", name + "Text");
            textInput1.setAttribute("min", -50);
            textInput1.setAttribute("max", 50);
            textInput1.setAttribute("value", 0);
            textInput1.setAttribute("oninput","aggiornaBarra(this, 1);aggiornaPredictedEstimatedValue()");
            
            td12.appendChild(label1);
            td12.appendChild(document.createElement("BR"));
            td12.appendChild(rangeInput1);
            td12.appendChild(document.createElement("BR"));
            td12.appendChild(textInput1);
            
            /*
            //TERZA CELLA
            textNode = document.createTextNode("Production Cost");
            label1 = document.createElement("LABEL");
            label1.appendChild(textNode);
            
            name = "productionCostInput"
            textInput1 = document.createElement("INPUT");
            textInput1.setAttribute("type", "number");
            textInput1.setAttribute("name", name + "Text");
            textInput1.setAttribute("value", 0);
            textInput1.setAttribute("oninput", "aggiornaPredictedEstimatedValue();sbloccaRange(this, 'production')");
            
            textNode = document.createTextNode("Purchase Cost");
            label2 = document.createElement("LABEL");
            label2.appendChild(textNode);
            
            name = "purchaseCostInput"
            textInput2 = document.createElement("INPUT");
            textInput2.setAttribute("type", "number");
            textInput2.setAttribute("name", name + "Text");
            textInput2.setAttribute("value", 0);
            textInput2.setAttribute("oninput","aggiornaPredictedEstimatedValue();sbloccaRange(this, 'purchase')");
            
            td2.appendChild(label1);
            td2.appendChild(document.createElement("BR"));
            td2.appendChild(textInput1);
            td2.appendChild(document.createElement("BR"));
            td2.appendChild(label2);
            td2.appendChild(document.createElement("BR"));
            td2.appendChild(textInput2);
            */
            
            //TERZA CELLA
            textNode = document.createTextNode("Number of pieces sold");
            label1 = document.createElement("LABEL");
            label1.appendChild(textNode);
            
            name = "nPiecesSoldPredicted"
            rangeInput1 = document.createElement("INPUT");
            rangeInput1.setAttribute("type", "range");
            rangeInput1.setAttribute("name", name + "Range");
            rangeInput1.setAttribute("min", 0);
            rangeInput1.setAttribute("max", 1000);
            rangeInput1.setAttribute("value", 0);
            rangeInput1.setAttribute("oninput","aggiornaTesto(this, 1);aggiornaPredictedEstimatedInventory()");
            
            textInput1 = document.createElement("INPUT");
            textInput1.setAttribute("type", "number");
            textInput1.setAttribute("name", name + "Text");
            textInput1.setAttribute("min", 0);
            textInput1.setAttribute("max", 1000);
            textInput1.setAttribute("value", 0);
            textInput1.setAttribute("oninput","aggiornaBarra(this, 1);aggiornaPredictedEstimatedInventory()");
            
            
            textNode = document.createTextNode("Number of pieces produced");
            label2 = document.createElement("LABEL");
            label2.appendChild(textNode);
            
            name = "nPiecesProducedPredicted"
            rangeInput2 = document.createElement("INPUT");
            rangeInput2.setAttribute("type", "range");
            rangeInput2.setAttribute("name", name + "Range");
            rangeInput2.setAttribute("min", 0);
            rangeInput2.setAttribute("max", 500);
            rangeInput2.setAttribute("value", 0);
            rangeInput2.setAttribute("oninput","aggiornaTesto(this, 1);aggiornaPredictedEstimatedInventory()");
            
            textInput2 = document.createElement("INPUT");
            textInput2.setAttribute("type", "number");
            textInput2.setAttribute("name", name + "Text");
            textInput2.setAttribute("min", 0);
            textInput2.setAttribute("max", 500);
            textInput2.setAttribute("value", 0);
            textInput2.setAttribute("oninput","aggiornaBarra(this, 1);aggiornaPredictedEstimatedInventory()");
            
            textNode = document.createTextNode("Number of pieces purchased");
            label3 = document.createElement("LABEL");
            label3.appendChild(textNode);
            
            name = "nPiecesPurchasedPredicted"
            rangeInput3 = document.createElement("INPUT");
            rangeInput3.setAttribute("type", "range");
            rangeInput3.setAttribute("name", name + "Range");
            rangeInput3.setAttribute("min", 0);
            rangeInput3.setAttribute("max", 500);
            rangeInput3.setAttribute("value", 0);
            rangeInput3.setAttribute("oninput","aggiornaTesto(this, 1);aggiornaPredictedEstimatedInventory()");
            
            textInput3 = document.createElement("INPUT");
            textInput3.setAttribute("type", "number");
            textInput3.setAttribute("name", name + "Text");
            textInput3.setAttribute("min", 0);
            textInput3.setAttribute("max", 500);
            textInput3.setAttribute("value", 0);
            textInput3.setAttribute("oninput","aggiornaBarra(this, 1);aggiornaPredictedEstimatedInventory()");
            
            td3.appendChild(label1);
            td3.appendChild(document.createElement("BR"));
            td3.appendChild(rangeInput1);
            td3.appendChild(document.createElement("BR"));
            td3.appendChild(textInput1);
            td3.appendChild(document.createElement("BR"));
            td3.appendChild(label2);
            td3.appendChild(document.createElement("BR"));
            td3.appendChild(rangeInput2);
            td3.appendChild(document.createElement("BR"));
            td3.appendChild(textInput2);
            td3.appendChild(document.createElement("BR"));
            td3.appendChild(label3);
            td3.appendChild(document.createElement("BR"));
            td3.appendChild(rangeInput3);
            td3.appendChild(document.createElement("BR"));
            td3.appendChild(textInput3);
            
            tr.appendChild(td1);
            tr.appendChild(td12);
            //tr.appendChild(td2);
            tr.appendChild(td3);
            nodoTabella2.appendChild(tr);
        }
}

function gestoreLoad2()
{
    nodoPredictedValue = document.getElementById("predictedValueID");
    nodoProfitPredictedValue = document.getElementById("predictedPlusValueID");
    nodoPredictedInventory = document.getElementById("predictedOccupationID");
    nodoProfitPredictedInventory = document.getElementById("predictedPlusOccupationID")
    nodoTransactionCost = document.getElementById("transactionsCostID");
}