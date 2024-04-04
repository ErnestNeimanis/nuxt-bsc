
export function useHTMLContent() {
  function extractAll(htmlString, tagName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const elements = doc.querySelectorAll(tagName);

    const elementsTexts = Array.from(elements).map(element => element.textContent.trim());
    return elementsTexts;
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

  

  return { extractAll,
    removeAll,
    removeFirst
  };
}