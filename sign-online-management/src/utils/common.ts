export const toZero: (n: number) => string = (n) => {
    if (n < 10){
        return '0' + n;
    }else {
        return '' + n;
    }
}

