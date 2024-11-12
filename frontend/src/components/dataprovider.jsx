export const getStore=()=>{
    const userTOken = localStorage.getItem('token')
    const url = 'http://localhost:5005/store'
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userTOken}`
        },
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }
    })
}