import { displayEvents } from './getRequest.js'
/**
 * create New Event dans l'api via une methode Post
 * @param {*} dataBody données retournées par la formulaire ' add Event '
 */
export async function postEvent(dataBody) {
  try {
      const response = await fetch("http://localhost:3000/api/events/", {
          method: "DEL",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(dataBody),
      });

      const result = await response.json();

      console.log("Success:", result);
      window.location.href = "/success"; // Redirect to a success page or another URL
  } catch (error) {
      console.error("Error:", error);
  }
}
