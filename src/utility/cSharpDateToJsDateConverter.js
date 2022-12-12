export const cSharpDateToJsDateConverter = (cSharpDate) => {
    const jsDateTime=  new Date(Date.parse(cSharpDate));
    // const year=jsDateTime.getFullYear();
    // const month=1+jsDateTime.getMonth();
    // const day=jsDateTime.getDate();
    // const hour=jsDateTime.getHours();
    // const minute=jsDateTime.getMinutes();
    // const second=jsDateTime.getSeconds();
    // return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    // return jsDateTime.toISOString().split('T')[0];
    return jsDateTime.toString().substring(0,15);

}

 
