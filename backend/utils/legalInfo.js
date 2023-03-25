const request = require('request')


//Function to retrieve legal status based on patent/publication number

const getLegalInfo = function(number, numberType, callback){
    let reqQuery =""
    if(numberType==="application"){
        reqQuery = {"searchText":"*:*","fq":["appEarlyPubNumber:*"+number+"*"],"facet":"false","fl":"patentNumber,appFilingDate, appStatus, appStatusDate, appEarlyPubNumber, intlFilingDate"}
    } else {
        reqQuery = {"searchText":"*:*","fq":["patentNumber:"+number],"facet":"false","fl":"patentNumber,appFilingDate, appStatus, appStatusDate, appEarlyPubNumber, intlFilingDate"}
    }

    //HTTP post request with Body information

    request.post({
        url: "https://ped.uspto.gov/api/queries",
        body: reqQuery,
        json: true
    }, function(error, response){
        if(error){
            return callback("error", undefined)      
        }

        if(response.body.queryResults.searchResponse.response.docs.length === 0){
            return callback("error", undefined)
        }
        const legalResponse = {
            patentNumber: response.body.queryResults.searchResponse.response.docs[0].patentNumber,
            appFilingDate: response.body.queryResults.searchResponse.response.docs[0].appFilingDate,
            appStatus: response.body.queryResults.searchResponse.response.docs[0].appStatus,
            appStatusDate: response.body.queryResults.searchResponse.response.docs[0].appStatusDate,
            appEarlyPub: response.body.queryResults.searchResponse.response.docs[0].appEarlyPubNumber
        }

        callback(undefined, legalResponse)
    })

}

module.exports = getLegalInfo