Array.prototype.sortByDate = function(field, asc = true) {
    this.sort((obj1, obj2) => {
        const obj1Date = new Date(obj1[field]),
              obj2Date = new Date(obj2[field]);

        return asc ? obj1Date - obj2Date : obj2Date - obj1Date;
    });
};