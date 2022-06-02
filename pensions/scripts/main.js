import { getRents,deleteRent } from "./helpers.js"
const loader = document.querySelector('#loader-container');

window.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('#back-btn').addEventListener('click',() => document.location.href = '/profile')
    async function loadRents() { 
        const table = document.querySelector('#table')
        const querySnapshot = await getRents()
        let html = `
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Precio</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
        `
        querySnapshot.forEach((doc) => {
            const rent = doc.data()
            html += `
            <tr>
                <td>${rent.name}</td>
                <td>${rent.description}</td>
                <td>${rent.address}</td>
                <td>${rent.value}</td>
                <td>
                    <button name="${rent.id}"  class="btn btn-danger delete-btn"> Eliminar </button>
                </td>
            </tr>
    
            `
        })
        html += '</tbody>'
        table.innerHTML = html

    }
    await loadRents()
    loader.style.display = 'none'

    const deleteBtns = document.querySelectorAll('.delete-btn')
    for (const btn of deleteBtns) {
        
        btn.addEventListener('click', async (event) =>{
            const id = event.target.name
            await deleteRent(id)
            Swal.fire({
                title: 'Pensión eliminada',
        
                icon: 'success',
                confirmButtonText: 'Listo'
            })
            loader.style.display = 'block'
            await loadRents()
            loader.style.display = 'none'
        })
    }
    
})