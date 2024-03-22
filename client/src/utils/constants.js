

export const cookingDifficult = [
    {name: "Semplice", value:"EASY", level: 1},
    {name: "Intermedio", value:"MEDIUM", level: 2},
    {name: "Difficile", value:"HARD", level: 3}
]

export const foodCategory = [
    {name: "Tutto", value:"ALL", img: null},
    {name: "Colazione", value:"BREAKFAST", img: require("../assets/category/breakfast.jpg")},
    {name: "Primi Piatti", value:"LUNCH", img: require("../assets/category/lunch.jpg")},
    {name: "Secondi", value:"DINNER", img: require("../assets/category/dinner.jpeg")},
    {name: "Dessert", value:"DESSERT", img: require("../assets/category/dessert.jpg")},
    {name: "Piatto Unico", value:"MAINDISK", img: require("../assets/category/maindisk.jpg")},
    {name: "Bevande", value:"DRINK", img: require("../assets/category/drink.jpg")},
    {name: "Altro", value:"OTHER" , img: null}
]

export const foodCategoryView = [
    {name: "Colazione", value:"BREAKFAST", img: require("../assets/category/breakfast.jpg")},
    {name: "Primi Piatti", value:"LUNCH", img: require("../assets/category/lunch.jpg")},
    {name: "Secondi", value:"DINNER", img: require("../assets/category/dinner.jpeg")},
    {name: "Dessert", value:"DESSERT", img: require("../assets/category/dessert.jpg")},
    {name: "Piatto Unico", value:"MAINDISK", img: require("../assets/category/maindisk.jpg")},
    {name: "Bevande", value:"DRINK", img: require("../assets/category/drink.jpg")},
]



export const foodCategoryAddRecipe = [
    {name: "Colazione", value:"BREAKFAST"},
    {name: "Primi Piatti", value:"LUNCH"},
    {name: "Secondi", value:"DINNER"},
    {name: "Dessert", value:"DESSERT"},
    {name: "Piatto Unico", value:"MAINDISK"},
    {name: "Bevande", value:"DRINK"},
    {name: "Altro", value:"OTHER"}
]



export const itemsPerPage = 3;
export const endpoint = "http://localhost:8080"

