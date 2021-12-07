export const Wait = (time:number) => {
    return new Promise<boolean>((resolve) => {
        setTimeout(()=>{
            resolve(true)
        },time)
    })
}