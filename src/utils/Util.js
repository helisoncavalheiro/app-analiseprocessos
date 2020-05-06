let Util = {
    castArray: function (arrayToCast) {
        //console.log(arrayToCast);
        if (Array.isArray(arrayToCast)) {
            return arrayToCast;
        } else {
            return [arrayToCast];
        }
    },

    handleDateFormat: function (stringDate) {
        stringDate = stringDate.replace(/Z\[UTC\]$/, "");

        let ano = stringDate.substr(0, 4);
        let mes = stringDate.substr(5, 2);
        let dia = stringDate.substr(8, 2);
        let hora = stringDate.substr(11, 2);
        let minuto = stringDate.substr(14, 2);
        //let segundo = stringDate.substr(17, 2);
        //let milissegundo = stringDate.substring(20);
        let formatedDate = dia + "/" + mes + "/" + ano + "\n" + hora + ":" + minuto;
        return formatedDate;

    },

    constructTableData() {
        let tableData = [];
        this.state.issues.forEach(el => {
            tableData.push({
                id: el.id,
                createdOn: this.handleDateFormat(el.createdOn),
                tracker: el.trackerId.name,
                status: el.statusId.name
            });

        });

        return tableData;
    }
}
export default Util;