function main()
{
    let CF = ""
    let cfData =
    {
        "name" : getInput("inputFieldName").replace(" ",""),
        "surname" : getInput("inputFieldSurname").replace(" ",""),
        "birthDate" : getInput("inputFieldBirthDate"),
        "female" : document.getElementById("inputFieldGenderF").checked,
        "cadastralCode" : getInput("inputFieldCadastralCode"),
    }
    //gestione dei campi vuoti qui
    if(cfData.name == "" || cfData.surname == "" || cfData.birthDate == "" || cfData.cadastralCode == "" )  //lo vorrei fare in modo più bello
    {
        alert("Compilare tutti i campi prima.")
    }
    else 
    {
    CF = getCFSurname(cfData.surname) + getCFName(cfData.name) +
        getCFBirthDate(cfData.birthDate, cfData.female) + getCFCadastralCode(cfData.cadastralCode)
    CF += getCFCheckDigit(CF)
    alert("Il tuo codice fiscale è:"+"\n"+CF.toUpperCase())
    }
}
function getInput(inputFieldId)
{
    return document.getElementById(inputFieldId).value
}

function checkIfVowel(currentChar)
{
    return (vowels.includes(currentChar))
}

function getOnlyVowels(inputString)
{
    let i = 0
    let vowels = ""
    for(i; i!=inputString.length; i++)
    {
        if(checkIfVowel(inputString[i]))
            vowels += inputString[i]
    }
    return vowels
}

function getOnlyConsonants(inputString)
{
    let i = 0
    let consonants = ""
    for(i; i!=inputString.length; i++)
    {
        if(!(checkIfVowel(inputString[i])))
            consonants += inputString[i]
    }
    return consonants
}

function addXs(inputString)
{
    let i = inputString.length
    let xsToAdd = ""
    for(i; i!=3; i++)
        xsToAdd+="x"
    return xsToAdd
}

function getCFSurname(surname)
{
    let cfSurname = ""
    if (surname.length < 3)
    {
        cfSurname = surname + addXs(surname)        //miglioria
        //console.log(surname + addXs(surname))       //debug
        // return (surname + addXs(surname))       
    }
    else 
    {
        let onlyConsonants = getOnlyConsonants(surname)
        if(onlyConsonants.length >= 3)
        {
            // console.log(onlyConsonants.substr(0 , 3))           //debug    
            // return onlyConsonants.substr(0 , 3)     
            cfSurname = onlyConsonants.substr(0,3)       //miglioria
        }
        else
        {
            cfSurname = onlyConsonants
            let onlyVowels = getOnlyVowels(surname)
            cfSurname += onlyVowels.substr(0 , 3-onlyConsonants.length)
        }
        // if(cfSurname.length < 3)        //forse inutile
        //     cfSurname+addXs()        //forse inutile
    }
    return cfSurname
}

function getCFName(name)
{
    let cfName = ""
    if (name.length < 3)
    {
        cfName = name + addXs(name)        //miglioria
        //console.log(name + addXs(name))       //debug
        // return (name + addXs(name))       
    }
    else 
    {
        let onlyConsonants = getOnlyConsonants(name)
        if(onlyConsonants.length == 3)
        {
            // console.log(onlyConsonants.substr(0 , 3))           //debug    
            // return onlyConsonants.substr(0 , 3)     
            cfName = onlyConsonants       //miglioria
        }
        else if(onlyConsonants.length > 3)
        {
            cfName = onlyConsonants.substr(0, 1) + onlyConsonants.substr(2, 4) 
        }
        else
        {
            cfName = onlyConsonants
            let onlyVowels = getOnlyVowels(name)
            cfName += onlyVowels.substr(0 , 3-onlyConsonants.length)
        }
        // if(cfName.length < 3)        //forse inutile
        //     cfName+addXs()        //forse inutile
    }
    return cfName
}

function getCFBirthDate(birthDate, female)
{
    birthDate = birthDate.split("-")
    let cfBirthDate = birthDate[0].slice(-2)                //ANNO
    cfBirthDate += monthLetter[parseInt(birthDate[1])-1]    //MESE
    if(female)
        cfBirthDate += parseInt(birthDate[2])+40            //GIORNO SE FEMMINA
    else
        cfBirthDate += birthDate[2]
    return(cfBirthDate)
}

function getCFCadastralCode(CadastralCode)
{
    let cfCadastralCode = CadastralCode 
    if (cfCadastralCode.length != 4)
    {
        console.log("invalid cadastral code")
        return
    }
    return cfCadastralCode
}

function getCFCheckDigit(cfString)
{
    let evenSum = 0
    let oddSum = 0
    let i = 0
    for(i; i<cfString.length; i++)
    {
        if(!(i%2===0))
        {
            evenSum += evenDict[cfString[i].toUpperCase()]
        }
        else
        {
            oddSum += oddDict[cfString[i].toUpperCase()]
        }
    }
    return decodeDict[(evenSum + oddSum) % 26]
}   