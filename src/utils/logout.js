export const logoutUtil=(history)=>{
    window.localStorage.clear()
    history.push('/')
}