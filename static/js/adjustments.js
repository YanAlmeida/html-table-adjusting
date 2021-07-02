let RAW;

function requestFile(url){
    ajax = new XMLHttpRequest()

    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            RAW = JSON.parse(ajax.responseText)
            document.getElementById("btnCollapse").style.display="block"
            document.getElementById("initialBtn").style.display="none"
            processFile()
            showTable()
        }
    }

    ajax.open("GET", url)



    ajax.send()
    
}

function processFile(){
    list = document.getElementById("menuList")
    if(document.querySelectorAll('input[type=checkbox]').length == 0){
        Object.keys(RAW).forEach(element => {
            let li = document.createElement("li")
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.value = element
            checkbox.setAttribute('onchange', "showTable()")

            if (["COLUNA 1", "COLUNA 2", "COLUNA 3", "COLUNA 4", "COLUNA 20"].includes(element)){
                checkbox.setAttribute('checked', 'checked')
            }

            li.appendChild(checkbox)
            li.innerHTML += " " + element
            list.appendChild(li)
        });
    }
}

function showTable(){
    let contentspace = document.getElementById("content")
    let table = document.createElement("table")
    let tableheader=document.createElement("thead")
    let tablebody=document.createElement("tbody")
    let rowheader = document.createElement("tr")

    table.className="table table-dark"
    table.appendChild(tableheader)
    table.appendChild(tablebody)
    tableheader.appendChild(rowheader)

    let checkedboxes = document.querySelectorAll('input[type=checkbox]:checked')
    
    if(checkedboxes.length == 0){
        contentspace.innerHTML = "<h1>Oooops...</h1><p>Parece que algo deu errado >:(</p>"
        return
    }
    
    checkedboxes.forEach(element => {
        let th = document.createElement("th")
        th.innerHTML = element.value
        rowheader.appendChild(th)
    })

    

    Object.keys(RAW[checkedboxes[0].value]).slice(0,15).forEach(item => {
        let tr = document.createElement("tr")

        checkedboxes.forEach(element => {
            
            let td = document.createElement("td")
            td.innerHTML = RAW[element.value][item]
            

            tr.appendChild(td)
            

        })
        tablebody.appendChild(tr)
    })



    contentspace.innerHTML = table.outerHTML
}

function collapse(){
    menu = document.getElementById("menu")
    if (menu.style.display=="" || menu.style.display=="none"){
        menu.style.display="block"
    }else{
        menu.style.display="none"
    }
}
