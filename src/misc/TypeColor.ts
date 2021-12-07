export const Type2Color  = (type:string):string => {
    let result:string = `#9f9f9f`;
    switch (type) {
        case "grass":
            result = "#9bcc50"
            break;
        case "poison":
            result = "#b97fc9"
            break;
        case "fire":
            result = "#fd7d24"
            break;
        case "water":
            result = "#4592c4"
            break;
        case "bug":
            result = "#729f3f"
            break;
        case "electric":
            result = "#eed535"
            break;
        case "fairy":
            result = "#fdb9e9"
            break;
        case "fighting":
            result = "#d56723"
            break;
        case "psychic":
            result = "#f366b9"
            break;
        case "rock":
            result = "#a38c21"
            break;
        case "steel":
            result = "#9eb7b8"
            break;
        case "ice":
            result = "#51c4e7"
            break;
        case "ghost":
            result = "#7b62a3"
            break;
        case "dark":
            result = "#707070"
            break;

    
        default:
            break;
    }
    return result;
}