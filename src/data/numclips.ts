export function numberOfClips (choice: string)  {
    switch(choice){
        case "5 clips":
            return 5;
        case "10 clips":
            return 10;
        case "20 clips":
            return 20;
        default:
            return 30;
    }
}