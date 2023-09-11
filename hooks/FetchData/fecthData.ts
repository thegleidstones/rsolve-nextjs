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