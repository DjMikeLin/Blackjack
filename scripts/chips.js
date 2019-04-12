class Chips{
    constructor(){
        this.types = this.makeChips();
    }
    //Returns an array of chip objects
    makeChips(){
        let arr = [];
        let betValues = [10, 50, 100, 500, 1000];

        betValues.forEach((element) => {
            arr.push({
                path: "Images/" + element + "Chip.jpg",
                value: element
            });
        });
        return arr;
    }
}