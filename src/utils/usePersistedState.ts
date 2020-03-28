import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**Definição do tipo da resposta como um array
 * a primeira posição do array é o formato passado, no caso aqui o theme
 * e o segundo é uma função de setState
 */
type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>,
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const[state, setState] = useState(() =>{
        const storageValue = localStorage.getItem(key);

        if (storageValue){
            return JSON.parse(storageValue);
        } else {
            return JSON.stringify(initialState);
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;