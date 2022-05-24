import { getUsers,deleteUserFromFirestore } from "./helpers.js"

window.addEventListener('DOMContentLoaded', async () => {
    async function loadUsers() { 
        const table = document.querySelector('#table')
        const querySnapshot = await getUsers()
        let html = `
            <thead>
                <tr>
                    
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
        `
        querySnapshot.forEach((doc) => {
            const user = doc.data()
            html += `
            <tr>
                
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button name="${user.id}"  class="btn btn-danger delete-btn"> Eliminar </button>
                </td>
            </tr>
    
            `
        })
        html += '</tbody>'
        table.innerHTML = html

    }
    await loadUsers()

    const deleteBtns = document.querySelectorAll('.delete-btn')
    for (const btn of deleteBtns) {
        
        btn.addEventListener('click', async (event) =>{
            const id = event.target.name
            await deleteUserFromFirestore(id)
            Swal.fire({
                title: 'Usuario inhabilitado',
        
                icon: 'success',
                confirmButtonText: 'Listo'
            })
            await loadUsers()
        })
    }
    
})