var infoBoxesList;
var itContentBox;
var itBoxNode;
var dioContentBox;
var dioBoxNode;
var srContentBox;
var srBoxNode;
var frContentBox;
var frBoxNode;
var cccContentBox;
var cccBoxNode;
var pyContentBox;
var pyBoxNode;

function convertsNodeListToInts(node)
{
    return parseFloat(node.value);
}

function calcola(name)
{
    var risultato = 0;
    var inputList = document.getElementsByName(name);
    var nodoOutput = document.getElementById("output"+name);
    
    inputList = Array.from(document.getElementsByName(name)).map(convertsNodeListToInts);

    switch(name)
        {
            case "IT":
                risultato = inputList[0]/inputList[1];
                break;
            case "DIO":
                risultato = (inputList[0]/inputList[1])*inputList[2];
                break;
            case "SR":
                risultato = (inputList[0]/inputList[1])*100;
                break;
            case "FR":
                risultato = (inputList[0]/inputList[1])*100;
                break;
            case "CCC":
                risultato = (inputList[0]+inputList[1]-inputList[2]);
                break;
            case "PY":
                risultato = (inputList[0]/inputList[1]);
                break;
        }

    if(!isNaN(risultato))
        {
            risultato = Math.round(risultato*100)/100;
            risultato = risultato.toLocaleString("pt-BR");
            risultato = risultato.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            nodoOutput.innerHTML = name + " = " + risultato;
            
        }
}

function buttonClicked(button)
{
    var btnId = button.id;
    var buttons = document.getElementsByClassName("buttonKpi");
    
    for (let item of buttons) {
        item.classList.remove("pressed");
    }
    
    for (let item of infoBoxesList)
        {
            item.style.display = "none";
        }
    for(let item of contentBoxesList)
        {
            item.style.display = "none";
        }
    
    button.classList.add("pressed");
    
    switch(btnId)
        {
            case "inventoryTurnoverBtn":
                itBoxNode.style.display="block";
                itContentBox.style.display="block";
                break;
            case "DIOBtn":
                dioBoxNode.style.display="block";
                dioContentBox.style.display="block";
                break;
            case "srBtn":
                srBoxNode.style.display="block";
                srContentBox.style.display="block";
                break;
            case "frBtn":
                frBoxNode.style.display="block";
                frContentBox.style.display="block";
                break;
            case "cccBtn":
                cccBoxNode.style.display="block";
                cccContentBox.style.display="block";
                break;
            case "pyBtn":
                pyBoxNode.style.display="block";
                pyContentBox.style.display="block";
                break;
        }
}

function gestoreLoad()
{
    infoBoxesList = document.getElementsByClassName("infoBox");
    contentBoxesList = document.getElementsByClassName("contentBox");
    
    itBoxNode = document.getElementById("inventoryTurnoverBox");
    itContentBox = document.getElementById("itContentBox");
    
    dioBoxNode = document.getElementById("DIOBox");
    dioContentBox = document.getElementById("dioContentBox");
    
    srBoxNode = document.getElementById("srBox");
    srContentBox = document.getElementById("srContentBox");
    
    frBoxNode = document.getElementById("frBox");
    frContentBox = document.getElementById("frContentBox");
    
    cccBoxNode = document.getElementById("cccBox");
    cccContentBox = document.getElementById("cccContentBox");
    
    pyBoxNode = document.getElementById("pyBox");
    pyContentBox = document.getElementById("pyContentBox");
}

window.onload = gestoreLoad;