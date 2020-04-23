let Util = {
    castArray: function (arrayToCast) {
        //console.log(arrayToCast);
        if (Array.isArray(arrayToCast)) {
            return arrayToCast;
        } else {
            return [arrayToCast];
        }
    }
}
export default Util;