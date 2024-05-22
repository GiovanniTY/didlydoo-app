export function FunctDel() {
    const element = document.getElementById("idEvent");
    element.remove();
  }

export function FunctDel(){
    fetch('')
}
// /api/events/[id]/	


//   export function displayEvents() {
//     fetch('http://localhost:3000/api/events/')
//         .then(response => {
//             if (!response.ok) {
//                 console.log('no found')
//             }
//             return response.json()
//         })
//         .then(dataEvent => {
//             creatDomEvent(dataEvent)
//         })
//         .catch(error => {
//             console.error('Erreur:', error)
//         })
// }

