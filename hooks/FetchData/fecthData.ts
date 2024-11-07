import { signOut } from "context/AuthContext";
import { api } from "services/api";

/** fetchData using axios api */
export async function fetchDataStatus(data: string, setData: any, param: string | undefined) {
  api.get(`${data}/${param}`).then(response => {
    console.log(response.data);
    setData(response.data);
  }).catch(error => {
    console.error("Passou aki nesse CATCH ERROR?")
    console.error(error);
    signOut();
  });
}

/** fetchData using fetch javascript */
export async function fetchData(data: string, setData: any, param: string | undefined) {
  try {
    const response = await fetch(`http://localhost:3344/${data}/${param}`);
    const all = await response.json();
    // console.log("/************** logs de grievances agora, nesse testes *************************/");
    // console.log(all);
    setData(all);
  } catch (error) {
    console.error(`Error fetching ${data}:`, error);
  }
}