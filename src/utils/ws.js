const baseUrl = "https://5f902cade0559c0016ad6316.mockapi.io/shulgamalthael-frol3d_convarsation";

export const getUserConversation = () => {
    return fetch(baseUrl).then( res => {
        if ( res.ok ) {
            return res.json();
        } else {
            throw new Error(`Eternal Error with status: ${res.status}`)
        }
    })
}

export const postUserConvarsation = ( convarsationData ) => {
    return fetch( baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(convarsationData),
    })
}

export const updateUserConvarsation = ( id, convarsationData ) => {
    return fetch( `${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(convarsationData),
    })
}