export const API_KEY = "AIzaSyARf20cEArfdpgHwY2p20zGIZ1tfSIA1xI";


export const value_converter = (value) =>{
    if(value>=1000000)
    {
        return Math.floor(value/1000000) + "M";
    }else if(value>=1000){
        return Math.floor(value/1000) + "K";

    }
    else{
        return value;
    }
}

export const title_length=(title)=>{
if(title.length>40){
   return title.substring(0,40)+"...";
}else{
    return title;
}
}