import data from "../data/data.json";

export const pedirDatos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
}

export const pedirItemPorId = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const item = data.find((prod) => prod.id === parseInt(id));
            if (item) {
                resolve(item);
            } else {
                reject(new Error("Producto no encontrado"));
            }
        }, 500);
    });
}