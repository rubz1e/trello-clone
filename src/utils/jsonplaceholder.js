async function getResponse() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let content = await response.json();
    for (let i=0; i<content.length; i+=1) {
      const listOptions = [content[i].name];
      const select = document.querySelector("select");
      for (let i = 0; i < listOptions.length; i++) {
        const option = createElement("option");
        option.value = listOptions[i];
        option.text = listOptions[i];
        select.add(option);
      }
    }
  }

export { getResponse }