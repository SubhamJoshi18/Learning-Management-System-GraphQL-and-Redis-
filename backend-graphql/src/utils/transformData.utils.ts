import {EXPRESS_APP_URL} from '../constants/module'

export const convertNumber = <T>(value : T) : number => {
    if(typeof value === 'number'){
        return value
    }else{
        return Number(value)
    }
}

'1'

export const isNullorUndefined = ( value : any) => {
    return value === null || undefined
}

export const isTrue = (value : boolean) => {
    return typeof value === 'boolean' && value
}


export const formattedMongooseMessage = (value : string) => {
    return `The mongose Attribute ${value} is Required , but it is currently missing`
}


export const generateRandomUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
c    });
  }


export const  get24HoursAheadFormatted = () => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    return futureDate.toLocaleString(); 
  }


export const createUrlToken = (uuidToken:string,userId : any) => {
    return `${EXPRESS_APP_URL}/auth/reset-link/${uuidToken}/${userId}`
}