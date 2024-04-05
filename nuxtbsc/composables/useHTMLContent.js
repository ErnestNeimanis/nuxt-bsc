
export function useHTMLContent() {
  function extractAll(htmlString, tagName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const elements = doc.querySelectorAll(tagName);

    const elementsTexts = Array.from(elements).map(element => element.textContent.trim());
    return elementsTexts;
  }

  function extractImageUrls(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const images = doc.querySelectorAll('img'); // Select all <img> elements

    const imageUrls = Array.from(images).map(image => image.src.trim()); // Extract the 'src' attribute
    return imageUrls;
}


    function removeFirst(htmlString, tagName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const element = doc.querySelector(tagName);

    if (element) {
      element.remove();
    }

    const serializer = new XMLSerializer();
    const modifiedHtmlString = serializer.serializeToString(doc);

    return modifiedHtmlString;
  }



   function removeAll(htmlString, tagName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const elements = doc.querySelectorAll(tagName);

    elements.forEach(element => element.remove());

    const serializer = new XMLSerializer();
    const modifiedHtmlString = serializer.serializeToString(doc);

    return modifiedHtmlString;
  }

  

  function addClassesToElements(htmlString, tagName, classes) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const elements = doc.querySelectorAll(tagName);

    elements.forEach(element => {
        // Add the classes to each element. Splitting the classes string into an array allows for adding multiple classes.
        classes.split(" ").forEach(className => {
            if (className.trim()) { // Ensure the className is not just whitespace
                element.classList.add(className.trim());
            }
        });
    });

    const serializer = new XMLSerializer();
    const modifiedHtmlString = serializer.serializeToString(doc);

    return modifiedHtmlString;
}




  return { extractAll,
    extractImageUrls,
    removeAll,
    removeFirst,
    addClassesToElements
  };
}