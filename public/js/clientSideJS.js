console.log("Client side javascript loaded");


//This function is here to send data to the express server and is called when a submit button is clicked
function sendData() {
    //Taking values present in Form Textarea
    const data = document.getElementById("patentList").value;
    
    //calling getPatentType() function defined below
    const parsedPatentNumbers = getPatentType(data)

    //create a variable of XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/submit", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        createResponseTable(filterNullResponse(xhr.responseText));
      }
    };
    
    xhr.send(JSON.stringify({ data: parsedPatentNumbers }));
  }



//This function take a list of patents/application numbers as input and convert it into array with application type information
    

function getPatentType(inputPatentList){
    const patentNumbers = inputPatentList.split('\n').filter((patent)=>{
        return patent.length > 1
    })
    
    for(i=0;i<patentNumbers.length;i++){
        if(patentNumbers[i].length === 9 || patentNumbers[i].length === 10){
            patentNumbers[i]=patentNumbers[i].replace("US","")+"@Granted"
        } else if(patentNumbers[i].length === 13 ){
            patentNumbers[i]=patentNumbers[i].replace("US","")+"@application"
        } else if(patentNumbers[i].length === 12 ) {
            patentNumbers[i]=patentNumbers[i].replace("US","").substring(0,4)+"0"+patentNumbers[i].replace("US","").substring(4,12)+"@application"
        } else {
            patentNumbers[i]="Invalid@Invalid"
        }
    
        
    }
    
    const patentNumbersWithType = patentNumbers.map(patent => patent.split("@"))

    const filtered = patentNumbersWithType.filter(innerArray=> innerArray[1] !== "Invalid")

    
    return filtered;
}


function createResponseTable(dataObject){
    
    
    // create a new table element
    const table = document.createElement("table");

    // set the ID of the table
    table.setAttribute("id", "myTable");
    table.setAttribute("class", "container");

    // create a header row and add header cells
    const headerRow = document.createElement('tr');
    const patentNumber = document.createElement('th');
    const filingDate = document.createElement('th');
    const appStatus = document.createElement('th');
    const appStatusDate = document.createElement('th');
    const publicationNumber = document.createElement('th');
  


    patentNumber.textContent = 'Patent Number';
    filingDate.textContent = 'Application Filing Date';
    appStatus.textContent = 'Legal Status';
    appStatusDate.textContent = 'Legal Status Date';
    publicationNumber.textContent = 'Publication Number'
    
    headerRow.appendChild(patentNumber);
    headerRow.appendChild(filingDate);
    headerRow.appendChild(appStatus);
    headerRow.appendChild(appStatusDate);
    headerRow.appendChild(publicationNumber);

    
    table.appendChild(headerRow);


    // create n rows based on data length
    for (i = 0; i < dataObject.length; i++) {
        let row = document.createElement("tr");
        
        let fields = Object.values(dataObject[i])
        // create 5 columns in each row
        for ( j = 0; j < 5; j++) {
            let cell = document.createElement("td");
            cell.textContent = fields[j]
            cell.style.width = "0.1px"
            row.appendChild(cell);
        }

        // add the row to the table
        table.appendChild(row);
        }

        // add the table to the page
        document.body.appendChild(table);

}

function filterNullResponse(dataResponse){
    return JSON.parse(dataResponse).filter((data)=>{
        return data !== null
    })
}